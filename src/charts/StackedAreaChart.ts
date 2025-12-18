/**
 * StackedAreaChart - Areas stacked on top of each other
 */
import { area, line, curveLinear, stack, type ScaleBand, type ScaleLinear } from '../d3-imports';
import type { GraphDefinition, PartialChartConfig } from '../types';
import { Graph } from './Graph';
import { getColorBand, formatClassName } from '../utils';
import { CssClasses } from '../constants';

interface StackDataPoint {
  [key: string]: number | string;
}

/**
 * Stacked area chart showing cumulative values
 */
export class StackedAreaChart extends Graph {
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

    // Convert data to stack-compatible format
    const stackData = this.prepareStackData();
    const stackLayout = stack<StackDataPoint>().keys(this.categories);
    const stacked = stackLayout(stackData);

    if (!this.chart) return;

    const areaGroup = this.chart
      .selectAll<SVGGElement, d3.Series<StackDataPoint, string>>('g')
      .data(stacked)
      .enter()
      .append('g')
      .attr('class', (d) => `cge-${formatClassName(d.key)}`);

    if (this.config.graph.orientation === 'Horizontal') {
      this.drawHorizontalArea(areaGroup);
    } else {
      this.drawVerticalArea(areaGroup);
    }

    this.finalize();
  }

  private prepareStackData(): StackDataPoint[] {
    const result: StackDataPoint[] = [];

    for (let i = 0; i < this.labels.length; i++) {
      const point: StackDataPoint = { name: this.labels[i] ?? '' };
      for (const category of this.categories) {
        const categoryData = this.graphdef.dataset[category];
        point[category] = categoryData?.[i]?.value ?? 0;
      }
      result.push(point);
    }

    return result;
  }

  private drawVerticalArea(
    areaGroup: d3.Selection<SVGGElement, d3.Series<StackDataPoint, string>, SVGGElement, unknown>
  ): void {
    const horScale = this.axes.hor.scale as ScaleBand<string>;
    const verScale = this.axes.ver.scale as ScaleLinear<number, number>;

    const areaFunc = area<d3.SeriesPoint<StackDataPoint>>()
      .x((d) => (horScale(d.data['name'] as string) ?? 0) + horScale.bandwidth() / 2)
      .y0((d) => verScale(d[0]))
      .y1((d) => verScale(d[1]))
      .curve(curveLinear);

    const lineFunc = line<d3.SeriesPoint<StackDataPoint>>()
      .x((d) => (horScale(d.data['name'] as string) ?? 0) + horScale.bandwidth() / 2)
      .y((d) => verScale(d[1]))
      .curve(curveLinear);

    areaGroup
      .append('path')
      .attr('class', (d) => `${CssClasses.area}${formatClassName(d.key)}`)
      .style('fill', (_, i) => getColorBand(this.config, i))
      .attr('d', areaFunc);

    areaGroup
      .append('path')
      .attr('class', (d) => `${CssClasses.line}${formatClassName(d.key)}`)
      .style('stroke', 'white')
      .style('fill', 'none')
      .style('stroke-width', 2)
      .attr('d', lineFunc);
  }

  private drawHorizontalArea(
    areaGroup: d3.Selection<SVGGElement, d3.Series<StackDataPoint, string>, SVGGElement, unknown>
  ): void {
    const horScale = this.axes.hor.scale as ScaleLinear<number, number>;
    const verScale = this.axes.ver.scale as ScaleBand<string>;

    const areaFunc = area<d3.SeriesPoint<StackDataPoint>>()
      .y((d) => (verScale(d.data['name'] as string) ?? 0) + verScale.bandwidth() / 2)
      .x0((d) => horScale(d[0]))
      .x1((d) => horScale(d[1]))
      .curve(curveLinear);

    const lineFunc = line<d3.SeriesPoint<StackDataPoint>>()
      .y((d) => (verScale(d.data['name'] as string) ?? 0) + verScale.bandwidth() / 2)
      .x((d) => horScale(d[1]))
      .curve(curveLinear);

    areaGroup
      .append('path')
      .attr('class', (d) => `${CssClasses.area}${formatClassName(d.key)}`)
      .style('fill', (_, i) => getColorBand(this.config, i))
      .attr('d', areaFunc);

    areaGroup
      .append('path')
      .attr('class', (d) => `${CssClasses.line}${formatClassName(d.key)}`)
      .style('stroke', 'white')
      .style('fill', 'none')
      .style('stroke-width', 2)
      .attr('d', lineFunc);
  }

  static create(
    container: string,
    graphdef: GraphDefinition,
    config: PartialChartConfig = {}
  ): StackedAreaChart {
    const mergedConfig: PartialChartConfig = {
      ...config,
      meta: { ...config.meta, position: container },
    };
    const chart = new StackedAreaChart(graphdef, mergedConfig);
    chart.render();
    return chart;
  }
}
