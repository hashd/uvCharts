/**
 * uvCharts v2.0 - Core Type Definitions
 * A TypeScript charting library built on D3.js
 */

// =============================================================================
// Data Types
// =============================================================================

/**
 * Represents a single data point in a chart series
 */
export interface DataPoint {
  /** Label for this data point */
  name: string;
  /** Numeric value of this data point */
  value: number;
  /** For waterfall charts: reset cumulative sum before this point */
  resetSum?: boolean;
}

/**
 * Defines the structure of data passed to create a chart
 */
export interface GraphDefinition {
  /** Array of category/series names */
  categories: string[];
  /** Dataset keyed by category name, each containing array of data points */
  dataset: Record<string, DataPoint[]>;
  /** Type of stacking behavior */
  stepup?: StepUpType;
}

export type StepUpType = 'normal' | 'stepup' | 'percent' | 'waterfall';

// =============================================================================
// Configuration Types
// =============================================================================

export type Orientation = 'Horizontal' | 'Vertical';
export type ScaleType = 'linear' | 'log';
export type LegendPosition = 'bottom' | 'right';
export type LegendType = 'categories' | 'labels';

/**
 * Graph-level configuration options
 */
export interface GraphConfig {
  /** Color palette name or 'custom' */
  palette: string;
  /** Background color of the graph area */
  bgcolor: string;
  /** Orientation of bars/axes */
  orientation: Orientation;
  /** Maximum value for scale (0 = auto) */
  max: number;
  /** Minimum value for scale (0 = auto) */
  min: number;
  /** Custom color palette array */
  custompalette: string[];
  /** Opacity of chart elements */
  opacity: number;
  /** Enable responsive sizing */
  responsive: boolean;
  /** SVG preserveAspectRatio alignment */
  align: string;
  /** SVG preserveAspectRatio meetOrSlice */
  meetOrSlice: string;
}

/**
 * Metadata configuration (captions, labels, etc.)
 */
export interface MetaConfig {
  /** CSS selector for the container element */
  position: string;
  /** Main chart caption */
  caption: string;
  /** Sub-caption text */
  subcaption: string;
  /** Horizontal axis label */
  hlabel: string;
  /** Vertical axis label */
  vlabel: string;
  /** Horizontal axis sub-label */
  hsublabel: string;
  /** Vertical axis sub-label */
  vsublabel: string;
  /** Enable download functionality */
  isDownloadable: boolean;
  /** Text for download button */
  downloadLabel: string;
}

/**
 * Chart dimension configuration
 */
export interface DimensionConfig {
  width: number;
  height: number;
}

/**
 * Margin configuration
 */
export interface MarginConfig {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * Axis configuration
 */
export interface AxisConfig {
  ticks: number;
  subticks: number;
  padding: number;
  minor: number;
  strokecolor: string;
  fontfamily: string;
  fontsize: string;
  fontweight: string;
  showticks: boolean;
  showsubticks: boolean;
  showtext: boolean;
  showhortext: boolean;
  showvertext: boolean;
  opacity: number;
}

/**
 * Label configuration
 */
export interface LabelConfig {
  fontfamily: string;
  fontsize: string;
  fontweight: string;
  strokecolor: string;
  showlabel: boolean;
  precision: number;
  prefix: string;
  suffix: string;
  formatter: ((value: number) => string) | undefined;
}

/**
 * Tooltip configuration
 */
export interface TooltipConfig {
  show: boolean;
  /** Format string: %c = category, %l = label, %v = value */
  format: string;
}

/**
 * Scale configuration
 */
export interface ScaleConfig {
  type: ScaleType;
  ordinality: number;
}

/**
 * Bar chart specific configuration
 */
export interface BarConfig {
  strokecolor: string;
  fontfamily: string;
  fontsize: string;
  fontweight: string;
  textcolor: string;
  /** Enable gradient fill for bars */
  useGradient: boolean;
}

/**
 * Line chart specific configuration
 */
export interface LineConfig {
  interpolation: string;
  showcircles: boolean;
  circleradius: number;
  circleopacity: number;
  fontfamily: string;
  fontsize: string;
  fontweight: string;
  textcolor: string;
  strokewidth: number;
  strokeopacity: number;
  /** Enable gradient area fill under the line */
  showAreaFill: boolean;
}

/**
 * Area chart specific configuration
 */
export interface AreaConfig {
  interpolation: string;
  offset: string;
  opacity: number;
  /** Show value labels above data points */
  showLabels: boolean;
}

/**
 * Pie chart specific configuration
 */
export interface PieConfig {
  fontfamily: string;
  fontsize: string;
  fontweight: string;
  fontvariant: string;
  fontfill: string;
  strokecolor: string;
  strokewidth: number;
}

/**
 * Donut chart specific configuration
 */
export interface DonutConfig extends PieConfig {
  factor: number;
}

/**
 * Caption styling configuration
 */
export interface CaptionConfig {
  fontfamily: string;
  fontsize: string;
  fontweight: string;
  fontvariant: string;
  textdecoration: string;
  hovercolor: string;
  strokecolor: string;
  textanchor: string;
  cursor: string;
}

/**
 * Sub-caption styling configuration
 */
export interface SubCaptionConfig {
  fontfamily: string;
  fontsize: string;
  fontweight: string;
  fontvariant: string;
  textdecoration: string;
  textanchor: string;
}

/**
 * Legend configuration
 */
export interface LegendConfig {
  position: LegendPosition;
  fontfamily: string;
  fontsize: string;
  fontweight: string;
  color: string;
  strokewidth: number;
  textmargin: number;
  symbolsize: number;
  inactivecolor: string;
  legendstart: number;
  legendtype: LegendType;
  showlegends: boolean;
}

/**
 * Animation effects configuration
 */
export interface EffectsConfig {
  hovercolor: string;
  strokecolor: string;
  textcolor: string;
  duration: number;
  hover: number;
  showhovertext: boolean;
}

/**
 * Frame styling configuration
 */
export interface FrameConfig {
  bgcolor: string;
}

/**
 * Complete chart configuration
 */
export interface ChartConfig {
  graph: GraphConfig;
  meta: MetaConfig;
  dimension: DimensionConfig;
  margin: MarginConfig;
  frame: FrameConfig;
  axis: AxisConfig;
  label: LabelConfig;
  tooltip: TooltipConfig;
  scale: ScaleConfig;
  bar: BarConfig;
  line: LineConfig;
  area: AreaConfig;
  pie: PieConfig;
  donut: DonutConfig;
  caption: CaptionConfig;
  subCaption: SubCaptionConfig;
  legend: LegendConfig;
  effects: EffectsConfig;
}

/**
 * Partial chart configuration for user overrides
 */
export type PartialChartConfig = {
  [K in keyof ChartConfig]?: Partial<ChartConfig[K]>;
};

// =============================================================================
// Chart Types
// =============================================================================

export type ChartType =
  | 'bar'
  | 'stackedBar'
  | 'stepUpBar'
  | 'percentBar'
  | 'line'
  | 'area'
  | 'stackedArea'
  | 'percentArea'
  | 'pie'
  | 'donut'
  | 'waterfall'
  | 'polarArea';
