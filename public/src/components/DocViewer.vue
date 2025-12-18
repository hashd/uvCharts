<script setup lang="ts">
import { ref } from 'vue'

const currentSection = ref('installation')

const sections = [
  { id: 'installation', label: 'Installation', category: 'Getting Started' },
  { id: 'quick-start', label: 'Quick Start', category: 'Getting Started' },
  { id: 'data-format', label: 'Data Format', category: 'Getting Started' },
  { id: 'configuration', label: 'Configuration', category: 'Getting Started' },
  { id: 'bar-chart', label: 'Bar Chart', category: 'Charts' },
  { id: 'line-chart', label: 'Line Chart', category: 'Charts' },
  { id: 'area-chart', label: 'Area Chart', category: 'Charts' },
  { id: 'pie-chart', label: 'Pie Chart', category: 'Charts' },
  { id: 'donut-chart', label: 'Donut Chart', category: 'Charts' },
  { id: 'waterfall-chart', label: 'Waterfall Chart', category: 'Charts' },
  { id: 'stacked-charts', label: 'Stacked Charts', category: 'Charts' },
  { id: 'api', label: 'API Reference', category: 'Reference' },
  { id: 'styling', label: 'Styling & Theming', category: 'Reference' },
  { id: 'responsive', label: 'Responsive Charts', category: 'Reference' }
]

const getSectionsByCategory = (category: string) => {
  return sections.filter(s => s.category === category)
}
</script>

<template>
  <section class="docs">
    <div class="container">
      <aside class="sidebar">
        <nav>
          <h4>Getting Started</h4>
          <ul>
            <li v-for="item in getSectionsByCategory('Getting Started')" :key="item.id">
              <a href="#" @click.prevent="currentSection = item.id" :class="{ active: currentSection === item.id }">
                {{ item.label }}
              </a>
            </li>
          </ul>

          <h4>Charts</h4>
          <ul>
            <li v-for="item in getSectionsByCategory('Charts')" :key="item.id">
              <a href="#" @click.prevent="currentSection = item.id" :class="{ active: currentSection === item.id }">
                {{ item.label }}
              </a>
            </li>
          </ul>

          <h4>Reference</h4>
          <ul>
            <li v-for="item in getSectionsByCategory('Reference')" :key="item.id">
              <a href="#" @click.prevent="currentSection = item.id" :class="{ active: currentSection === item.id }">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div class="content">
        <!-- INSTALLATION -->
        <template v-if="currentSection === 'installation'">
          <h1>Installation</h1>
          <p>Get started with uvCharts by installing the package via npm or yarn.</p>

          <h3>npm</h3>
          <div class="code-block"><code>npm install uvcharts</code></div>

          <h3>yarn</h3>
          <div class="code-block"><code>yarn add uvcharts</code></div>

          <h3>CDN</h3>
          <p>You can also include uvCharts directly via a CDN:</p>
          <div class="code-block"><code>&lt;script src="https://unpkg.com/uvcharts"&gt;&lt;/script&gt;</code></div>

          <h2>Dependencies</h2>
          <p>uvCharts is built on top of D3.js v7. If you're using the npm package, D3 is bundled. For CDN usage, D3 is included automatically.</p>
        </template>

        <!-- QUICK START -->
        <template v-if="currentSection === 'quick-start'">
          <h1>Quick Start</h1>
          <p>Create your first chart in just a few lines of code.</p>

          <h3>1. Create a container</h3>
          <div class="code-block"><code>&lt;div id="my-chart"&gt;&lt;/div&gt;</code></div>

          <h3>2. Import and create the chart</h3>
          <div class="code-block"><pre>import { BarChart } from 'uvcharts';

const data = {
  categories: ['Sales'],
  dataset: {
    'Sales': [
      { name: 'Q1', value: 120 },
      { name: 'Q2', value: 200 },
      { name: 'Q3', value: 150 },
      { name: 'Q4', value: 280 }
    ]
  }
};

BarChart.create('#my-chart', data);</pre></div>

          <p>That's it! The chart will render with sensible defaults. You can customize everything through the configuration object.</p>
        </template>

        <!-- DATA FORMAT -->
        <template v-if="currentSection === 'data-format'">
          <h1>Data Format</h1>
          <p>All charts in uvCharts use a consistent data structure called <code>GraphDefinition</code>.</p>

          <h2>GraphDefinition</h2>
          <div class="code-block"><pre>interface GraphDefinition {
  categories: string[];      // Series names
  dataset: Record&lt;string, DataPoint[]&gt;;
  stepup?: 'normal' | 'stepup' | 'percent' | 'waterfall';
}

