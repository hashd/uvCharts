/**
 * Graph - Abstract base class for all uvCharts visualizations
 *
 * Refactored from legacy graph.js to modern TypeScript with D3 v7
 */
import {
  select,
  scaleLinear,
  scaleLog,
  scaleBand,
  axisBottom,
  axisLeft,
  rgb,
  type Selection,
  type ScaleLinear,
  type ScaleLogarithmic,
  type ScaleBand,
} from '../d3-imports';
import type { GraphDefinition, ChartConfig, PartialChartConfig } from '../types';
import { defaultConfig } from '../config/defaults';
import { CssClasses } from '../constants';
import {
  getUniqueId,
  getMax,
  getMin,
  getLabelArray,
  getCategoryArray,
  getColorBand,
  formatClassName,
} from '../utils';

// Type aliases for D3 selections
type SVGSelection = Selection<SVGSVGElement, unknown, HTMLElement, unknown>;
type GSelection = Selection<SVGGElement, unknown, HTMLElement, unknown>;
type RectSelection = Selection<SVGRectElement, unknown, HTMLElement, unknown>;

// Scale types union
type NumericScale = ScaleLinear<number, number> | ScaleLogarithmic<number, number>;
type CategoryScale = ScaleBand<string>;

/**
 * Axis configuration object
 */
interface AxisState {
  group: GSelection | null;
  scale: NumericScale | CategoryScale | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  func: any; // D3 axis function with varying domain types
  axis: GSelection | null;
  line: Selection<SVGLineElement, unknown, HTMLElement, unknown> | null;
  label: GSelection | null;
}

/**
 * Axes meta information
 */
interface AxesMeta {
  min: number | null;
  max: number | null;
}

/**
 * Complete axes state
 */
interface AxesState {
  hor: AxisState;
  ver: AxisState;
  meta: AxesMeta;
}

/**
 * Effect handlers for legend interactions
 */
interface EffectHandler {
  mouseover?: () => void;
  mouseout?: () => void;
}

/**
 * Deep merge configuration objects
 */
function mergeConfig(defaults: ChartConfig, overrides: PartialChartConfig): ChartConfig {
  // Use JSON parse/stringify for deep clone to avoid TypeScript complexity
  const result: ChartConfig = JSON.parse(JSON.stringify(defaults)) as ChartConfig;

  for (const key of Object.keys(overrides) as (keyof ChartConfig)[]) {
    const overrideValue = overrides[key];
    if (
      overrideValue !== undefined &&
      typeof overrideValue === 'object' &&
      overrideValue !== null
    ) {
      const resultAsRecord = result as unknown as Record<string, Record<string, unknown>>;
      const keyStr = key as string;
      resultAsRecord[keyStr] = { ...resultAsRecord[keyStr], ...overrideValue };
    }
  }

  return result;
}

/**
 * Abstract base class for all chart types
 */
export abstract class Graph {
  /** Unique identifier for this graph instance */
  readonly id: string;

  /** Graph data definition */
  protected graphdef: GraphDefinition;

  /** Merged configuration */
  readonly config: ChartConfig;

  /** SVG frame element */
  protected frame: SVGSelection | null = null;

  /** Main panel group element */
  protected panel: GSelection | null = null;

  /** Chart content group */
  protected chart: GSelection | null = null;

  /** Background rectangle */
  protected bg: RectSelection | null = null;

  /** Caption group */
  protected captionGroup: GSelection | null = null;

  /** Sub-caption group */
  protected subCaptionGroup: GSelection | null = null;

  /** Effects object for interactions */
  protected effects: Record<string, EffectHandler> = {};

  /** Axes state */
  protected axes: AxesState = {
    hor: { group: null, scale: null, func: null, axis: null, line: null, label: null },
    ver: { group: null, scale: null, func: null, axis: null, line: null, label: null },
    meta: { min: null, max: null },
  };

  /** Labels extracted from data */
  protected labels: string[] = [];

  /** Categories extracted from data */
  protected categories: string[] = [];

  /** Legends selection */
  protected legends: GSelection | null = null;

  /** Position selector cache */
  private _position: string;

  /**
   * Create a new Graph instance
   * @param graphdef - Data definition for the chart
   * @param config - Partial configuration to override defaults
   */
  constructor(graphdef: GraphDefinition, config: PartialChartConfig = {}) {
    this.id = getUniqueId();
    this.graphdef = graphdef;
    this.config = mergeConfig(defaultConfig, config);
    this._position = this.config.meta.position;
  }

