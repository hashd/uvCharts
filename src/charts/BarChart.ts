/**
 * BarChart - A 2D bar chart supporting horizontal and vertical orientations
 *
 * Refactored from legacy bar.js to modern TypeScript with D3 v7
 */
import { type ScaleBand, type ScaleLinear, easeCubicOut } from '../d3-imports';
import type { GraphDefinition, PartialChartConfig, DataPoint } from '../types';
import { Graph } from './Graph';
import { getColorBand, formatClassName, getLabelValue, getTooltipText } from '../utils';
import { getRoundedRightRectPath, getRoundedBottomRectPath } from './shapes';

// Type for bar group selections
type BarGroupMap = Record<string, d3.Selection<SVGGElement, unknown, HTMLElement, unknown>>;

/**
 * Bar chart supporting both horizontal and vertical orientations
 */
export class BarChart extends Graph {
  /** Bar group elements by category */
  private bargroups: BarGroupMap = {};

  /**
   * Create a new BarChart
   * @param graphdef - Data definition for the chart
   * @param config - Partial configuration to override defaults
   */
  constructor(graphdef: GraphDefinition, config: PartialChartConfig = {}) {
    // Set default stepup type for bar charts
    graphdef.stepup = 'normal';
    super(graphdef, config);
  }

  /**
   * Render the bar chart
   */
  protected render(): void {
    // Initialize common graph elements
    this.init();

    // Set domain for the category axis
    const categoryAxis = this.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor';
    if (this.axes[categoryAxis].scale) {
      (this.axes[categoryAxis].scale as ScaleBand<string>).domain(this.labels);
    }

    // Draw bars for each category
    for (let idx = 0; idx < this.categories.length; idx++) {
      const category = this.categories[idx];
      if (!category || !this.chart) continue;

      // Create category group
      this.bargroups[category] = this.chart
        .append('g')
        .classed(`cg-${formatClassName(category)}`, true);

      // Draw bars based on orientation
      if (this.config.graph.orientation === 'Horizontal') {
        this.drawHorizontalBars(idx);
      } else {
        this.drawVerticalBars(idx);
      }
    }

    // Finalize (draw axes, etc.)
    this.finalize();
  }

  /**
   * Draw horizontal bars for a category
   * @param idx - Category index
   */
  private drawHorizontalBars(idx: number): void {
    const category = this.categories[idx];
    if (!category) return;

    const categoryData = this.graphdef.dataset[category];
    if (!categoryData) return;

    const color = getColorBand(this.config, idx);
    const categoryCount = this.categories.length;
    const barGroup = this.bargroups[category];
    if (!barGroup) return;

    const verScale = this.axes.ver.scale as ScaleBand<string>;
    const horScale = this.axes.hor.scale as ScaleLinear<number, number>;

    const barHeight = verScale.bandwidth() / categoryCount;

    // Create bar groups for each data point
    const bars = barGroup
      .selectAll<SVGGElement, DataPoint>('g')
      .data(categoryData)
      .enter()
      .append('g')
      .classed(`cge-${formatClassName(category)}`, true)
      .attr('transform', (d) => (d.value < 0 ? 'scale(-1,1)' : ''));

    // Draw bars with custom paths (rounded right corners only)
    bars
      .append('path')
      .classed(formatClassName(category), true)
      .classed(`cr-${formatClassName(category)}`, true)
      .attr('d', (d) => {
        const y = verScale(d.name) ?? 0;
        const x = d.value < 0 ? -horScale(0) : horScale(0);
        return getRoundedRightRectPath(x, y, 0, barHeight, 6);
      })
      .style('stroke', this.config.bar.strokecolor)
      // Use gradient for fill if enabled
      .style('fill', (_, i) => {
        if (this.config.bar.useGradient) {
          const uniqueId = `grad-${this.id}-${idx}-${i}`;
          this.addLinearGradient(uniqueId, color, 'horizontal');
          return `url(#${uniqueId})`;
        }
        return color;
      })
      .transition()
      .duration(this.config.effects.duration)
      .delay((_, i) => i * 50)
      .ease(easeCubicOut)
      .attr('d', (d) => {
        const y = verScale(d.name) ?? 0;
        const x = d.value < 0 ? -horScale(0) : horScale(0);
        const w = Math.abs(horScale(Math.abs(d.value)) - horScale(0));
        return getRoundedRightRectPath(x, y, w, barHeight, 6);
      });

    // Draw value labels
    if (this.config.label.showlabel) {
      bars
        .append('text')
        .attr('x', horScale(0))
        .attr('y', (d) => (verScale(d.name) ?? 0) + barHeight / 2)
        .attr('dx', (d) => (d.value < 0 ? '-20px' : '4px'))
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .classed(`cr-${formatClassName(category)}`, true)
        .style('fill', color)
        .style('font-family', this.config.bar.fontfamily)
        .style('font-size', this.config.bar.fontsize)
        .style('font-weight', this.config.bar.fontweight)
        .style('opacity', 0)
        .text((d) => getLabelValue(this.config, d))
        .transition()
        .duration(this.config.effects.duration)
        .delay((_, i) => i * 50 + 100)
        .ease(easeCubicOut)
        .style('opacity', 1)
        .attr('x', (d) => horScale(d.value));
    }

    // Add tooltips
    bars
      .append('title')
      .text((d, i) => getTooltipText(this.config, category, this.labels[i] ?? '', d));

    // Position the category group
    barGroup.attr('transform', `translate(0,${(idx * verScale.bandwidth()) / categoryCount})`);
  }

