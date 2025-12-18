import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { Graph } from '../src/charts/Graph';
import type { GraphDefinition, PartialChartConfig } from '../src/types';

// Concrete implementation of abstract Graph class for testing
class TestChart extends Graph {
  protected render(): void {
    this.init();
    this.finalize();
  }

  static create(
    container: string,
    graphdef: GraphDefinition,
    config: PartialChartConfig = {}
  ): TestChart {
    const mergedConfig: PartialChartConfig = {
      ...config,
      meta: { ...config.meta, position: container },
    };
    const chart = new TestChart(graphdef, mergedConfig);
    chart.render();
    return chart;
  }

  // Expose protected methods for testing
  public getWidth(): number {
    return this.width();
  }
  public getHeight(): number {
    return this.height();
  }
  public getTop(): number {
    return this.top();
  }
  public getBottom(): number {
    return this.bottom();
  }
  public getLeft(): number {
    return this.left();
  }
  public getRight(): number {
    return this.right();
  }
  public getMaxValue(): number {
    return super.getMaxValue();
  }
  public getMinValue(): number {
    return super.getMinValue();
  }
  public getLabels(): string[] {
    return this.labels;
  }
  public getCategories(): string[] {
    return this.categories;
  }
}

describe('Graph Base Class', () => {
  let container: HTMLDivElement;
  let dom: JSDOM;

  const sampleGraphdef: GraphDefinition = {
    categories: ['Sales', 'Profit'],
    dataset: {
      Sales: [
        { name: 'Q1', value: 100 },
        { name: 'Q2', value: 150 },
        { name: 'Q3', value: 120 },
      ],
      Profit: [
        { name: 'Q1', value: 30 },
        { name: 'Q2', value: 45 },
        { name: 'Q3', value: 35 },
      ],
    },
  };

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

  describe('Constructor', () => {
    it('should create a graph with unique ID', () => {
      const chart = TestChart.create('#chart', sampleGraphdef);
      expect(chart.id).toBeDefined();
      expect(chart.id.length).toBeGreaterThan(0);
    });

    it('should merge config with defaults', () => {
      const chart = TestChart.create('#chart', sampleGraphdef, {
        dimension: { width: 500, height: 400 },
      });

      expect(chart.config.dimension.width).toBe(500);
      expect(chart.config.dimension.height).toBe(400);
      // Default values should still be present
      expect(chart.config.margin).toBeDefined();
    });
  });

  describe('Dimensions', () => {
    it('should return correct dimensions', () => {
      const chart = TestChart.create('#chart', sampleGraphdef, {
        dimension: { width: 600, height: 400 },
        margin: { top: 50, right: 30, bottom: 50, left: 60 },
      });

      expect(chart.getWidth()).toBe(600);
      expect(chart.getHeight()).toBe(400);
      expect(chart.getTop()).toBe(50);
      expect(chart.getBottom()).toBe(50);
      expect(chart.getLeft()).toBe(60);
      expect(chart.getRight()).toBe(30);
    });
  });

  describe('Max/Min Values', () => {
    it('should calculate max value correctly', () => {
      const chart = TestChart.create('#chart', sampleGraphdef);
      expect(chart.getMaxValue()).toBe(150); // Max of all values
    });

    it('should calculate min value as 0 for positive data', () => {
      const chart = TestChart.create('#chart', sampleGraphdef);
      expect(chart.getMinValue()).toBe(0);
    });

    it('should calculate min value for negative data', () => {
      const negativeData: GraphDefinition = {
        categories: ['Data'],
        dataset: {
          Data: [
            { name: 'A', value: -50 },
            { name: 'B', value: 100 },
          ],
        },
      };
      const chart = TestChart.create('#chart', negativeData);
      expect(chart.getMinValue()).toBe(-50);
    });
  });

  describe('Metadata Extraction', () => {
    it('should extract labels from data', () => {
      const chart = TestChart.create('#chart', sampleGraphdef);
      expect(chart.getLabels()).toEqual(['Q1', 'Q2', 'Q3']);
    });

    it('should extract categories from data', () => {
      const chart = TestChart.create('#chart', sampleGraphdef);
      expect(chart.getCategories()).toEqual(['Sales', 'Profit']);
    });
  });

  describe('SVG Structure', () => {
    it('should create SVG frame', () => {
      TestChart.create('#chart', sampleGraphdef);
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should create panel group', () => {
      TestChart.create('#chart', sampleGraphdef);
      const panel = container.querySelector('g.uv-panel');
      expect(panel).toBeTruthy();
    });

    it('should create chart group', () => {
      TestChart.create('#chart', sampleGraphdef);
      const chart = container.querySelector('g.uv-chart');
      expect(chart).toBeTruthy();
    });

    it('should create background rectangle', () => {
      TestChart.create('#chart', sampleGraphdef);
      const bg = container.querySelector('rect.uv-chart-bg');
      expect(bg).toBeTruthy();
    });

    it('should create axes groups', () => {
      TestChart.create('#chart', sampleGraphdef);
      const horAxis = container.querySelector('g.uv-hor-axis');
      const verAxis = container.querySelector('g.uv-ver-axis');
      expect(horAxis).toBeTruthy();
      expect(verAxis).toBeTruthy();
    });
  });

  describe('Caption', () => {
    it('should render caption text', () => {
      TestChart.create('#chart', sampleGraphdef, {
        meta: { caption: 'Test Caption' },
      });
      const caption = container.querySelector('.uv-caption-text');
      expect(caption?.textContent).toBe('Test Caption');
    });

    it('should render subcaption text', () => {
      TestChart.create('#chart', sampleGraphdef, {
        meta: { subcaption: 'Test Subcaption' },
      });
      const subcaption = container.querySelector('.uv-subcaption-text');
      expect(subcaption?.textContent).toBe('Test Subcaption');
    });
  });

  describe('Legend', () => {
    it('should show legend when enabled', () => {
      TestChart.create('#chart', sampleGraphdef, {
        legend: { showlegends: true },
      });
      const legend = container.querySelector('g.uv-legend');
      expect(legend).toBeTruthy();
    });

    it('should not show legend when disabled', () => {
      TestChart.create('#chart', sampleGraphdef, {
        legend: { showlegends: false },
      });
      const legend = container.querySelector('g.uv-legend');
      expect(legend).toBeFalsy();
    });
  });

  describe('Responsive Mode', () => {
    it('should set viewBox when responsive', () => {
      TestChart.create('#chart', sampleGraphdef, {
        graph: { responsive: true },
      });
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('viewBox')).toBeTruthy();
    });

    it('should set fixed dimensions when not responsive', () => {
      TestChart.create('#chart', sampleGraphdef, {
        graph: { responsive: false },
        dimension: { width: 500, height: 300 },
        margin: { top: 50, right: 30, bottom: 50, left: 60 },
      });
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe('590'); // 500 + 60 + 30
      expect(svg?.getAttribute('height')).toBe('400'); // 300 + 50 + 50
    });
  });

  describe('Destroy', () => {
    it('should remove chart from DOM', () => {
      const chart = TestChart.create('#chart', sampleGraphdef);
      expect(container.querySelector('svg')).toBeTruthy();

      chart.destroy();
      expect(container.querySelector('svg')).toBeFalsy();
    });
  });

  describe('Toggle Category', () => {
    it('should call toggle without error', () => {
      const chart = TestChart.create('#chart', sampleGraphdef);
      // toggleCategory should work without throwing even if no elements match
      expect(() => chart.toggleCategory(0)).not.toThrow();
    });
  });

  describe('Orientation', () => {
    it('should handle vertical orientation', () => {
      const chart = TestChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Vertical' },
      });
      expect(chart.config.graph.orientation).toBe('Vertical');
    });

    it('should handle horizontal orientation', () => {
      const chart = TestChart.create('#chart', sampleGraphdef, {
        graph: { orientation: 'Horizontal' },
      });
      expect(chart.config.graph.orientation).toBe('Horizontal');
    });
  });

  describe('Scale Types', () => {
    it('should use linear scale by default', () => {
      const chart = TestChart.create('#chart', sampleGraphdef);
      expect(chart.config.scale.type).toBe('linear');
    });

    it('should support log scale', () => {
      const chart = TestChart.create('#chart', sampleGraphdef, {
        scale: { type: 'log' },
      });
      expect(chart.config.scale.type).toBe('log');
    });
  });
});
