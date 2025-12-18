/**
 * PolarAreaChart - Pie chart variant with equal angles but varying radii
 */
import { arc, pie } from '../d3-imports';
import type { GraphDefinition, PartialChartConfig } from '../types';
import { Graph } from './Graph';
import { getColorBand, formatClassName, getTooltipText, getCategoryData } from '../utils';
import { CssClasses } from '../constants';

interface PieData {
  data: number;
  value: number;
  index: number;
  startAngle: number;
  endAngle: number;
  padAngle: number;
}

/**
 * Polar area chart (nightingale/rose chart) - equal angles, varying radii
 */
export class PolarAreaChart extends Graph {
  private radius = 0;
  private center = { x: 0, y: 0 };
  private category = '';

  constructor(graphdef: GraphDefinition, config: PartialChartConfig = {}) {
    graphdef.stepup = 'normal';
    super(graphdef, { ...config, legend: { ...config.legend, legendtype: 'labels' } });
  }

  protected render(): void {
    this.init();

    this.radius = (Math.min(this.height(), this.width()) * 2) / 5;
    this.center = { x: this.width() / 2, y: this.height() / 2 };

    const firstCategory = this.graphdef.categories[0];
    if (!firstCategory || !this.chart) return;
    this.category = firstCategory;

    const data = getCategoryData(this.graphdef, [this.category])[0] ?? [];
    const maxValue = Math.max(...data);

    // Equal angle slices
    const pieLayout = pie<number>().value(() => 1); // Equal angles
    const pieData = pieLayout(data) as unknown as PieData[];

    const arcs = this.chart
      .selectAll<SVGGElement, PieData>('g.arc')
      .data(pieData)
      .enter()
      .append('g')
      .classed(`${CssClasses.arc}${formatClassName(this.category)}`, true)
      .attr('class', (_, i) => `cge-${formatClassName(this.labels[i] ?? '')}`)
      .attr('transform', `translate(${this.center.x},${this.center.y})`);

    // Arc with radius proportional to value
    arcs
      .append('path')
      .attr('d', (d) => {
        const radiusScale = (d.data / maxValue) * this.radius;
        const arcFunc = arc<PieData>().innerRadius(0).outerRadius(radiusScale);
        return arcFunc(d);
      })
      .style('fill', (_, i) => getColorBand(this.config, i))
      .style('stroke', this.config.pie.strokecolor)
      .style('stroke-width', this.config.pie.strokewidth);

    // Add tooltips
    arcs.append('title').text((d, i) =>
      getTooltipText(this.config, this.category, this.labels[i] ?? '', {
        name: this.labels[i] ?? '',
        value: d.data,
      })
    );
  }

  static create(
    container: string,
    graphdef: GraphDefinition,
    config: PartialChartConfig = {}
  ): PolarAreaChart {
    const mergedConfig: PartialChartConfig = {
      ...config,
      meta: { ...config.meta, position: container },
    };
    const chart = new PolarAreaChart(graphdef, mergedConfig);
    chart.render();
    return chart;
  }
}