  /**
   * Draw vertical bars for a category
   * @param idx - Category index
   */
  private drawVerticalBars(idx: number): void {
    const category = this.categories[idx];
    if (!category) return;

    const categoryData = this.graphdef.dataset[category];
    if (!categoryData) return;

    const color = getColorBand(this.config, idx);
    const categoryCount = this.categories.length;
    const barGroup = this.bargroups[category];
    if (!barGroup) return;

    const horScale = this.axes.hor.scale as ScaleBand<string>;
    const verScale = this.axes.ver.scale as ScaleLinear<number, number>;

    const barWidth = horScale.bandwidth() / categoryCount;

    // Create bar groups for each data point
    const bars = barGroup
      .selectAll<SVGGElement, DataPoint>('g')
      .data(categoryData)
      .enter()
      .append('g')
      .classed(`cge-${formatClassName(category)}`, true);
    // Group transform: scale(1,-1) is applied at the END to the barGroup

    // Draw bars with custom paths (rounded "Bottom" which is visual Top in inverted coords)
    bars
      .append('path')
      .classed(formatClassName(category), true)
      .classed(`cr-${formatClassName(category)}`, true)
      .attr('d', (d) => {
        const x = horScale(d.name) ?? 0;
        // Inverted Coords: Baseline is y=0.
        // We grow height up from y=0.
        // Start state: Height 0.
        return getRoundedBottomRectPath(x, 0, barWidth, 0, 6);
      })
      .style('stroke', this.config.bar.strokecolor)
      // Use gradient for fill if enabled
      .style('fill', (_, i) => {
        if (this.config.bar.useGradient) {
          const uniqueId = `grad-${this.id}-${idx}-${i}`;
          this.addLinearGradient(uniqueId, color, 'vertical');
          return `url(#${uniqueId})`;
        }
        return color;
      })
      .transition()
      .duration(this.config.effects.duration)
      .delay((_, i) => i * 50)
      .ease(easeCubicOut)
      .attr('d', (d) => {
        const x = horScale(d.name) ?? 0;
        // Inverted Coords:
        // Height = |verScale(value) - verScale(0)|.
        // verScale returns pixels from Top. verScale(0) is Height. verScale(value) is (Height - ValueHt).
        // Difference is absolute height in pixels.
        const height = Math.abs(verScale(0) - verScale(d.value));

        // Draw at y=0 (Baseline).
        // getRoundedBottomRectPath rounds the side at y+height.
        // Since y=0 is Bottom, y+height is Top. So Visual Top is rounded. Correct.
        return getRoundedBottomRectPath(x, 0, barWidth, height, 6);
      });

    // Draw value labels
    if (this.config.label.showlabel) {
      bars
        .append('text')
        .attr('x', 0)
        .attr('y', 0)
        // Transform text:
        // Translate to (x, yText).
        // yText: verScale(0) - verScale(value) + padding?
        // Wait. Inverted coords:
        // Bar Top is at y = Height.
        // We want text at y = Height + 5.
        // Height = |verScale(0) - verScale(value)|.
        // So Translate Y = Height + 5.
        // Scale(1, -1) to unflip the text itself.
        .attr('transform', (d) => {
          const x = (horScale(d.name) ?? 0) + barWidth / 2;
          const y = d.value >= 0 ? 5 : 15; // Start at baseline
          return `translate(${x}, ${y}) scale(1, -1)`;
        })
        .text((d) => getLabelValue(this.config, d))
        .attr('text-anchor', 'middle')
        .style('font-family', this.config.label.fontfamily)
        .style('font-weight', this.config.label.fontweight)
        .style('font-size', `${this.config.label.fontsize}px`)
        .style('fill', (d, i) =>
          this.config.label.strokecolor
            ? this.config.label.strokecolor
            : getColorBand(this.config, i)
        )
        .style('opacity', 0)
        .transition()
        .duration(this.config.effects.duration)
        .delay((_, i) => i * 50)
        .ease(easeCubicOut)
        .style('opacity', 1)
        .attr('transform', (d) => {
          const x = (horScale(d.name) ?? 0) + barWidth / 2;
          const height = Math.abs(verScale(0) - verScale(d.value));
          const y = d.value >= 0 ? height + 5 : height + 15; // Positioning relative to bar top
          return `translate(${x}, ${y}) scale(1, -1)`;
        });
    }

    // Add tooltips
    bars
      .append('title')
      .text((d, i) => getTooltipText(this.config, category, this.labels[i] ?? '', d));

    // Position the category group with LEGACY transform scale(1,-1) as requested
    barGroup.attr(
      'transform',
      `translate(${(idx * horScale.bandwidth()) / categoryCount},${this.height()}) scale(1,-1)`
    );
  }

  /**
   * Create a bar chart
   * @param container - CSS selector for the container element
   * @param graphdef - Data definition
   * @param config - Optional configuration overrides
   */
  static create(
    container: string,
    graphdef: GraphDefinition,
    config: PartialChartConfig = {}
  ): BarChart {
    const mergedConfig: PartialChartConfig = {
      ...config,
      meta: {
        ...config.meta,
        position: container,
      },
    };
    const chart = new BarChart(graphdef, mergedConfig);
    chart.render();
    return chart;
  }
}
