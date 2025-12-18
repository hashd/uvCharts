/**
 * DonutChart - A donut (ring) chart, extends PieChart with inner radius
 */
import { arc, pie, easeCubicOut } from '../d3-imports';
import type { GraphDefinition, PartialChartConfig } from '../types';
import { PieChart } from './PieChart';
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
 * Donut chart - pie chart with hollow center
 */
export class DonutChart extends PieChart {
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

    // Inner radius creates the donut hole
    const innerRadius = this.radius * (this.config.donut.factor ?? 0.4);

    const arcFunc = arc<PieData>().innerRadius(innerRadius).outerRadius(this.radius);

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

    // Draw donut slices with reveal animation
    arcs
      .append('path')
      .attr('d', arcFunc)
      .style('fill', (_, i) => getColorBand(this.config, i))
      .style('stroke', this.config.donut.strokecolor)
      .style('stroke-width', this.config.donut.strokewidth)
      .style('opacity', 0)
      .style('transform', 'scale(0.85)')
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
        .style('fill', this.config.donut.fontfill)
        .style('font-family', this.config.donut.fontfamily)
        .style('font-size', this.config.donut.fontsize)
        .style('font-weight', this.config.donut.fontweight)
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
  ): DonutChart {
    const mergedConfig: PartialChartConfig = {
      ...config,
      meta: { ...config.meta, position: container },
    };
    const chart = new DonutChart(graphdef, mergedConfig);
    chart.render();
    return chart;
  }
}