  // ===========================================================================
  // Abstract methods - must be implemented by subclasses
  // ===========================================================================

  /**
   * Render the chart-specific content
   * @abstract
   */
  protected abstract render(): void;

  // ===========================================================================
  // Initialization Chain
  // ===========================================================================

  /**
   * Initialize the graph with all common elements
   * @returns this for method chaining
   */
  protected init(): this {
    this.calculateMaxMin()
      .setFrame()
      .setPanel()
      .setBackground()
      .setCaption()
      .setSubCaption()
      .setMetadata()
      .setHorizontalAxis()
      .setVerticalAxis()
      .setEffectsObject();

    if (this.config.legend.showlegends) {
      this.setLegend();
    }

    // Initialize defs for filters and gradients
    this.createDefs();
    this.addDropshadowFilter();

    return this;
  }

  /**
   * Finalize the graph after chart content is drawn
   * @returns this for method chaining
   */
  protected finalize(): this {
    this.drawHorizontalAxis().drawVerticalAxis();

    // Set cursor for all text to default
    if (this.frame) {
      this.frame.selectAll('text').style('cursor', 'default');
    }

    return this;
  }

  // ===========================================================================
  // SVG Definitions (Filters & Gradients)
  // ===========================================================================

  /**
   * Create the defs element if it doesn't exist
   */
  protected createDefs(): void {
    if (this.frame && this.frame.select('defs').empty()) {
      this.frame.append('defs');
    }
  }

  /**
   * Add a drop shadow filter to the defs
   */
  protected addDropshadowFilter(): void {
    if (!this.frame) return;

    const defs = this.frame.select('defs');
    if (defs.select('#dropshadow').empty()) {
      const filter = defs.append('filter').attr('id', 'dropshadow');

      filter
        .append('feGaussianBlur')
        .attr('in', 'SourceAlpha')
        .attr('stdDeviation', 2)
        .attr('result', 'blur');

      filter
        .append('feOffset')
        .attr('in', 'blur')
        .attr('dx', 2)
        .attr('dy', 2)
        .attr('result', 'offsetBlur');

      const merge = filter.append('feMerge');
      merge.append('feMergeNode').attr('in', 'offsetBlur');
      merge.append('feMergeNode').attr('in', 'SourceGraphic');
    }
  }

  /**
   * Add a linear gradient to the defs
   * @param id - Unique ID for the gradient
   * @param color - Base color for the gradient
   * @param orientation - 'vertical' or 'horizontal'
   */
  protected addLinearGradient(
    id: string,
    color: string,
    orientation: 'vertical' | 'horizontal' = 'vertical'
  ): void {
    if (!this.frame) return;

    const defs = this.frame.select('defs');
    // Check if gradient already exists to avoid duplicates
    if (!defs.select(`#${id}`).empty()) return;

    const gradient = defs
      .append('linearGradient')
      .attr('id', id)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', orientation === 'horizontal' ? '100%' : '0%')
      .attr('y2', orientation === 'horizontal' ? '0%' : '100%');

    // Light stop (start with a brighter version of the color)
    const startColor = rgb(color).brighter(1).toString();
    gradient
      .append('stop')
      .attr('offset', '0%')
      .style('stop-color', startColor)
      .style('stop-opacity', 0.9);

    // Dark stop (original color)
    gradient
      .append('stop')
      .attr('offset', '100%')
      .style('stop-color', color)
      .style('stop-opacity', 1);
  }

  // ===========================================================================
  // Dimension Getters
  // ===========================================================================

  /** Get chart width */
  protected width(): number {
    return this.config.dimension.width;
  }

  /** Get chart height */
  protected height(): number {
    return this.config.dimension.height;
  }

  /** Get top margin */
  protected top(): number {
    return this.config.margin.top;
  }

  /** Get bottom margin */
  protected bottom(): number {
    return this.config.margin.bottom;
  }

  /** Get left margin */
  protected left(): number {
    return this.config.margin.left;
  }

  /** Get right margin */
  protected right(): number {
    return this.config.margin.right;
  }

  /** Get the container position selector */
  protected get position(): string {
    return this._position;
  }

  // ===========================================================================
  // Max/Min Calculation
  // ===========================================================================

  /**
   * Calculate and cache max/min values
   */
  private calculateMaxMin(): this {
    const stepup = this.graphdef.stepup ?? 'normal';
    this.axes.meta.max = getMax(this.graphdef, stepup);
    this.axes.meta.min = getMin(this.graphdef, stepup);
    return this;
  }

