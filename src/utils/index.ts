/**
 * Utility functions for uvCharts
 */
import type { GraphDefinition, ChartConfig, DataPoint, StepUpType } from '../types';
import { palettes, type PaletteName } from '../palette';

/**
 * Generate a unique identifier
 */
export function getUniqueId(): string {
  return crypto.randomUUID();
}

// =============================================================================
// Data Calculation Utilities
// =============================================================================

/**
 * Get the maximum value from a graph definition based on classification type
 */
export function getMax(graphdef: GraphDefinition, classification: StepUpType): number {
  switch (classification) {
    case 'stepup':
      return getStepMaxValue(graphdef);
    case 'normal':
      return getMaxValue(graphdef);
    case 'percent':
      return 100;
    case 'waterfall':
      return getWaterfallMaxValue(graphdef);
    default:
      console.error('Unknown classification for chart', classification);
      return 0;
  }
}

/**
 * Get maximum value from dataset (normal charts)
 */
export function getMaxValue(graphdef: GraphDefinition): number {
  let maxVal = -Infinity;
  for (const category of graphdef.categories) {
    const categoryData = graphdef.dataset[category];
    if (categoryData) {
      for (const point of categoryData) {
        if (point.value > maxVal) {
          maxVal = point.value;
        }
      }
    }
  }
  return maxVal === -Infinity ? 0 : maxVal;
}

/**
 * Get maximum stacked value (for stacked charts)
 */
export function getStepMaxValue(graphdef: GraphDefinition): number {
  const firstCategory = graphdef.categories[0];
  if (!firstCategory) return 0;
  const firstCategoryData = graphdef.dataset[firstCategory];
  if (!firstCategoryData) return 0;

  const sumMap = firstCategoryData.map(() => 0);
  const maxMap = firstCategoryData.map(() => 0);

  for (const category of graphdef.categories) {
    const categoryData = graphdef.dataset[category];
    if (categoryData) {
      categoryData.forEach((d, i) => {
        if (sumMap[i] === undefined || maxMap[i] === undefined) return;
        if (d.resetSum === true) {
          sumMap[i] = 0;
        }
        sumMap[i] += d.value;
        maxMap[i] = Math.max(sumMap[i], maxMap[i]);
      });
    }
  }

  return Math.max(...maxMap);
}

/**
 * Get maximum value for waterfall charts
 */
export function getWaterfallMaxValue(graphdef: GraphDefinition): number {
  const sumMap = graphdef.categories.map(() => 0);

  graphdef.categories.forEach((category, i) => {
    const categoryData = graphdef.dataset[category];
    if (categoryData) {
      let localMax = 0;
      for (const d of categoryData) {
        localMax += d.value;
        if (sumMap[i] !== undefined && sumMap[i] < localMax) {
          sumMap[i] = localMax;
        }
      }
    }
  });

  return Math.max(...sumMap);
}

/**
 * Get the minimum value from a graph definition based on classification type
 */
export function getMin(graphdef: GraphDefinition, classification: StepUpType): number {
  switch (classification) {
    case 'normal':
      return getMinValue(graphdef);
    case 'stepup':
      return getStepMinValue(graphdef);
    default:
      return 0;
  }
}

/**
 * Get minimum value from dataset
 */
export function getMinValue(graphdef: GraphDefinition): number {
  let minVal = Infinity;
  for (const category of graphdef.categories) {
    const categoryData = graphdef.dataset[category];
    if (categoryData) {
      for (const point of categoryData) {
        if (point.value < minVal) {
          minVal = point.value;
        }
      }
    }
  }
  return Math.min(0, minVal === Infinity ? 0 : minVal);
}

/**
 * Get minimum stacked value
 */
export function getStepMinValue(graphdef: GraphDefinition): number {
  const firstCategory = graphdef.categories[0];
  if (!firstCategory) return 0;
  const firstCategoryData = graphdef.dataset[firstCategory];
  if (!firstCategoryData) return 0;

  const sumMap = firstCategoryData.map(() => 0);
  const minMap = firstCategoryData.map(() => 0);

  for (const category of graphdef.categories) {
    const categoryData = graphdef.dataset[category];
    if (categoryData) {
      categoryData.forEach((d, i) => {
        if (sumMap[i] === undefined || minMap[i] === undefined) return;
        sumMap[i] += d.value;
        minMap[i] = Math.min(sumMap[i], minMap[i]);
      });
    }
  }

  return Math.min(...minMap);
}

/**
 * Get sum array for stacked charts
 */
