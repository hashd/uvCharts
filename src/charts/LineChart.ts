/**
 * LineChart - A line chart with support for multiple series
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
  getLabelValue,
  getTooltipText,
  getDataArray,
} from '../utils';

/**
 * Line chart with optional data point circles
 */
export class LineChart extends Graph {
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

    for (let idx = 0; idx < this.categories.length; idx++) {
      const category = this.categories[idx];
      if (!category || !this.chart) continue;

      const lineGroup = this.chart
        .append('g')
        .classed(`cg-${formatClassName(category)}`, true)
        .append('g')
        .classed(`cge-${formatClassName(category)}`, true)
        .datum(this.dataset[idx] ?? []);

      if (this.config.graph.orientation === 'Horizontal') {
        this.drawHorizontalLines(lineGroup, idx);
      } else {
        this.drawVerticalLines(lineGroup, idx);
      }
    }

    this.finalize();
  }

  private drawVerticalLines(
    lineGroup: d3.Selection<SVGGElement, DataPoint[], HTMLElement, unknown>,
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

    // Optional: Draw area fill under the line
    if (this.config.line.showAreaFill) {
      const areaFunc = area<DataPoint>()
        .x((d) => (horScale(d.name) ?? 0) + horScale.bandwidth() / 2)
        .y0(verScale(0))
        .y1((d) => verScale(d.value))
        .curve(curveLinear);

      // Create gradient for this series
      const gradientId = `area-grad-${this.id}-${idx}`;
      this.addLinearGradient(gradientId, color, 'vertical');

      lineGroup
        .append('path')
        .attr('d', areaFunc)
        .classed(`area-${formatClassName(category)}`, true)
        .style('fill', `url(#${gradientId})`)
        .style('opacity', 0)
        .transition()
        .duration(this.config.effects.duration)
        .style('opacity', 0.2);
    }

    // Draw line with stroke-dasharray animation
    const linePath = lineGroup
      .append('path')
      .attr('d', lineFunc)
      .classed(`cr-${formatClassName(category)}`, true)
      .style('fill', 'none')
      .style('stroke', color)
      .style('stroke-width', this.config.line.strokewidth)
      .style('stroke-linecap', 'round')
      .style('stroke-linejoin', 'round');

    // Get path length for stroke-dasharray animation
    const pathNode = linePath.node();
    if (pathNode) {
      const pathLength = pathNode.getTotalLength();
      linePath
        .style('stroke-dasharray', pathLength)
        .style('stroke-dashoffset', pathLength)
        .transition()
        .duration(this.config.effects.duration * 2)
        .ease(easeCubicOut)
        .style('stroke-dashoffset', 0);
    }

    // Draw circles with pop animation
    if (this.config.line.showcircles) {
      lineGroup
        .selectAll<SVGCircleElement, DataPoint>('circle')
        .data(this.dataset[idx] ?? [])
        .enter()
        .append('circle')
        .classed(`cr-${formatClassName(category)}`, true)
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
        .attr('r', this.config.line.circleradius)
        .selection()
        .append('title')
        .text((d, i) => getTooltipText(this.config, category, this.labels[i] ?? '', d));
    }

    // Draw labels with float-up animation
    if (this.config.label.showlabel) {
      lineGroup
        .selectAll<SVGTextElement, DataPoint>('text')
        .data(this.dataset[idx] ?? [])
        .enter()
        .append('text')
        .attr('x', (d) => (horScale(d.name) ?? 0) + horScale.bandwidth() / 2)
        .attr('y', (d) => verScale(d.value) - 5) // Start closer to the circle
        .attr('text-anchor', 'middle')
        .style('fill', color)
        .style('font-size', this.config.line.fontsize)
        .style('font-weight', this.config.line.fontweight)
        .style('opacity', 0)
        .text((d) => getLabelValue(this.config, d))
        .transition()
        .duration(this.config.effects.duration)
        .delay((_, i) => i * 60 + this.config.effects.duration + 100)
        .ease(easeCubicOut)
        .style('opacity', 1)
        .attr('y', (d) => verScale(d.value) - 15); // Float up
    }
  }

  private drawHorizontalLines(
    lineGroup: d3.Selection<SVGGElement, DataPoint[], HTMLElement, unknown>,
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

    lineGroup
      .append('path')
      .attr('d', lineFunc)
      .classed(`cr-${formatClassName(category)}`, true)
      .style('fill', 'none')
      .style('stroke', color)
      .style('stroke-width', this.config.line.strokewidth)
      .style('stroke-opacity', 0)
      .transition()
      .duration(this.config.effects.duration)
      .style('stroke-opacity', 1);

    if (this.config.line.showcircles) {
      lineGroup
        .selectAll<SVGCircleElement, DataPoint>('circle')
        .data(this.dataset[idx] ?? [])
        .enter()
        .append('circle')
        .classed(`cr-${formatClassName(category)}`, true)
        .attr('cx', (d) => horScale(d.value))
        .attr('cy', (d) => (verScale(d.name) ?? 0) + verScale.bandwidth() / 2)
        .attr('r', this.config.line.circleradius)
        .style('fill', color)
        .style('stroke', '#fff')
        .append('title')
        .text((d, i) => getTooltipText(this.config, category, this.labels[i] ?? '', d));
    }
  }

  static create(
    container: string,
    graphdef: GraphDefinition,
    config: PartialChartConfig = {}
  ): LineChart {
    const mergedConfig: PartialChartConfig = {
      ...config,
      meta: { ...config.meta, position: container },
    };
    const chart = new LineChart(graphdef, mergedConfig);
    chart.render();
    return chart;
  }
}