  /** Get maximum value */
  protected getMaxValue(): number {
    return this.axes.meta.max ?? 0;
  }

  /** Get minimum value */
  protected getMinValue(): number {
    return this.axes.meta.min ?? 0;
  }

  // ===========================================================================
  // Frame & Panel Setup
  // ===========================================================================

  /**
   * Create the main SVG frame element
   */
  private setFrame(): this {
    const container = select(this.position || 'body');

    // Create container div and SVG
    const div = container
      .append('div')
      .classed(CssClasses.chartdiv, true)
      .style('display', 'inline-block')
      .style('width', '100%')
      .style('height', '100%');

    this.frame = div.append('svg') as SVGSelection;

    this.frame.attr('id', `${CssClasses.uv}-${this.id}`).classed(CssClasses.frame, true);

    const totalWidth = this.width() + this.left() + this.right();
    const totalHeight = this.height() + this.top() + this.bottom();

    if (this.config.graph.responsive) {
      this.frame
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('preserveAspectRatio', `${this.config.graph.align} ${this.config.graph.meetOrSlice}`)
        .attr('viewBox', `0 0 ${totalWidth} ${totalHeight}`);
    } else {
      this.frame.attr('width', totalWidth).attr('height', totalHeight);
    }

    // Add frame background
    this.frame
      .append('rect')
      .classed(CssClasses.framebg, true)
      .attr('width', totalWidth)
      .attr('height', totalHeight)
      .style('fill', this.config.frame.bgcolor);

    return this;
  }

  /**
   * Create the main panel group with margins applied
   */
  private setPanel(): this {
    if (!this.frame) return this;

    this.panel = this.frame.append('g') as GSelection;

    this.panel
      .attr('id', `${CssClasses.panel}-${this.id}`)
      .classed(CssClasses.panel, true)
      .attr('transform', `translate(${this.left()},${this.top()})`);

    return this;
  }

  /**
   * Create the chart background rectangle
   */
  private setBackground(): this {
    if (!this.panel) return this;

    this.bg = this.panel
      .append('rect')
      .classed(CssClasses.bg, true)
      .attr('height', this.height())
      .attr('width', this.width())
      .style('fill', this.config.graph.bgcolor) as RectSelection;

    this.chart = this.panel
      .append('g')
      .classed(CssClasses.chart, true)
      .style('opacity', this.config.graph.opacity) as GSelection;

    return this;
  }

  // ===========================================================================
  // Caption & Metadata
  // ===========================================================================

  /**
   * Create the main caption
   */
  private setCaption(): this {
    if (!this.panel) return this;

    this.captionGroup = this.panel.append('g').classed(CssClasses.caption, true) as GSelection;

    this.captionGroup
      .append('text')
      .classed(CssClasses.captiontext, true)
      .text(this.config.meta.caption)
      .attr('y', -this.config.margin.top / 2)
      .attr('x', this.config.dimension.width / 2)
      .attr('text-anchor', this.config.caption.textanchor)
      .style('font-family', this.config.caption.fontfamily)
      .style('font-size', this.config.caption.fontsize)
      .style('font-weight', this.config.caption.fontweight)
      .style('font-variant', this.config.caption.fontvariant)
      .style('text-decoration', this.config.caption.textdecoration);

    return this;
  }

  /**
   * Create the sub-caption
   */
  private setSubCaption(): this {
    if (!this.panel) return this;

    this.subCaptionGroup = this.panel
      .append('g')
      .classed(CssClasses.subcaption, true) as GSelection;

    const captionFontSize = parseInt(this.config.caption.fontsize, 10) || 14;

    this.subCaptionGroup
      .append('text')
      .classed(CssClasses.subcaptiontext, true)
      .text(this.config.meta.subcaption)
      .attr('y', -this.config.margin.top / 2 + captionFontSize)
      .attr('x', this.config.dimension.width / 2)
      .attr('text-anchor', this.config.subCaption.textanchor)
      .style('font-family', this.config.subCaption.fontfamily)
      .style('font-size', this.config.subCaption.fontsize)
      .style('font-weight', this.config.subCaption.fontweight)
      .style('font-variant', this.config.subCaption.fontvariant)
      .style('text-decoration', this.config.subCaption.textdecoration);

    return this;
  }

  /**
   * Extract and store labels and categories from data
   */
  private setMetadata(): this {
    this.labels = getLabelArray(this.graphdef);
    this.categories = getCategoryArray(this.graphdef);
    return this;
  }

