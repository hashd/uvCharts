/**
 * CSS class constants for chart elements
 */
export const CssClasses = {
  uv: 'uv',
  pos: 'uv-div',
  frame: 'uv-frame',
  panel: 'uv-panel',
  bg: 'uv-chart-bg',
  chart: 'uv-chart',
  axes: 'uv-axes',
  legend: 'uv-legend',
  framebg: 'uv-frame-bg',
  horaxis: 'uv-hor-axis',
  veraxis: 'uv-ver-axis',
  caption: 'uv-caption',
  captiontext: 'uv-caption-text',
  subcaption: 'uv-subcaption',
  subcaptiontext: 'uv-subcaption-text',
  axeslabelgroup: 'uv-axes-label-group',
  axeslabel: 'uv-axes-label',
  axessublabel: 'uv-axes-sub-label',
  legendsign: 'uv-legend-sign',
  legendlabel: 'uv-legend-label',
  hoverbg: 'uv-hover-bg',
  arc: 'uv-arc-',
  areapath: 'uv-areapath-',
  linepath: 'uv-linepath-',
  area: 'uv-area-',
  line: 'uv-line-',
  dot: 'uv-dot',
  chartdiv: 'uv-chart-div',
  circleticks: 'circle-ticks',
  download: 'uv-download-options',
} as const;

export type CssClass = (typeof CssClasses)[keyof typeof CssClasses];
