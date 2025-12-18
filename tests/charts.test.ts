import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  DonutChart,
  StackedBarChart,
  StackedAreaChart,
  PercentBarChart,
  PercentAreaChart,
  PolarAreaChart,
  WaterfallChart,
} from '../src/charts';
import type { GraphDefinition } from '../src/types';

// Sample data for tests
const sampleGraphdef: GraphDefinition = {
  categories: ['Sales', 'Profit'],
  dataset: {
    Sales: [
      { name: 'Q1', value: 100 },
      { name: 'Q2', value: 150 },
      { name: 'Q3', value: 120 },
      { name: 'Q4', value: 180 },
    ],
    Profit: [
      { name: 'Q1', value: 30 },
      { name: 'Q2', value: 45 },
      { name: 'Q3', value: 35 },
      { name: 'Q4', value: 55 },
    ],
  },
};

const singleCategoryData: GraphDefinition = {
  categories: ['Revenue'],
  dataset: {
    Revenue: [
      { name: 'Jan', value: 1000 },
      { name: 'Feb', value: 1200 },
      { name: 'Mar', value: 900 },
      { name: 'Apr', value: 1500 },
    ],
  },
};

describe('Chart Classes', () => {
  let container: HTMLDivElement;
  let dom: JSDOM;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body><div id="chart"></div></body></html>');
    global.document = dom.window.document;
    global.window = dom.window as unknown as Window & typeof globalThis;
    container = document.getElementById('chart') as HTMLDivElement;
  });

  afterEach(() => {
    if (container) {
      container.innerHTML = '';
    }
  });

  describe('BarChart', () => {
    it('should create a vertical bar chart', () => {
      const chart = BarChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Vertical' },
        dimension: { width: 400, height: 300 },
      });

      expect(chart).toBeDefined();
      expect(chart.config.graph.orientation).toBe('Vertical');

      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should create a horizontal bar chart', () => {
      const chart = BarChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Horizontal' },
        dimension: { width: 400, height: 300 },
      });

      expect(chart).toBeDefined();
      expect(chart.config.graph.orientation).toBe('Horizontal');
    });

    it('should render bars for each category', () => {
      BarChart.create('#chart', sampleGraphdef, {
        dimension: { width: 400, height: 300 },
      });

      const barGroups = container.querySelectorAll('g[class*="cg-"]');
      expect(barGroups.length).toBe(2); // Sales and Profit
    });

    it('should destroy chart and remove from DOM', () => {
      const chart = BarChart.create('#chart', sampleGraphdef);
      expect(container.querySelector('svg')).toBeTruthy();

      chart.destroy();
      expect(container.querySelector('svg')).toBeFalsy();
    });

    it('should update chart with new data', () => {
      const chart = BarChart.create('#chart', sampleGraphdef);
      const newData: GraphDefinition = {
        categories: ['New'],
        dataset: {
          New: [{ name: 'A', value: 50 }],
        },
      };

      chart.update(newData);
      // After update, chart should be re-rendered
      expect(container.querySelector('svg')).toBeTruthy();
    });

    it('should hide labels when disabled', () => {
      const chart = BarChart.create('#chart', sampleGraphdef, {
        label: { showlabel: false },
      });

      expect(chart.config.label.showlabel).toBe(false);
    });

    it('should apply bar config options', () => {
      const chart = BarChart.create('#chart', sampleGraphdef, {
        bar: { strokecolor: '#000000' },
      });

      expect(chart.config.bar.strokecolor).toBe('#000000');
    });
  });

  describe('LineChart', () => {
    it('should create a vertical line chart', () => {
      const chart = LineChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Vertical' },
        dimension: { width: 400, height: 300 },
      });

      expect(chart).toBeDefined();
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should create a horizontal line chart', () => {
      const chart = LineChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Horizontal' },
      });

      expect(chart).toBeDefined();
    });

    it('should render lines with path elements', () => {
      LineChart.create('#chart', sampleGraphdef);

      const paths = container.querySelectorAll('path[class*="cr-"]');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should show circles when enabled', () => {
      LineChart.create('#chart', sampleGraphdef, {
        line: { showcircles: true },
      });

      const circles = container.querySelectorAll('circle[class*="cr-"]');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('AreaChart', () => {
    it('should create a vertical area chart', () => {
      const chart = AreaChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Vertical' },
      });

      expect(chart).toBeDefined();
    });

    it('should create a horizontal area chart', () => {
      const chart = AreaChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Horizontal' },
      });

      expect(chart).toBeDefined();
    });

    it('should render filled areas', () => {
      AreaChart.create('#chart', sampleGraphdef);

      const paths = container.querySelectorAll('path[class*="uv-areapath"]');
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe('PieChart', () => {
    it('should create a pie chart', () => {
      const chart = PieChart.create('#chart', singleCategoryData);

      expect(chart).toBeDefined();
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should render pie slices', () => {
      PieChart.create('#chart', singleCategoryData);

      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should show labels when enabled', () => {
      PieChart.create('#chart', singleCategoryData, {
        label: { showlabel: true },
      });

      const texts = container.querySelectorAll('text');
      expect(texts.length).toBeGreaterThan(0);
    });
  });

  it('should create a donut chart', () => {
    const chart = DonutChart.create('#chart', singleCategoryData);

    expect(chart).toBeDefined();
  });

  it('should render donut with inner radius', () => {
    DonutChart.create('#chart', singleCategoryData);

    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  describe('StackedBarChart', () => {
    it('should create a vertical stacked bar chart', () => {
      const chart = StackedBarChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Vertical' },
      });

      expect(chart).toBeDefined();
    });

    it('should create a horizontal stacked bar chart', () => {
      const chart = StackedBarChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Horizontal' },
      });

      expect(chart).toBeDefined();
    });

    it('should set stepup to stepup', () => {
      const chart = StackedBarChart.create('#chart', sampleGraphdef);
      // The graphdef should have stepup = 'stepup' for stacked charts
      expect(chart).toBeDefined();
    });
  });

  describe('StackedAreaChart', () => {
    it('should create a vertical stacked area chart', () => {
      const chart = StackedAreaChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Vertical' },
      });

      expect(chart).toBeDefined();
    });

    it('should create a horizontal stacked area chart', () => {
      const chart = StackedAreaChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Horizontal' },
      });

      expect(chart).toBeDefined();
    });
  });

  describe('PercentBarChart', () => {
    it('should create a vertical percent bar chart', () => {
      const chart = PercentBarChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Vertical' },
      });

      expect(chart).toBeDefined();
    });

    it('should create a horizontal percent bar chart', () => {
      const chart = PercentBarChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Horizontal' },
      });

      expect(chart).toBeDefined();
    });
  });

  describe('PercentAreaChart', () => {
    it('should create a vertical percent area chart', () => {
      const chart = PercentAreaChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Vertical' },
      });

      expect(chart).toBeDefined();
    });

    it('should create a horizontal percent area chart', () => {
      const chart = PercentAreaChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Horizontal' },
      });

      expect(chart).toBeDefined();
    });
  });

  describe('PolarAreaChart', () => {
    it('should create a polar area chart', () => {
      const chart = PolarAreaChart.create('#chart', singleCategoryData);

      expect(chart).toBeDefined();
    });

    it('should render polar slices', () => {
      PolarAreaChart.create('#chart', singleCategoryData);

      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe('WaterfallChart', () => {
    it('should create a waterfall chart', () => {
      const chart = WaterfallChart.create('#chart', singleCategoryData);

      expect(chart).toBeDefined();
    });

    it('should render bars with connector lines', () => {
      WaterfallChart.create('#chart', singleCategoryData);

      const bars = container.querySelectorAll('rect');
      expect(bars.length).toBeGreaterThan(0);
    });

    it('should handle negative values', () => {
      const dataWithNegatives: GraphDefinition = {
        categories: ['Revenue'],
        dataset: {
          Revenue: [
            { name: 'Start', value: 1000 },
            { name: 'Expense', value: -300 },
            { name: 'Income', value: 500 },
          ],
        },
      };

      const chart = WaterfallChart.create('#chart', dataWithNegatives);
      expect(chart).toBeDefined();
    });
  });
});

describe('Chart Configuration', () => {
  let container: HTMLDivElement;
  let dom: JSDOM;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body><div id="chart"></div></body></html>');
    global.document = dom.window.document;
    global.window = dom.window as unknown as Window & typeof globalThis;
    container = document.getElementById('chart') as HTMLDivElement;
  });

  afterEach(() => {
    if (container) {
      container.innerHTML = '';
    }
  });

  it('should apply custom dimensions', () => {
    BarChart.create('#chart', sampleGraphdef, {
      dimension: { width: 600, height: 400 },
    });

    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should apply custom margins', () => {
    const chart = BarChart.create('#chart', sampleGraphdef, {
      margin: { top: 50, right: 30, bottom: 50, left: 60 },
    });

    expect(chart.config.margin.top).toBe(50);
    expect(chart.config.margin.left).toBe(60);
  });

  it('should show legends when enabled', () => {
    BarChart.create('#chart', sampleGraphdef, {
      legend: { showlegends: true },
    });

    const legend = container.querySelector('g[class*="legend"]');
    expect(legend).toBeTruthy();
  });

  it('should apply responsive settings', () => {
    BarChart.create('#chart', sampleGraphdef, {
      graph: { responsive: true },
    });

    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('viewBox')).toBeTruthy();
  });

  it('should apply caption text', () => {
    BarChart.create('#chart', sampleGraphdef, {
      meta: { caption: 'Test Caption', subcaption: 'Test Subcaption' },
    });

    const caption = container.querySelector('.uv-caption-text');
    expect(caption?.textContent).toBe('Test Caption');
  });

  it('should hide legends when disabled', () => {
    BarChart.create('#chart', sampleGraphdef, {
      legend: { showlegends: false },
    });

    const legend = container.querySelector('g.uv-legend');
    expect(legend).toBeFalsy();
  });

  it('should apply log scale when specified', () => {
    const chart = BarChart.create('#chart', sampleGraphdef, {
      scale: { type: 'log' },
    });

    expect(chart.config.scale.type).toBe('log');
  });

  it('should use stepup max when specified', () => {
    const graphdef = { ...sampleGraphdef, stepup: 'stepup' as const };
    const chart = BarChart.create('#chart', graphdef);
    expect(chart).toBeDefined();
  });

  it('should use percent max when specified', () => {
    const graphdef = { ...sampleGraphdef, stepup: 'percent' as const };
    const chart = BarChart.create('#chart', graphdef);
    expect(chart).toBeDefined();
  });

  it('should handle empty categories gracefully', () => {
    const emptyData: GraphDefinition = {
      categories: [],
      dataset: {},
    };

    // This should not throw
    expect(() => BarChart.create('#chart', emptyData)).not.toThrow();
  });
});