  // ===========================================================================
  // Axis Setup (D3 v7)
  // ===========================================================================

  /**
   * Set up horizontal axis scale and function
   */
  private setHorizontalAxis(): this {
    if (!this.panel) return this;

    // Create axis group
    if (!this.axes.hor.group) {
      this.axes.hor.group = this.panel
        .append('g')
        .classed(CssClasses.horaxis, true)
        .attr('transform', `translate(0,${this.height()})`)
        .style('shape-rendering', 'crispEdges') as GSelection;
    }

    if (this.config.graph.orientation === 'Horizontal') {
      // Numeric scale for horizontal orientation
      const scaleType = this.config.scale.type;
      const minVal = scaleType === 'log' ? 1 : this.getMinValue();

      if (scaleType === 'log') {
        this.axes.hor.scale = scaleLog()
          .domain([minVal, this.getMaxValue()])
          .range([0, this.width()])
          .nice();
      } else {
        this.axes.hor.scale = scaleLinear()
          .domain([minVal, this.getMaxValue()])
          .range([0, this.width()])
          .nice();
      }

      this.axes.hor.func = axisBottom(this.axes.hor.scale as ScaleLinear<number, number>)
        .ticks(this.config.axis.ticks)
        .tickSize(-this.height())
        .tickPadding(this.config.axis.padding);
    } else {
      // Ordinal scale for vertical orientation
      this.axes.hor.scale = scaleBand<string>()
        .domain(this.labels)
        .range([0, this.width()])
        .padding(this.config.scale.ordinality);

      this.axes.hor.func = axisBottom(this.axes.hor.scale).tickPadding(this.config.axis.padding);

      if (!this.config.axis.showtext || !this.config.axis.showhortext) {
        this.axes.hor.func.tickSize(0);
      }
    }

    if (!this.config.axis.showtext || !this.config.axis.showhortext) {
      this.axes.hor.func.tickFormat(() => '');
    }

    return this;
  }

  /**
   * Set up vertical axis scale and function
   */
  private setVerticalAxis(): this {
    if (!this.panel) return this;

    // Create axis group
    if (!this.axes.ver.group) {
      this.axes.ver.group = this.panel
        .append('g')
        .classed(CssClasses.veraxis, true)
        .style('shape-rendering', 'crispEdges') as GSelection;
    }

    if (this.config.graph.orientation === 'Vertical') {
      // Numeric scale for vertical orientation
      const scaleType = this.config.scale.type;
      const minVal = scaleType === 'log' ? 1 : this.getMinValue();

      if (scaleType === 'log') {
        this.axes.ver.scale = scaleLog()
          .domain([this.getMaxValue(), minVal])
          .range([0, this.height()])
          .nice();
      } else {
        this.axes.ver.scale = scaleLinear()
          .domain([this.getMaxValue(), minVal])
          .range([0, this.height()])
          .nice();
      }

      this.axes.ver.func = axisLeft(this.axes.ver.scale as ScaleLinear<number, number>)
        .ticks(this.config.axis.ticks)
        .tickSize(-this.width())
        .tickPadding(this.config.axis.padding);
    } else {
      // Ordinal scale for horizontal orientation
      this.axes.ver.scale = scaleBand<string>()
        .domain(this.labels)
        .range([0, this.height()])
        .padding(this.config.scale.ordinality);

      this.axes.ver.func = axisLeft(this.axes.ver.scale).tickPadding(this.config.axis.padding);

      if (!this.config.axis.showtext || !this.config.axis.showvertext) {
        this.axes.ver.func.tickSize(0);
      }
    }

    if (!this.config.axis.showtext || !this.config.axis.showvertext) {
      this.axes.ver.func.tickFormat(() => '');
    }

    return this;
  }