interface DataPoint {
  name: string;   // Label for this point
  value: number;  // Numeric value
}</pre></div>

          <h2>Single Series Example</h2>
          <div class="code-block"><pre>const data = {
  categories: ['Revenue'],
  dataset: {
    'Revenue': [
      { name: 'Jan', value: 100 },
      { name: 'Feb', value: 150 },
      { name: 'Mar', value: 120 }
    ]
  }
};</pre></div>

          <h2>Multiple Series Example</h2>
          <div class="code-block"><pre>const data = {
  categories: ['Revenue', 'Expenses'],
  dataset: {
    'Revenue': [
      { name: 'Q1', value: 500 },
      { name: 'Q2', value: 600 }
    ],
    'Expenses': [
      { name: 'Q1', value: 300 },
      { name: 'Q2', value: 350 }
    ]
  }
};</pre></div>
        </template>

        <!-- CONFIGURATION -->
        <template v-if="currentSection === 'configuration'">
          <h1>Configuration</h1>
          <p>Customize your charts by passing configuration options as the third argument to <code>.create()</code>.</p>

          <h2>Basic Example</h2>
          <div class="code-block"><pre>BarChart.create('#chart', data, {
  dimension: { width: 600, height: 400 },
  meta: {
    caption: 'Sales Report',
    subcaption: 'Q1 2024'
  },
  graph: {
    orientation: 'Horizontal'
  }
});</pre></div>

          <h2>Configuration Categories</h2>
          <table class="config-table">
            <tr><th>Category</th><th>Description</th></tr>
            <tr><td><code>dimension</code></td><td>Width and height of the chart</td></tr>
            <tr><td><code>margin</code></td><td>Top, bottom, left, right margins</td></tr>
            <tr><td><code>meta</code></td><td>Caption, subcaption, axis labels</td></tr>
            <tr><td><code>graph</code></td><td>Orientation, colors, opacity</td></tr>
            <tr><td><code>axis</code></td><td>Ticks, labels, styling</td></tr>
            <tr><td><code>legend</code></td><td>Position, visibility, styling</td></tr>
            <tr><td><code>effects</code></td><td>Animations, hover effects</td></tr>
            <tr><td><code>bar</code>/<code>line</code>/<code>area</code></td><td>Chart-specific options</td></tr>
          </table>
        </template>

        <!-- BAR CHART -->
        <template v-if="currentSection === 'bar-chart'">
          <h1>Bar Chart</h1>
          <p>Bar charts are ideal for comparing discrete categories.</p>

          <div class="code-block"><pre>import { BarChart } from 'uvcharts';

BarChart.create('#chart', data, {
  graph: {
    orientation: 'Vertical'  // or 'Horizontal'
  },
  bar: {
    useGradient: true,      // Enable gradient fill
    strokecolor: 'none'     // Bar border color
  }
});</pre></div>

          <h2>Bar Configuration Options</h2>
          <table class="config-table">
            <tr><th>Option</th><th>Type</th><th>Description</th></tr>
            <tr><td><code>useGradient</code></td><td>boolean</td><td>Enable gradient fill for bars</td></tr>
            <tr><td><code>strokecolor</code></td><td>string</td><td>Border color of bars</td></tr>
            <tr><td><code>textcolor</code></td><td>string</td><td>Label text color</td></tr>
          </table>

          <h2>Variants</h2>
          <ul>
            <li><strong>StackedBarChart</strong> - Bars stacked on top of each other</li>
            <li><strong>PercentBarChart</strong> - Stacked bars normalized to 100%</li>
          </ul>
        </template>

        <!-- LINE CHART -->
        <template v-if="currentSection === 'line-chart'">
          <h1>Line Chart</h1>
          <p>Line charts show trends over time or continuous data.</p>

          <div class="code-block"><pre>import { LineChart } from 'uvcharts';

