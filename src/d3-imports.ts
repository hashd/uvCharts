/**
 * Centralized D3 module imports for tree-shaking
 * Only import what you need from D3 to minimize bundle size
 */

// Selection
export { select, selectAll } from 'd3-selection';
export type { Selection, BaseType } from 'd3-selection';

// Scales
export { scaleLinear, scaleBand, scaleOrdinal, scaleLog } from 'd3-scale';
export type { ScaleLinear, ScaleBand, ScaleOrdinal, ScaleLogarithmic } from 'd3-scale';

// Axes
export { axisBottom, axisLeft, axisTop, axisRight } from 'd3-axis';
export type { Axis } from 'd3-axis';

// Shapes
export {
  arc,
  pie,
  line,
  area,
  stack,
  stackOffsetExpand,
  curveLinear,
  curveCardinal,
  curveBasis,
} from 'd3-shape';
export type { Arc, Pie, Line, Area, Stack } from 'd3-shape';

// Array utilities
export { max, min, sum, extent } from 'd3-array';

// Transitions
export { transition } from 'd3-transition';
export type { Transition } from 'd3-transition';

// Easing (for premium animations)
export { easeCubicOut, easeCubicInOut, easeBackOut, easeElasticOut, easeQuadOut } from 'd3-ease';

// Color manipulation
export { rgb, hsl, color } from 'd3-color';
export type { RGBColor, HSLColor, Color } from 'd3-color';
