/**
 * Unit tests for uvCharts utility functions
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  getMax,
  getMaxValue,
  getStepMaxValue,
  getStepMinValue,
  getMin,
  getMinValue,
  getLabelArray,
  getCategoryArray,
  getCategoryData,
  getDataArray,
  getSumUpArray,
  formatClassName,
  getPascalCasedName,
  getPercentage,
  deepClone,
  deepMerge,
  getColorBand,
  getLabelValue,
  getTooltipText,
  isCanvasSupported,
} from '../src/utils';
import type { GraphDefinition, ChartConfig } from '../src/types';
import { defaultConfig } from '../src/config/defaults';

// Test data matching original test suite
const graphdef: GraphDefinition = {
  categories: ['Firefox', 'IE', 'Chrome', 'Opera', 'Safari'],
  dataset: {
    Firefox: [
      { name: '2001', value: 50 },
      { name: '2002', value: 150 },
      { name: '2003', value: 20 },
      { name: '2004', value: 80 },
      { name: '2005', value: 40 },
    ],
    IE: [
      { name: '2001', value: 60 },
      { name: '2002', value: 70 },
      { name: '2003', value: 80 },
      { name: '2004', value: 90 },
      { name: '2005', value: 20 },
    ],
    Chrome: [
      { name: '2001', value: 10 },
      { name: '2002', value: 30 },
      { name: '2003', value: 50 },
      { name: '2004', value: 90 },
      { name: '2005', value: 70 },
    ],
    Opera: [
      { name: '2001', value: 90 },
      { name: '2002', value: 60 },
      { name: '2003', value: 30 },
      { name: '2004', value: 10 },
      { name: '2005', value: 70 },
    ],
    Safari: [
      { name: '2001', value: 30 },
      { name: '2002', value: 10 },
      { name: '2003', value: 60 },
      { name: '2004', value: 90 },
      { name: '2005', value: 40 },
    ],
  },
};

describe('Data Calculation Utilities', () => {
  describe('getMaxValue', () => {
    it('should return correct max value for a dataset', () => {
      expect(getMaxValue(graphdef)).toBe(150);
    });

    it('should return 0 for empty dataset', () => {
      const empty: GraphDefinition = { categories: [], dataset: {} };
      expect(getMaxValue(empty)).toBe(0);
    });
  });

  describe('getStepMaxValue', () => {
    it('should return correct step up max value for a dataset', () => {
      expect(getStepMaxValue(graphdef)).toBe(360);
    });

    it('should return 0 for empty dataset', () => {
      const empty: GraphDefinition = { categories: [], dataset: {} };
      expect(getStepMaxValue(empty)).toBe(0);
    });
  });

  describe('getStepMinValue', () => {
    it('should return correct step min value', () => {
      expect(getStepMinValue(graphdef)).toBe(0);
    });

    it('should return negative min when data has negatives', () => {
      const negData: GraphDefinition = {
        categories: ['A', 'B'],
        dataset: {
          A: [
            { name: '1', value: -50 },
            { name: '2', value: 20 },
          ],
          B: [
            { name: '1', value: -30 },
            { name: '2', value: -10 },
          ],
        },
      };
      expect(getStepMinValue(negData)).toBeLessThan(0);
    });
  });

  describe('getMax', () => {
    it('should return correct max for normal classification', () => {
      expect(getMax(graphdef, 'normal')).toBe(150);
    });

    it('should return correct max for stepup classification', () => {
      expect(getMax(graphdef, 'stepup')).toBe(360);
    });

    it('should return 100 for percent classification', () => {
      expect(getMax(graphdef, 'percent')).toBe(100);
    });

    it('should return stepup max for waterfall classification', () => {
      expect(getMax(graphdef, 'waterfall')).toBe(340);
    });
  });

  describe('getMinValue', () => {
    it('should return 0 when all values are positive', () => {
      expect(getMinValue(graphdef)).toBe(0);
    });

    it('should return negative value when dataset has negatives', () => {
      const withNegative: GraphDefinition = {
        categories: ['A'],
        dataset: {
          A: [
            { name: '1', value: -50 },
            { name: '2', value: 100 },
          ],
        },
      };
      expect(getMinValue(withNegative)).toBe(-50);
    });
  });

  describe('getMin', () => {
    it('should return correct min for normal classification', () => {
      expect(getMin(graphdef, 'normal')).toBe(0);
    });

    it('should return 0 for percent classification', () => {
      expect(getMin(graphdef, 'percent')).toBe(0);
    });

    it('should return 0 for stepup classification', () => {
      expect(getMin(graphdef, 'stepup')).toBe(0);
    });
  });

  describe('getSumUpArray', () => {
    it('should return sum of values across categories', () => {
      const result = getSumUpArray(graphdef);
      expect(result[0]).toBe(50 + 60 + 10 + 90 + 30); // 240
      expect(result.length).toBe(5);
    });

    it('should handle empty dataset', () => {
      const empty: GraphDefinition = { categories: [], dataset: {} };
      expect(getSumUpArray(empty)).toEqual([]);
    });
  });
});

describe('Data Access Utilities', () => {
  describe('getLabelArray', () => {
    it('should return correct labels from first category', () => {
      expect(getLabelArray(graphdef)).toEqual(['2001', '2002', '2003', '2004', '2005']);
    });

    it('should return empty array for empty dataset', () => {
      const empty: GraphDefinition = { categories: [], dataset: {} };
      expect(getLabelArray(empty)).toEqual([]);
    });
  });

  describe('getCategoryArray', () => {
    it('should return correct categories', () => {
      expect(getCategoryArray(graphdef)).toEqual(['Firefox', 'IE', 'Chrome', 'Opera', 'Safari']);
    });
  });

  describe('getCategoryData', () => {
    it('should return correct data array for subset of categories', () => {
      const categories = ['Firefox', 'Chrome', 'Opera'];
      const expected = [
        [50, 150, 20, 80, 40],
        [10, 30, 50, 90, 70],
        [90, 60, 30, 10, 70],
      ];
      expect(getCategoryData(graphdef, categories)).toEqual(expected);
    });

    it('should return correct data for single category', () => {
      expect(getCategoryData(graphdef, ['IE'])).toEqual([[60, 70, 80, 90, 20]]);
    });

    it('should handle missing category gracefully', () => {
      expect(getCategoryData(graphdef, ['NonExistent'])).toEqual([[]]);
    });
  });

  describe('getDataArray', () => {
    it('should return all category data arrays', () => {
      const result = getDataArray(graphdef);
      expect(result.length).toBe(5);
      expect(result[0]).toEqual(graphdef.dataset['Firefox']);
    });
  });

  describe('getPercentage', () => {
    it('should calculate percentage correctly', () => {
      expect(getPercentage(25, 100)).toBe(25);
      expect(getPercentage(50, 200)).toBe(25);
    });
  });
});

describe('String Utilities', () => {
  describe('getPascalCasedName', () => {
    it('should capitalize first letter', () => {
      expect(getPascalCasedName('graphUtil')).toBe('GraphUtil');
      expect(getPascalCasedName('bar')).toBe('Bar');
    });

    it('should handle empty string', () => {
      expect(getPascalCasedName('')).toBe('');
    });
  });

  describe('formatClassName', () => {
    it('should replace special characters with hyphens', () => {
      expect(formatClassName('Hello World')).toBe('hello-world');
      expect(formatClassName('foo@bar')).toBe('foo-bar');
    });

    it('should convert to lowercase', () => {
      expect(formatClassName('UPPERCASE')).toBe('uppercase');
    });

    it('should preserve underscores and hyphens', () => {
      expect(formatClassName('foo_bar-baz')).toBe('foo_bar-baz');
    });

    it('should handle numbers', () => {
      expect(formatClassName('test123')).toBe('test123');
    });
  });
});

describe('Object Utilities', () => {
  describe('deepClone', () => {
    it('should clone primitive values', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(null)).toBe(null);
    });

    it('should clone arrays', () => {
      const arr = [1, 2, 3];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
    });

    it('should clone nested objects', () => {
      const obj = { a: { b: { c: 1 } } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned.a).not.toBe(obj.a);
      expect(cloned.a.b).not.toBe(obj.a.b);
    });

    it('should clone undefined values', () => {
      expect(deepClone(undefined)).toBe(undefined);
    });

    it('should clone boolean values', () => {
      expect(deepClone(true)).toBe(true);
      expect(deepClone(false)).toBe(false);
    });
  });

  describe('deepMerge', () => {
    it('should merge simple objects', () => {
      const target = { a: 1, b: 2 };
      const source = { b: 3, c: 4 };
      const result = deepMerge(target, source);
      expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it('should not mutate original objects', () => {
      const target = { a: 1 };
      const source = { b: 2 };
      deepMerge(target, source);
      expect(target).toEqual({ a: 1 });
    });

    it('should merge nested objects', () => {
      const target = { a: { x: 1, y: 2 } };
      const source = { a: { y: 3, z: 4 } };
      const result = deepMerge(target, source);
      expect(result).toEqual({ a: { x: 1, y: 3, z: 4 } });
    });

    it('should handle multiple sources', () => {
      const target = { a: 1 };
      const source1 = { b: 2 };
      const source2 = { c: 3 };
      const result = deepMerge(target, source1, source2);
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should handle null values in source', () => {
      const target = { a: 1, b: { x: 1 } };
      const source = { b: null };
      const result = deepMerge(target, source);
      expect(result.b).toBe(null);
    });

    it('should handle arrays in merge', () => {
      const target = { arr: [1, 2] };
      const source = { arr: [3, 4] };
      const result = deepMerge(target, source);
      expect(result.arr).toEqual([3, 4]);
    });
  });
});

describe('Config Utilities', () => {
  describe('getColorBand', () => {
    it('should return color from palette at index', () => {
      const color = getColorBand(defaultConfig, 0);
      expect(typeof color).toBe('string');
      expect(color.startsWith('#')).toBe(true);
    });

    it('should return different colors for different indices', () => {
      const color0 = getColorBand(defaultConfig, 0);
      const color1 = getColorBand(defaultConfig, 1);
      expect(color0).not.toBe(color1);
    });
  });

  describe('getLabelValue', () => {
    it('should format value with prefix and suffix', () => {
      const config = {
        ...defaultConfig,
        label: { ...defaultConfig.label, prefix: '$', suffix: 'k' },
      };
      const result = getLabelValue(config, { name: 'test', value: 100 });
      expect(result).toContain('$');
      expect(result).toContain('k');
    });

    it('should handle precision', () => {
      const config = { ...defaultConfig, label: { ...defaultConfig.label, precision: 2 } };
      const result = getLabelValue(config, { name: 'test', value: 100.567 });
      expect(result).toContain('100.57');
    });
  });

  describe('getTooltipText', () => {
    it('should return empty string when tooltip is disabled', () => {
      const config = { ...defaultConfig, tooltip: { ...defaultConfig.tooltip, show: false } };
      const result = getTooltipText(config, 'Cat', 'Label', { name: 'Label', value: 100 });
      expect(result).toBe('');
    });

    it('should format with default template', () => {
      const config = {
        ...defaultConfig,
        tooltip: { ...defaultConfig.tooltip, show: true, format: '' },
      };
      const result = getTooltipText(config, 'Cat', 'Label', { name: 'Label', value: 100 });
      expect(result).toContain('Cat');
      expect(result).toContain('Label');
    });

    it('should use custom format', () => {
      const config = {
        ...defaultConfig,
        tooltip: { ...defaultConfig.tooltip, show: true, format: '%c: %v' },
      };
      const result = getTooltipText(config, 'Cat', 'Label', { name: 'Label', value: 100 });
      expect(result).toContain('Cat');
      expect(result).toContain('100');
    });
  });
});