LineChart.create('#chart', data, {
  line: {
    showcircles: true,      // Show data points
    circleradius: 4,        // Point size
    strokewidth: 2,         // Line thickness
    showAreaFill: false     // Fill area under line
  }
});</pre></div>

          <h2>Line Configuration Options</h2>
          <table class="config-table">
            <tr><th>Option</th><th>Type</th><th>Description</th></tr>
            <tr><td><code>showcircles</code></td><td>boolean</td><td>Show circles at data points</td></tr>
            <tr><td><code>circleradius</code></td><td>number</td><td>Radius of data point circles</td></tr>
            <tr><td><code>strokewidth</code></td><td>number</td><td>Line stroke width</td></tr>
            <tr><td><code>showAreaFill</code></td><td>boolean</td><td>Fill area under the line</td></tr>
            <tr><td><code>interpolation</code></td><td>string</td><td>Curve type (e.g., 'curveMonotoneX')</td></tr>
          </table>
        </template>

        <!-- AREA CHART -->
        <template v-if="currentSection === 'area-chart'">
          <h1>Area Chart</h1>
          <p>Area charts emphasize volume or magnitude over time.</p>

          <div class="code-block"><pre>import { AreaChart } from 'uvcharts';

AreaChart.create('#chart', data, {
  area: {
    opacity: 0.7,           // Fill opacity
    showLabels: true        // Show value labels
  }
});</pre></div>

          <h2>Variants</h2>
          <ul>
            <li><strong>StackedAreaChart</strong> - Multiple series stacked</li>
            <li><strong>PercentAreaChart</strong> - Stacked areas normalized to 100%</li>
          </ul>
        </template>

        <!-- PIE CHART -->
        <template v-if="currentSection === 'pie-chart'">
          <h1>Pie Chart</h1>
          <p>Pie charts show proportions of a whole.</p>

          <div class="code-block"><pre>import { PieChart } from 'uvcharts';

// Pie charts use a single category
const data = {
  categories: ['Market Share'],
  dataset: {
    'Market Share': [
      { name: 'Chrome', value: 65 },
      { name: 'Safari', value: 20 },
      { name: 'Firefox', value: 10 },
      { name: 'Other', value: 5 }
    ]
  }
};

PieChart.create('#chart', data);</pre></div>
        </template>

        <!-- DONUT CHART -->
        <template v-if="currentSection === 'donut-chart'">
          <h1>Donut Chart</h1>
          <p>A pie chart with a hollow center, often used to show a summary value.</p>

          <div class="code-block"><pre>import { DonutChart } from 'uvcharts';

DonutChart.create('#chart', data, {
  donut: {
    factor: 0.5    // Inner radius ratio (0-1)
  }
});</pre></div>
        </template>

        <!-- WATERFALL CHART -->
        <template v-if="currentSection === 'waterfall-chart'">
          <h1>Waterfall Chart</h1>
          <p>Waterfall charts show how an initial value is affected by intermediate positive or negative values.</p>

          <div class="code-block"><pre>import { WaterfallChart } from 'uvcharts';

const data = {
  categories: ['Cashflow'],
  dataset: {
    'Cashflow': [
      { name: 'Start', value: 1000 },
      { name: 'Revenue', value: 500 },
      { name: 'Costs', value: -200 },
      { name: 'Tax', value: -100 },
      { name: 'End', value: 1200, resetSum: true }
    ]
  }
};

WaterfallChart.create('#chart', data);</pre></div>

          <p>Use <code>resetSum: true</code> on the final data point to mark it as a total.</p>
        </template>

        <!-- STACKED CHARTS -->
        <template v-if="currentSection === 'stacked-charts'">
          <h1>Stacked Charts</h1>
          <p>Stacked charts layer multiple series to show how parts contribute to a whole.</p>

          <h2>Stacked Bar Chart</h2>
          <div class="code-block"><pre>import { StackedBarChart } from 'uvcharts';
StackedBarChart.create('#chart', multiSeriesData);</pre></div>

          <h2>Stacked Area Chart</h2>
          <div class="code-block"><pre>import { StackedAreaChart } from 'uvcharts';