  /**
   * Draw the horizontal axis
   */
  private drawHorizontalAxis(): this {
    if (!this.axes.hor.group || !this.axes.hor.func) return this;

    this.axes.hor.axis = this.axes.hor.group
      .append('g')
      .style('font-family', this.config.label.fontfamily)
      .style('font-size', this.config.label.fontsize)
      .style('font-weight', this.config.label.fontweight)
      .call(this.axes.hor.func) as GSelection;

    if (this.config.axis.showticks) {
      this.axes.hor.axis
        .selectAll('line')
        .style('stroke', this.config.axis.strokecolor)
        .style('opacity', this.config.axis.opacity);
    }
    this.axes.hor.axis.selectAll('path').style('fill', 'none');

    // Draw axis line
    if (this.panel) {
      const yPos =
        this.config.graph.orientation === 'Horizontal'
          ? this.height()
          : ((this.axes.ver.scale as ScaleLinear<number, number>)(0) ?? this.height());

      this.axes.hor.line = this.panel
        .append('line')
        .classed(CssClasses.horaxis, true)
        .attr('y1', yPos)
        .attr('y2', yPos)
        .attr('x1', 0)
        .attr('x2', this.width())
        .style('stroke', this.config.axis.strokecolor);

      // Axis labels
      const axisFontSize = parseInt(this.config.axis.fontsize, 10) || 14;
      const labelFontSize = parseInt(this.config.label.fontsize, 10) || 11;

      this.axes.hor.label = this.axes.hor.group
        .append('g')
        .classed(CssClasses.axeslabelgroup, true)
        .attr(
          'transform',
          `translate(${this.width() / 2},${this.config.margin.bottom / 4 + labelFontSize})`
        ) as GSelection;

      this.axes.hor.label
        .append('text')
        .classed(CssClasses.axeslabel, true)
        .attr('text-anchor', 'middle')
        .style('font-size', this.config.axis.fontsize)
        .style('font-family', this.config.axis.fontfamily)
        .text(this.config.meta.hlabel);

      this.axes.hor.label
        .append('text')
        .classed(CssClasses.axessublabel, true)
        .attr('y', axisFontSize)
        .attr('text-anchor', 'middle')
        .style('font-size', `${axisFontSize - 2}px`)
        .style('font-family', this.config.axis.fontfamily)
        .text(this.config.meta.hsublabel);
    }

    return this;
  }

  /**
   * Draw the vertical axis
   */
  private drawVerticalAxis(): this {
    if (!this.axes.ver.group || !this.axes.ver.func) return this;

    this.axes.ver.axis = this.axes.ver.group
      .append('g')
      .classed(CssClasses.axes, true)
      .style('font-family', this.config.label.fontfamily)
      .style('font-size', this.config.label.fontsize)
      .style('font-weight', this.config.label.fontweight)
      .call(this.axes.ver.func) as GSelection;

    if (this.config.axis.showticks) {
      this.axes.ver.axis
        .selectAll('line')
        .style('stroke', this.config.axis.strokecolor)
        .style('opacity', this.config.axis.opacity);

      // Remove the top grid line (where y=0)
      this.axes.ver.axis
        .selectAll('.tick')
        .filter((d) => {
          const scale = this.axes.ver.scale as ScaleLinear<number, number>;
          // Check if tick position is 0 (Top)
          return scale(d as number) === 0;
        })
        .select('line')
        .remove();
    }
    this.axes.ver.axis.selectAll('path').style('fill', 'none');

    // Remove the default domain path which creates the unwanted top line border
    // We already draw our own custom axis line below.
    this.axes.ver.axis.select('.domain').remove();

    // Draw axis line
    if (this.panel) {
      const xPos =
        this.config.graph.orientation === 'Horizontal'
          ? ((this.axes.hor.scale as ScaleLinear<number, number>)(0) ?? 0)
          : 0;

      this.axes.ver.line = this.panel
        .append('line')
        .classed(CssClasses.veraxis, true)
        .attr('x1', xPos)
        .attr('x2', xPos)
        .attr('y1', 0)
        .attr('y2', this.height())
        .style('stroke', this.config.axis.strokecolor);

      // Axis labels
      const axisFontSize = parseInt(this.config.axis.fontsize, 10) || 14;

      this.axes.ver.label = this.axes.ver.group
        .append('g')
        .attr(
          'transform',
          `translate(${(-4 * this.config.margin.left) / 5},${this.height() / 2})rotate(270)`
        ) as GSelection;

      this.axes.ver.label
        .append('text')
        .classed(CssClasses.axeslabel, true)
        .attr('text-anchor', 'middle')
        .style('font-family', this.config.axis.fontfamily)
        .style('font-size', this.config.axis.fontsize)
        .text(this.config.meta.vlabel);

      this.axes.ver.label
        .append('text')
        .classed(CssClasses.axessublabel, true)
        .attr('text-anchor', 'middle')
        .attr('y', axisFontSize)
        .style('font-family', this.config.axis.fontfamily)
        .style('font-size', `${axisFontSize - 2}px`)
        .text(this.config.meta.vsublabel);
    }

    return this;
  }

