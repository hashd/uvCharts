/**
 * WaterfallChart - Shows incremental changes in a value
 */
import { type ScaleBand, type ScaleLinear } from '../d3-imports';
import type { GraphDefinition, PartialChartConfig, DataPoint } from '../types';
import { Graph } from './Graph';
import { getColorBand, formatClassName, getTooltipText } from '../utils';

interface WaterfallDataPoint extends DataPoint {
  startValue: number;
  endValue: number;
  isPositive: boolean;
}

/**
 * Waterfall chart showing running totals
 */
export class WaterfallChart extends Graph {
  constructor(graphdef: GraphDefinition, config: PartialChartConfig = {}) {
    graphdef.stepup = 'waterfall';
    // WaterfallChart always uses Vertical orientation (band scale on X axis)
    const mergedConfig: PartialChartConfig = {
      ...config,
      graph: { ...config.graph, orientation: 'Vertical' },
    };
    super(graphdef, mergedConfig);
  }

  protected render(): void {
    this.init();

    const firstCategory = this.graphdef.categories[0];
    if (!firstCategory || !this.chart) return;

    const data = this.graphdef.dataset[firstCategory];
    if (!data || data.length === 0) return;

    const horScale = this.axes.hor.scale as ScaleBand<string>;
    const verScale = this.axes.ver.scale as ScaleLinear<number, number>;

    // Guard: ensure scales exist and horScale is a band scale
    if (!horScale || !verScale || typeof horScale.bandwidth !== 'function') {
      console.warn('WaterfallChart: scales not properly initialized');
      return;
    }

    // Pre-compute waterfall values with running totals
    const waterfallData: WaterfallDataPoint[] = [];
    let runningTotal = 0;

    for (const d of data) {
      const startValue = runningTotal;
      const endValue = runningTotal + d.value;
      waterfallData.push({
        ...d,
        startValue,
        endValue,
        isPositive: d.value >= 0,
      });
      runningTotal = endValue;
    }

    // Draw bars
    const bars = this.chart
      .selectAll<SVGGElement, WaterfallDataPoint>('g.waterfall-bar')
      .data(waterfallData)
      .enter()
      .append('g')
      .classed('waterfall-bar', true)
      .classed(`cge-${formatClassName(firstCategory)}`, true);

    bars
      .append('rect')
      .attr('x', (d) => horScale(d.name) ?? 0)
      .attr('width', horScale.bandwidth())
      .attr('y', (d) => Math.min(verScale(d.startValue), verScale(d.endValue)))
      .attr('height', (d) => Math.abs(verScale(d.startValue) - verScale(d.endValue)))
      .style('fill', (d) =>
        d.isPositive ? getColorBand(this.config, 0) : getColorBand(this.config, 1)
      )
      .style('stroke', this.config.bar.strokecolor);

    // Draw connector lines between bars
    const connectorData: { y: number; xFrom: number; xTo: number }[] = [];

    for (let i = 1; i < waterfallData.length; i++) {
      const prev = waterfallData[i - 1];
      const curr = waterfallData[i];
      if (prev && curr) {
        connectorData.push({
          y: prev.endValue,
          xFrom: (horScale(prev.name) ?? 0) + horScale.bandwidth(),
          xTo: horScale(curr.name) ?? 0,
        });
      }
    }

    this.chart
      .selectAll<SVGLineElement, (typeof connectorData)[0]>('line.connector')
      .data(connectorData)
      .enter()
      .append('line')
      .classed('connector', true)
      .attr('x1', (d) => d.xFrom)
      .attr('x2', (d) => d.xTo)
      .attr('y1', (d) => verScale(d.y))
      .attr('y2', (d) => verScale(d.y))
      .style('stroke', '#666')
      .style('stroke-dasharray', '3,3');

    // Tooltips
    bars
      .append('title')
      .text((d, i) => getTooltipText(this.config, firstCategory, this.labels[i] ?? '', d));

    this.finalize();
  }

  static create(
    container: string,
    graphdef: GraphDefinition,
    config: PartialChartConfig = {}
  ): WaterfallChart {
    const mergedConfig: PartialChartConfig = {
      ...config,
      meta: { ...config.meta, position: container },
    };
    const chart = new WaterfallChart(graphdef, mergedConfig);
    chart.render();
    return chart;
  }
}
