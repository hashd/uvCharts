/**
 * PieChart - A pie chart for part-to-whole comparisons
 */
import { arc, pie, easeCubicOut } from '../d3-imports';
import type { GraphDefinition, PartialChartConfig } from '../types';
import { Graph } from './Graph';
import {
  getColorBand,
  formatClassName,
  getLabelValue,
  getTooltipText,
  getCategoryData,
} from '../utils';
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
 * Pie chart for displaying proportions
 */
export class PieChart extends Graph {
  protected radius = 0;
  protected center = { x: 0, y: 0 };
  protected category = '';

  constructor(graphdef: GraphDefinition, config: PartialChartConfig = {}) {
    graphdef.stepup = 'normal';
    super(graphdef, {
      ...config,
      legend: { ...config.legend, legendtype: 'labels' },
    });
  }

  protected render(): void {
    this.init();

    this.radius = (Math.min(this.height(), this.width()) * 2) / 5;
    this.center = {
      x: this.width() / 2,
      y: this.height() / 2,
    };

    const firstCategory = this.graphdef.categories[0];
    if (!firstCategory || !this.chart) return;
    this.category = firstCategory;

    const data = getCategoryData(this.graphdef, [this.category])[0] ?? [];

    const arcFunc = arc<PieData>().innerRadius(0).outerRadius(this.radius);

    const pieLayout = pie<number>().value((d) => d);
    const pieData = pieLayout(data) as unknown as PieData[];

    const arcs = this.chart
      .selectAll<SVGGElement, PieData>('g.arc')
      .data(pieData)
      .enter()
      .append('g')
      .classed(`${CssClasses.arc}${formatClassName(this.category)}`, true)
      .attr('class', (_, i) => `cge-${formatClassName(this.labels[i] ?? '')}`)
      .attr('transform', `translate(${this.center.x},${this.center.y})`);

    // Draw pie slices with reveal animation
    arcs
      .append('path')
      .attr('d', arcFunc)
      .style('fill', (_, i) => getColorBand(this.config, i))
      .style('stroke', this.config.pie.strokecolor)
      .style('stroke-width', this.config.pie.strokewidth)
      .style('opacity', 0)
      .style('transform', 'scale(0.8)')
      .style('transform-origin', 'center')
      .transition()
      .duration(400)
      .delay((_, i) => i * 80)
      .ease(easeCubicOut)
      .style('opacity', 1)
      .style('transform', 'scale(1)');

    // Add labels
    if (this.config.label.showlabel) {
      arcs
        .append('text')
        .attr('transform', (d) => `translate(${arcFunc.centroid(d)})`)
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .style('fill', this.config.pie.fontfill)
        .style('font-family', this.config.pie.fontfamily)
        .style('font-size', this.config.pie.fontsize)
        .style('font-weight', this.config.pie.fontweight)
        .text((d) => getLabelValue(this.config, { name: '', value: d.data }));
    }

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
  ): PieChart {
    const mergedConfig: PartialChartConfig = {
      ...config,
      meta: { ...config.meta, position: container },
    };
    const chart = new PieChart(graphdef, mergedConfig);
    chart.render();
    return chart;
  }
}