  // ===========================================================================
  // Effects & Legend
  // ===========================================================================

  /**
   * Initialize effects object for interactions
   */
  private setEffectsObject(): this {
    const effectArray =
      this.config.legend.legendtype === 'categories' ? this.categories : this.labels;

    for (const item of effectArray) {
      this.effects[item] = {};
    }

    return this;
  }

  /**
   * Create the legend
   */
  private setLegend(): this {
    if (!this.panel) return this;

    const legendData =
      this.config.legend.legendtype === 'categories' ? this.categories : this.labels;

    let legendTransform: string;
    if (this.config.legend.position === 'right') {
      legendTransform = `translate(${this.width()}, 10)`;
    } else {
      // Calculate centering offset
      const itemWidth = 100; // Assumed width from layout logic below
      const itemsPerRow = Math.floor(this.width() / itemWidth);
      const actualItems = Math.min(legendData.length, itemsPerRow);
      const actualWidth = actualItems * itemWidth;
      const xOffset = Math.max(0, (this.width() - actualWidth) / 2);

      const pos =
        this.height() + this.config.margin.bottom / 2 + parseInt(this.config.axis.fontsize, 10);
      legendTransform = `translate(${xOffset}, ${pos})`;
    }

    const legendGroup = this.panel
      .append('g')
      .classed(CssClasses.legend, true)
      .attr('transform', legendTransform);

    let legendStart = 0;
    const self = this;

    const legends = legendGroup
      .selectAll<SVGGElement, string>('g')
      .data(legendData)
      .enter()
      .append('g')
      .attr('transform', (_d, i) => {
        if (self.config.legend.position === 'right') {
          return `translate(10,${10 * (2 * i - 1)})`;
        } else {
          let hPos = 100 * i - self.config.dimension.width * legendStart;
          let vPos = 20 * legendStart;
          if (hPos >= self.config.dimension.width) {
            legendStart++;
            hPos = 100 * i - self.config.dimension.width * legendStart;
            vPos = 20 * legendStart;
          }
          return `translate(${hPos},${vPos})`;
        }
      })
      .attr('class', (d) => `cl-${formatClassName(d)}`)
      .attr('data-disabled', 'false');

    // Add legend rectangles
    legends
      .append('rect')
      .classed(CssClasses.legendsign, true)
      .attr('height', this.config.legend.symbolsize)
      .attr('width', this.config.legend.symbolsize)
      .attr('rx', 3)
      .attr('ry', 3)
      .style('fill', (_, i) => getColorBand(this.config, i))
      .style('stroke', 'none');

    // Add legend labels
    legends
      .append('text')
      .classed(CssClasses.legendlabel, true)
      .text((d) => d)
      .attr('dx', this.config.legend.symbolsize + this.config.legend.textmargin)
      .attr('y', this.config.legend.symbolsize / 2 + 1) // +1 for visual optical balance
      .style('dominant-baseline', 'middle')
      .attr('text-anchor', 'start')
      .style('stroke', this.config.legend.color)
      .style('fill', this.config.legend.color)
      .style('stroke-width', this.config.legend.strokewidth)
      .style('font-family', this.config.legend.fontfamily)
      .style('font-size', this.config.legend.fontsize)
      .style('font-weight', this.config.legend.fontweight);

    this.legends = legendGroup as GSelection;

    return this;
  }

  // ===========================================================================
  // Public API
  // ===========================================================================

  /**
   * Remove the chart from the DOM
   */
  public destroy(): void {
    if (this.frame) {
      // Remove the parent div (which contains the SVG)
      const parentDiv = this.frame.node()?.parentElement;
      if (parentDiv) {
        parentDiv.remove();
      }
    }
  }

  /**
   * Update the chart with new data
   * @param newData - New graph definition
   */
  public update(newData: GraphDefinition): void {
    this.destroy();
    this.graphdef = newData;
    this.axes.meta.max = null;
    this.axes.meta.min = null;
    this.render();
  }

  /**
   * Toggle visibility of a category/series
   * @param index - Index of the category to toggle
   */
  public toggleCategory(index: number): this {
    const category = this.categories[index];
    if (!category || !this.frame) return this;

    const className = formatClassName(category);
    const elements = this.frame.selectAll(`g.cge-${className}`);

    // Check if any elements exist
    if (elements.empty()) return this;

    const currentDisplay = elements.style('display') ?? '';
    elements.style('display', currentDisplay === 'none' ? '' : 'none');

    return this;
  }
}
