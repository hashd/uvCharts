/**
 * AreaChart - An area chart with line overlay
 */
import {
  line,
  area,
  curveLinear,
  type ScaleBand,
  type ScaleLinear,
  easeCubicOut,
} from '../d3-imports';
import type { GraphDefinition, PartialChartConfig, DataPoint } from '../types';
import { Graph } from './Graph';
import {
  getColorBand,
  formatClassName,
  getDataArray,
  getLabelValue,
  getTooltipText,
} from '../utils';
import { CssClasses } from '../constants';

/**
 * Area chart with filled regions under lines
 */
export class AreaChart extends Graph {
  private dataset: DataPoint[][] = [];

  constructor(graphdef: GraphDefinition, config: PartialChartConfig = {}) {
    graphdef.stepup = 'normal';
    super(graphdef, config);
  }

  protected render(): void {
    this.init();
    this.dataset = getDataArray(this.graphdef);

    const categoryAxis = this.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor';
    if (this.axes[categoryAxis].scale) {
      (this.axes[categoryAxis].scale as ScaleBand<string>).domain(this.labels);
    }

    for (let idx = 0; idx < this.dataset.length; idx++) {
      const category = this.categories[idx];
      if (!category || !this.chart) continue;

      const areaPath = this.chart
        .append('g')
        .classed(`cg-${formatClassName(category)}`, true)
        .append('g')
        .classed(`cge-${formatClassName(category)}`, true)
        .datum(this.dataset[idx] ?? []);

      if (this.config.graph.orientation === 'Horizontal') {
        this.drawHorizontalArea(areaPath, idx);
      } else {
        this.drawVerticalArea(areaPath, idx);
      }
    }

    this.finalize();
  }

  private drawVerticalArea(
    areaPath: d3.Selection<SVGGElement, DataPoint[], HTMLElement, unknown>,
    idx: number
  ): void {
    const category = this.categories[idx];
    if (!category) return;

    const color = getColorBand(this.config, idx);
    const horScale = this.axes.hor.scale as ScaleBand<string>;
    const verScale = this.axes.ver.scale as ScaleLinear<number, number>;

    const lineFunc = line<DataPoint>()
      .x((d) => (horScale(d.name) ?? 0) + horScale.bandwidth() / 2)
      .y((d) => verScale(d.value))
      .curve(curveLinear);

    const areaFunc = area<DataPoint>()
      .x((d) => (horScale(d.name) ?? 0) + horScale.bandwidth() / 2)
      .y0(verScale(0))
      .y1((d) => verScale(d.value))
      .curve(curveLinear);

    // Create a "flat" area function for initial state (grows from baseline)
    const areaFuncFlat = area<DataPoint>()
      .x((d) => (horScale(d.name) ?? 0) + horScale.bandwidth() / 2)
      .y0(verScale(0))
      .y1(verScale(0)) // Start flat at baseline
      .curve(curveLinear);

    // Create gradient for this series
    const gradientId = `area-grad-${this.id}-${idx}`;
    this.addLinearGradient(gradientId, color, 'vertical');

    // Draw filled area with gradient and grow-from-bottom animation
    areaPath
      .append('path')
      .classed(`${CssClasses.areapath}${idx}`, true)
      .attr('d', areaFuncFlat) // Start flat
      .style('fill', `url(#${gradientId})`)
      .style('opacity', this.config.area.opacity)
      .transition()
      .duration(this.config.effects.duration * 2)
      .ease(easeCubicOut)
      .attr('d', areaFunc); // Grow to final shape

    // Create a "flat" line function for initial state (rises from baseline)
    const lineFuncFlat = line<DataPoint>()
      .x((d) => (horScale(d.name) ?? 0) + horScale.bandwidth() / 2)
      .y(verScale(0)) // Start flat at baseline
      .curve(curveLinear);

    // Draw line overlay with rise + stroke-dasharray animation
    const linePath = areaPath
      .append('path')
      .classed(`${CssClasses.linepath}${idx}`, true)
      .attr('d', lineFuncFlat) // Start flat
      .style('stroke', color)
      .style('stroke-width', 2.5)
      .style('stroke-linecap', 'round')
      .style('stroke-linejoin', 'round')
      .style('fill', 'none');

    const pathNode = linePath.node();
    if (pathNode) {
      // Get final path length for stroke animation
      const finalPath = lineFunc(this.dataset[idx] ?? []) ?? '';
      linePath.attr('d', finalPath);
      const pathLength = pathNode.getTotalLength();

      // Reset to flat and animate both path shape + stroke-dashoffset
      linePath
        .attr('d', lineFuncFlat)
        .style('stroke-dasharray', pathLength)
        .style('stroke-dashoffset', pathLength)
        .transition()
        .duration(this.config.effects.duration * 2)
        .ease(easeCubicOut)
        .attr('d', lineFunc) // Rise to final shape
        .style('stroke-dashoffset', 0); // Draw stroke
    }

    // Draw data points with pop animation
    areaPath
      .selectAll<SVGCircleElement, DataPoint>(`.${CssClasses.dot}`)
      .data(this.dataset[idx] ?? [])
      .enter()
      .append('circle')
      .classed(CssClasses.dot, true)
      .attr('cx', (d) => (horScale(d.name) ?? 0) + horScale.bandwidth() / 2)
      .attr('cy', (d) => verScale(d.value))
      .attr('r', 0)
      .style('fill', color)
      .style('stroke', '#fff')
      .style('stroke-width', 2)
      .style('cursor', 'pointer')
      .transition()
      .duration(300)
      .delay((_, i) => i * 60 + this.config.effects.duration)
      .ease(easeCubicOut)
      .attr('r', 5)
      .selection()
      .append('title')
      .text((d, i) => getTooltipText(this.config, category, this.labels[i] ?? '', d));

    // Draw value labels if enabled
    if (this.config.area.showLabels) {
      areaPath
        .selectAll<SVGTextElement, DataPoint>('text.area-label')
        .data(this.dataset[idx] ?? [])
        .enter()
        .append('text')
        .classed('area-label', true)
        .attr('x', (d) => (horScale(d.name) ?? 0) + horScale.bandwidth() / 2)
        .attr('y', (d) => verScale(d.value) - 5)
        .attr('text-anchor', 'middle')
        .style('fill', color)
        .style('font-size', '11px')
        .style('font-weight', '500')
        .style('opacity', 0)
        .text((d) => getLabelValue(this.config, d))
        .transition()
        .duration(this.config.effects.duration)
        .delay((_, i) => i * 60 + this.config.effects.duration + 100)
        .ease(easeCubicOut)
        .style('opacity', 1)
        .attr('y', (d) => verScale(d.value) - 15);
    }
  }

