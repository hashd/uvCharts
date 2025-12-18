/**
 * PercentBarChart - Bars showing percentage of total
 */
import { type ScaleBand, type ScaleLinear } from '../d3-imports';
import type { GraphDefinition, PartialChartConfig, DataPoint } from '../types';
import { Graph } from './Graph';
import { getColorBand, formatClassName, getTooltipText } from '../utils';

/**
 * Percent bar chart - bars sum to 100%
 */
export class PercentBarChart extends Graph {
  private bargroups: Record<string, d3.Selection<SVGGElement, unknown, HTMLElement, unknown>> = {};

  constructor(graphdef: GraphDefinition, config: PartialChartConfig = {}) {
    graphdef.stepup = 'percent';
    super(graphdef, config);
  }

  protected render(): void {
    this.init();

    const categoryAxis = this.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor';
    if (this.axes[categoryAxis].scale) {
      (this.axes[categoryAxis].scale as ScaleBand<string>).domain(this.labels);
    }

    // Calculate totals for percentage
    const totals = this.calculateTotals();
    const csum = this.labels.map(() => 0);

    for (let idx = 0; idx < this.categories.length; idx++) {
      const category = this.categories[idx];
      if (!category || !this.chart) continue;

      this.bargroups[category] = this.chart
        .append('g')
        .classed(`cg-${formatClassName(category)}`, true);

      if (this.config.graph.orientation === 'Horizontal') {
        this.drawHorizontalBars(idx, csum, totals);
      } else {
        this.drawVerticalBars(idx, csum, totals);
      }
    }

    this.finalize();
  }

  private calculateTotals(): number[] {
    const totals = this.labels.map(() => 0);
    for (const category of this.categories) {
      const data = this.graphdef.dataset[category];
      if (data) {
        data.forEach((d, i) => {
          totals[i] = (totals[i] ?? 0) + d.value;
        });
      }
    }
    return totals;
  }

  private drawVerticalBars(idx: number, csum: number[], totals: number[]): void {
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

    bars
      .append('rect')
      .classed(`cr-${formatClassName(category)}`, true)
      .attr('width', horScale.bandwidth())
      .attr('x', (d) => horScale(d.name) ?? 0)
      .attr('y', (d, i) => {
        const percent = (d.value / (totals[i] ?? 1)) * 100;
        csum[i] = (csum[i] ?? 0) + percent;
        return verScale(csum[i] ?? 0);
      })
      .attr('height', 0)
      .style('fill', color)
      .transition()
      .duration(this.config.effects.duration)
      .attr('height', (d, i) => {
        const percent = (d.value / (totals[i] ?? 1)) * 100;
        return Math.abs(verScale(0) - verScale(percent));
      });

    bars
      .append('title')
      .text((d, i) => getTooltipText(this.config, category, this.labels[i] ?? '', d));

    barGroup.attr('transform', `translate(0,${2 * this.height()}) scale(1,-1)`);
  }

  private drawHorizontalBars(idx: number, csum: number[], totals: number[]): void {
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
        const percent = (d.value / (totals[i] ?? 1)) * 100;
        csum[i] = (csum[i] ?? 0) + percent;
        return x;
      })
      .attr('y', (d) => verScale(d.name) ?? 0)
      .attr('width', 0)
      .style('fill', color)
      .transition()
      .duration(this.config.effects.duration)
      .attr('width', (d, i) => {
        const percent = (d.value / (totals[i] ?? 1)) * 100;
        return Math.abs(horScale(percent) - horScale(0));
      });

    bars
      .append('title')
      .text((d, i) => getTooltipText(this.config, category, this.labels[i] ?? '', d));
  }

  static create(
    container: string,
    graphdef: GraphDefinition,
    config: PartialChartConfig = {}
  ): PercentBarChart {
    const mergedConfig: PartialChartConfig = {
      ...config,
      meta: { ...config.meta, position: container },
    };
    const chart = new PercentBarChart(graphdef, mergedConfig);
    chart.render();
    return chart;
  }
}