export function getSumUpArray(graphdef: GraphDefinition): number[] {
  const firstCategory = graphdef.categories[0];
  if (!firstCategory) return [];
  const firstCategoryData = graphdef.dataset[firstCategory];
  if (!firstCategoryData) return [];

  const sumMap = firstCategoryData.map(() => 0);

  for (const category of graphdef.categories) {
    const categoryData = graphdef.dataset[category];
    if (categoryData) {
      categoryData.forEach((d, i) => {
        if (sumMap[i] === undefined) return;
        sumMap[i] += d.value;
      });
    }
  }

  return sumMap;
}

// =============================================================================
// Data Access Utilities
// =============================================================================

/**
 * Get percentage value
 */
export function getPercentage(value: number, total: number): number {
  return (value * 100) / total;
}

/**
 * Get data array from graph definition
 */
export function getDataArray(graphdef: GraphDefinition): DataPoint[][] {
  return graphdef.categories.map((category) => graphdef.dataset[category] ?? []);
}

/**
 * Get label array from first category's data points
 */
export function getLabelArray(graphdef: GraphDefinition, idx = 0): string[] {
  const category = graphdef.categories[idx];
  const categoryData = category ? graphdef.dataset[category] : undefined;
  return categoryData ? categoryData.map((d) => d.name) : [];
}

/**
 * Get category array
 */
export function getCategoryArray(graphdef: GraphDefinition): string[] {
  return [...graphdef.categories];
}

/**
 * Get category data values
 */
export function getCategoryData(graphdef: GraphDefinition, categories: string[]): number[][] {
  return categories.map((category) => {
    const categoryData = graphdef.dataset[category];
    return categoryData ? categoryData.map((d) => d.value) : [];
  });
}

// =============================================================================
// String Utilities
// =============================================================================

/**
 * Convert string to PascalCase
 */
export function getPascalCasedName(name: string): string {
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

/**
 * Format a string for use as a CSS class name
 * Replaces special characters with hyphens and converts to lowercase
 */
export function formatClassName(name: string): string {
  return name
    .trim()
    .replace(/[^A-Za-z0-9_-]/g, '-')
    .toLowerCase();
}

// =============================================================================
// Color Utilities
// =============================================================================

/**
 * Get color from configuration palette by index
 */
export function getColorBand(config: ChartConfig, index: number): string {
  const { custompalette, palette } = config.graph;

  if (custompalette && custompalette.length > 0) {
    return custompalette[index % custompalette.length] ?? '#000000';
  }

  const paletteName = palette as PaletteName;
  const paletteColors = palettes[paletteName] ?? palettes.Default;
  return paletteColors[index % paletteColors.length] ?? '#000000';
}

// =============================================================================
// Object Utilities
// =============================================================================

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * Deep merge objects (source into target)
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  const result = deepClone(target);

  for (const source of sources) {
    if (!source) continue;

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        const targetValue = result[key as keyof T];

        if (
          sourceValue !== null &&
          typeof sourceValue === 'object' &&
          !Array.isArray(sourceValue) &&
          targetValue !== null &&
          typeof targetValue === 'object' &&
          !Array.isArray(targetValue)
        ) {
          (result as Record<string, unknown>)[key] = deepMerge(
            targetValue as Record<string, unknown>,
            sourceValue as Record<string, unknown>
          );
        } else {
          (result as Record<string, unknown>)[key] = deepClone(sourceValue);
        }
      }
    }
  }

  return result;
}

// =============================================================================
// Label Formatting
// =============================================================================

/**
 * Get formatted label value for a data point
 */
export function getLabelValue(config: ChartConfig, d: DataPoint): string {
  if (config.label.formatter !== undefined) {
    return config.label.formatter(d.value);
  }

  const val = d.value % 1 === 0 ? d.value : d.value.toFixed(config.label.precision);
  return `${config.label.prefix}${val}${config.label.suffix}`;
}

/**
 * Get tooltip text for a data point
 */
export function getTooltipText(
  config: ChartConfig,
  category: string,
  label: string,
  d: DataPoint
): string {
  if (!config.tooltip.show) {
    return '';
  }

  const format = config.tooltip.format;
  if (format === '') {
    return `${category} [${label}] : ${getLabelValue(config, d)}`;
  }

  return format
    .replace(/%c/gi, category)
    .replace(/%l/gi, label)
    .replace(/%v/gi, getLabelValue(config, d));
}

// =============================================================================
// Browser Utilities
// =============================================================================

/**
 * Check if canvas is supported
 */
export function isCanvasSupported(): boolean {
  const elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}