  private drawHorizontalArea(
    areaPath: d3.Selection<SVGGElement, DataPoint[], HTMLElement, unknown>,
    idx: number
  ): void {
    const category = this.categories[idx];
    if (!category) return;

    const color = getColorBand(this.config, idx);
    const horScale = this.axes.hor.scale as ScaleLinear<number, number>;
    const verScale = this.axes.ver.scale as ScaleBand<string>;

    const lineFunc = line<DataPoint>()
      .x((d) => horScale(d.value))
      .y((d) => (verScale(d.name) ?? 0) + verScale.bandwidth() / 2)
      .curve(curveLinear);

    const areaFunc = area<DataPoint>()
      .x0(horScale(0))
      .x1((d) => horScale(d.value))
      .y((d) => (verScale(d.name) ?? 0) + verScale.bandwidth() / 2)
      .curve(curveLinear);

    areaPath
      .append('path')
      .classed(`${CssClasses.areapath}${idx}`, true)
      .attr('d', areaFunc)
      .style('fill', color)
      .style('opacity', this.config.area.opacity);

    areaPath
      .append('path')
      .classed(`${CssClasses.linepath}${idx}`, true)
      .attr('d', lineFunc)
      .style('stroke', color)
      .style('fill', 'none');

    areaPath
      .selectAll<SVGCircleElement, DataPoint>(`.${CssClasses.dot}`)
      .data(this.dataset[idx] ?? [])
      .enter()
      .append('circle')
      .classed(CssClasses.dot, true)
      .attr('cx', (d) => horScale(d.value))
      .attr('cy', (d) => (verScale(d.name) ?? 0) + verScale.bandwidth() / 2)
      .attr('r', 3.5)
      .style('fill', color);
  }

  static create(
    container: string,
    graphdef: GraphDefinition,
    config: PartialChartConfig = {}
  ): AreaChart {
    const mergedConfig: PartialChartConfig = {
      ...config,
      meta: { ...config.meta, position: container },
    };
    const chart = new AreaChart(graphdef, mergedConfig);
    chart.render();
    return chart;
  }
}
