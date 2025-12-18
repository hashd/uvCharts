/**
 * StackedBarChart - Bars stacked on top of each other
 */
import { type ScaleBand, type ScaleLinear } from '../d3-imports';
import type { GraphDefinition, PartialChartConfig, DataPoint } from '../types';
import { Graph } from './Graph';
import { getColorBand, formatClassName, getTooltipText } from '../utils';

/**
 * Stacked bar chart showing cumulative values
 */
export class StackedBarChart extends Graph {
  private bargroups: Record<string, d3.Selection<SVGGElement, unknown, HTMLElement, unknown>> = {};

  constructor(graphdef: GraphDefinition, config: PartialChartConfig = {}) {
    graphdef.stepup = 'stepup';
    super(graphdef, config);
  }

  protected render(): void {
    this.init();

    const categoryAxis = this.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor';
    if (this.axes[categoryAxis].scale) {
      (this.axes[categoryAxis].scale as ScaleBand<string>).domain(this.labels);
    }

    // Cumulative sum for stacking
    const csum = this.labels.map(() => 0);

    for (let idx = 0; idx < this.categories.length; idx++) {
      const category = this.categories[idx];
      if (!category || !this.chart) continue;

      this.bargroups[category] = this.chart
        .append('g')
        .classed(`cg-${formatClassName(category)}`, true);

      if (this.config.graph.orientation === 'Horizontal') {
        this.drawHorizontalBars(idx, csum);
      } else {
        this.drawVerticalBars(idx, csum);
      }
    }

    this.finalize();
  }

  private drawVerticalBars(idx: number, csum: number[]): void {
    const category = this.categories[idx];
    if (!category) return;

    const categoryData = this.graphdef.dataset[category];
    if (!categoryData) return;

    const color = getColorBand(this.config, idx);
    const barGroup = this.bargroups[category];
    if (!barGroup) return;

    const horScale = this.axes.hor.scale as ScaleBand<string>;
    const verScale = this.axes.ver.scale as ScaleLinear<number, number>;

    const bars = barGroup
      .selectAll<SVGGElement, DataPoint>('g')
      .data(categoryData)
      .enter()
      .append('g')
      .classed(`cge-${formatClassName(category)}`, true);

    // Draw stacked bars with rounded corners
    bars
      .append('rect')
      .classed(`cr-${formatClassName(category)}`, true)
      .attr('width', horScale.bandwidth())
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('x', (d) => horScale(d.name) ?? 0)
      .attr('y', (d, i) => {
        csum[i] = (csum[i] ?? 0) + d.value;
        return verScale(csum[i] ?? 0);
      })
      .attr('height', 0)
      .style('fill', color)
      .style('stroke', 'rgba(255,255,255,0.1)')
      .transition()
      .duration(this.config.effects.duration)
      .delay(idx * this.config.effects.duration)
      .attr('height', (d) => Math.abs(verScale(0) - verScale(d.value)));

    // Add tooltips
    bars
      .append('title')
      .text((d, i) => getTooltipText(this.config, category, this.labels[i] ?? '', d));

    // Transform for bottom-up rendering
    barGroup.attr('transform', `translate(0,${2 * this.height()}) scale(1,-1)`);
  }

  private drawHorizontalBars(idx: number, csum: number[]): void {
    const category = this.categories[idx];
    if (!category) return;

    const categoryData = this.graphdef.dataset[category];
    if (!categoryData) return;

    const color = getColorBand(this.config, idx);
    const barGroup = this.bargroups[category];
    if (!barGroup) return;

    const horScale = this.axes.hor.scale as ScaleLinear<number, number>;
    const verScale = this.axes.ver.scale as ScaleBand<string>;

    const bars = barGroup
      .selectAll<SVGGElement, DataPoint>('g')
      .data(categoryData)
      .enter()
      .append('g')
      .classed(`cge-${formatClassName(category)}`, true);

    bars
      .append('rect')
      .classed(`cr-${formatClassName(category)}`, true)
      .attr('height', verScale.bandwidth())
      .attr('x', (d, i) => {
        const x = horScale(csum[i] ?? 0);
        csum[i] = (csum[i] ?? 0) + d.value;
        return x;
      })
      .attr('y', (d) => verScale(d.name) ?? 0)
      .attr('width', 0)
      .style('fill', color)
      .style('stroke', 'none')
      .transition()
      .duration(this.config.effects.duration)
      .delay(idx * this.config.effects.duration)
      .attr('width', (d) => Math.abs(horScale(d.value) - horScale(0)));

    bars
      .append('title')
      .text((d, i) => getTooltipText(this.config, category, this.labels[i] ?? '', d));
  }

  static create(
    container: string,
    graphdef: GraphDefinition,
    config: PartialChartConfig = {}
  ): StackedBarChart {
    const mergedConfig: PartialChartConfig = {
      ...config,
      meta: { ...config.meta, position: container },
    };
    const chart = new StackedBarChart(graphdef, mergedConfig);
    chart.render();
    return chart;
  }
}
