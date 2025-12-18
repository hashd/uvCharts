/**
 * Default configuration values for uvCharts
 * Modern, premium styling with system fonts and refined aesthetics
 */
import type { ChartConfig } from '../types';

// System font stack for modern, native appearance
const systemFonts =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const defaultConfig: ChartConfig = {
  graph: {
    palette: 'Default',
    bgcolor: 'transparent',
    orientation: 'Vertical',
    max: 0,
    min: 0,
    custompalette: [],
    opacity: 1,
    responsive: true,
    align: 'xMinYMin',
    meetOrSlice: 'meet',
  },

  meta: {
    position: '#uv-div',
    caption: '',
    subcaption: '',
    hlabel: '',
    vlabel: '',
    hsublabel: '',
    vsublabel: '',
    isDownloadable: false,
    downloadLabel: 'Download',
  },

  dimension: {
    width: 500,
    height: 350,
  },

  margin: {
    top: 60,
    bottom: 80,
    left: 60,
    right: 40,
  },

  frame: {
    bgcolor: 'transparent',
  },

  axis: {
    ticks: 8,
    subticks: 2,
    padding: 5,
    minor: -10,
    strokecolor: '#f1f5f9', // Lighter, more subtle grid lines
    fontfamily: systemFonts,
    fontsize: '12',
    fontweight: '400',
    showticks: true,
    showsubticks: false,
    showtext: true,
    showhortext: true,
    showvertext: true,
    opacity: 0.8, // Slightly more opaque since color is lighter, provides crispness
  },

  label: {
    fontfamily: systemFonts,
    fontsize: '11',
    fontweight: '400',
    strokecolor: '#64748b',
    showlabel: true,
    precision: 1,
    prefix: '',
    suffix: '',
    formatter: undefined,
  },

  tooltip: {
    show: true,
    format: '%c · %l: %v',
  },

  scale: {
    type: 'linear',
    ordinality: 0.25,
  },

  bar: {
    strokecolor: 'rgba(255,255,255,0.2)',
    fontfamily: systemFonts,
    fontsize: '11',
    fontweight: '500',
    textcolor: '#1e293b',
    useGradient: true,
  },

  line: {
    interpolation: 'monotone',
    showcircles: true,
    circleradius: 5,
    circleopacity: 1,
    fontfamily: systemFonts,
    fontsize: '11',
    fontweight: '500',
    textcolor: '#1e293b',
    strokewidth: 3,
    strokeopacity: 1,
    showAreaFill: false,
  },

  area: {
    interpolation: 'monotone',
    offset: 'zero',
    opacity: 0.15,
    showLabels: false,
  },

  pie: {
    fontfamily: systemFonts,
    fontsize: '12',
    fontweight: '600',
    fontvariant: 'normal',
    fontfill: '#ffffff',
    strokecolor: '#ffffff',
    strokewidth: 2,
  },

  donut: {
    fontfamily: systemFonts,
    fontsize: '12',
    fontweight: '600',
    fontvariant: 'normal',
    fontfill: '#1e293b',
    factor: 0.55,
    strokecolor: '#ffffff',
    strokewidth: 2,
  },

  caption: {
    fontfamily: systemFonts,
    fontsize: '16',
    fontweight: '600',
    fontvariant: 'normal',
    textdecoration: 'none',
    hovercolor: '#6366f1',
    strokecolor: '#0f172a',
    textanchor: 'middle',
    cursor: 'default',
  },

  subCaption: {
    fontfamily: systemFonts,
    fontsize: '12',
    fontweight: '400',
    fontvariant: 'normal',
    textdecoration: 'none',
    textanchor: 'middle',
  },

  legend: {
    position: 'bottom',
    fontfamily: systemFonts,
    fontsize: '12',
    fontweight: '500',
    color: '#475569',
    strokewidth: 0,
    textmargin: 8,
    symbolsize: 12,
    inactivecolor: '#cbd5e1',
    legendstart: 0,
    legendtype: 'categories',
    showlegends: true,
  },

  effects: {
    hovercolor: '#6366f1',
    strokecolor: 'rgba(99, 102, 241, 0.3)',
    textcolor: '#0f172a',
    duration: 300,
    hover: 150,
    showhovertext: false,
  },
};