StackedAreaChart.create('#chart', multiSeriesData);</pre></div>

          <h2>Percent Variants</h2>
          <p>Use <code>PercentBarChart</code> or <code>PercentAreaChart</code> to normalize stacks to 100%.</p>
        </template>

        <!-- API REFERENCE -->
        <template v-if="currentSection === 'api'">
          <h1>API Reference</h1>

          <h2>Static Methods</h2>
          <h3><code>ChartClass.create(selector, data, config?)</code></h3>
          <p>Creates and renders a chart instance.</p>
          <table class="config-table">
            <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
            <tr><td><code>selector</code></td><td>string</td><td>CSS selector for the container</td></tr>
            <tr><td><code>data</code></td><td>GraphDefinition</td><td>Chart data</td></tr>
            <tr><td><code>config</code></td><td>object</td><td>Optional configuration</td></tr>
          </table>

          <h2>Instance Methods</h2>
          <h3><code>.render()</code></h3>
          <p>Renders the chart. Called automatically by <code>.create()</code>.</p>

          <h3><code>.toggleDownload()</code></h3>
          <p>Triggers download of the chart as a PNG image.</p>
        </template>

        <!-- STYLING -->
        <template v-if="currentSection === 'styling'">
          <h1>Styling & Theming</h1>

          <h2>Color Palettes</h2>
          <p>uvCharts includes several built-in color palettes:</p>
          <ul>
            <li><code>Default</code> - Modern vibrant colors</li>
            <li><code>Aurora</code> - Purple/blue gradient-friendly</li>
            <li><code>Sunset</code> - Warm tones</li>
            <li><code>Ocean</code> - Cool blues</li>
            <li><code>Forest</code> - Natural greens</li>
            <li><code>Corporate</code> - Professional blues</li>
          </ul>

          <div class="code-block"><pre>BarChart.create('#chart', data, {
  graph: {
    palette: 'Aurora'
  }
});</pre></div>

          <h2>Custom Colors</h2>
          <div class="code-block"><pre>BarChart.create('#chart', data, {
  graph: {
    palette: 'custom',
    custompalette: ['#ff5c00', '#1a99aa', '#22c55e']
  }
});</pre></div>
        </template>

        <!-- RESPONSIVE -->
        <template v-if="currentSection === 'responsive'">
          <h1>Responsive Charts</h1>
          <p>Enable responsive mode to have charts automatically resize with their container.</p>

          <div class="code-block"><pre>BarChart.create('#chart', data, {
  graph: {
    responsive: true
  }
});</pre></div>

          <p>The chart will maintain its aspect ratio while scaling to fit the container width.</p>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.docs {
  padding-top: 4rem;
  min-height: calc(100vh - 80px);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  gap: 4rem;
  padding: 0 2rem 4rem;
}

.sidebar {
  width: 220px;
  flex-shrink: 0;
  position: sticky;
  top: 120px;
  height: fit-content;
}

h4 {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin: 0 0 0.75rem;
  font-weight: 600;
}

.sidebar ul {
  list-style: none;
  margin-bottom: 1.5rem;
}

.sidebar li {
  margin-bottom: 0.25rem;
}

.sidebar a {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: all 0.2s;
  display: block;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  margin-left: -0.75rem;
}

.sidebar a:hover {
  color: var(--text-primary);
  background: rgba(0,0,0,0.03);
}

.sidebar a.active {
  color: var(--accent-color);
  background: rgba(255, 92, 0, 0.08);
  font-weight: 500;
}

.content {
  flex: 1;
  max-width: 800px;
  min-width: 0;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

h2 {
  font-size: 1.5rem;
  margin: 2.5rem 0 1rem;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  padding-top: 1rem;
  border-top: 1px solid rgba(0,0,0,0.05);
}

h3 {
  font-size: 1.1rem;
  margin: 1.5rem 0 0.75rem;
  color: var(--text-primary);
  font-weight: 600;
}

p {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.content ul {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.content li {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 0.5rem;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  margin: 1rem 0 1.5rem;
  font-family: 'SF Mono', ui-monospace, 'Menlo', monospace;
  font-size: 0.875rem;
  overflow-x: auto;
  line-height: 1.6;
}

pre {
  margin: 0;
}

code {
  font-family: inherit;
}

.config-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0 1.5rem;
  font-size: 0.95rem;
}

.config-table th,
.config-table td {
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.config-table th {
  background: var(--bg-secondary);
  font-weight: 600;
  color: var(--text-primary);
}

.config-table td {
  color: var(--text-secondary);
}

.config-table code {
  background: rgba(0,0,0,0.04);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85rem;
}
</style>
