<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue'
import { BarChart } from '@uvcharts/charts/BarChart'
import { LineChart } from '@uvcharts/charts/LineChart'
import { AreaChart } from '@uvcharts/charts/AreaChart'
import { PieChart } from '@uvcharts/charts/PieChart'
import { DonutChart } from '@uvcharts/charts/DonutChart'
import { StackedBarChart } from '@uvcharts/charts/StackedBarChart'
import { StackedAreaChart } from '@uvcharts/charts/StackedAreaChart'
import { PercentBarChart } from '@uvcharts/charts/PercentBarChart'
import { PercentAreaChart } from '@uvcharts/charts/PercentAreaChart'
import { PolarAreaChart } from '@uvcharts/charts/PolarAreaChart'
import loader from '@monaco-editor/loader'
import type * as Monaco from 'monaco-editor'

const chartTypes = [
  { id: 'bar', label: 'Bar', icon: '◼' },
  { id: 'line', label: 'Line', icon: '◢' },
  { id: 'area', label: 'Area', icon: '▲' },
  { id: 'pie', label: 'Pie', icon: '◐' },
  { id: 'donut', label: 'Donut', icon: '◎' },
  { id: 'stackedbar', label: 'Stacked Bar', icon: '▤' },
  { id: 'stackedarea', label: 'Stacked Area', icon: '▥' },
  { id: 'percentbar', label: 'Percent Bar', icon: '▦' },
  { id: 'percentarea', label: 'Percent Area', icon: '▧' },
  { id: 'polar', label: 'Polar', icon: '✿' }
]

const datasets = {
  multi: {
    categories: ['Sales', 'Profit', 'Revenue'],
    dataset: {
      Sales: [
        { name: 'Q1', value: 120 },
        { name: 'Q2', value: 180 },
        { name: 'Q3', value: 140 },
        { name: 'Q4', value: 200 }
      ],
      Profit: [
        { name: 'Q1', value: 45 },
        { name: 'Q2', value: 68 },
        { name: 'Q3', value: 52 },
        { name: 'Q4', value: 85 }
      ],
      Revenue: [
        { name: 'Q1', value: 90 },
        { name: 'Q2', value: 120 },
        { name: 'Q3', value: 100 },
        { name: 'Q4', value: 150 }
      ]
    }
  },
  single: {
    categories: ['Products'],
    dataset: {
      Products: [
        { name: 'Electronics', value: 450 },
        { name: 'Clothing', value: 320 },
        { name: 'Food', value: 280 },
        { name: 'Books', value: 190 },
        { name: 'Sports', value: 220 }
      ]
    }
  }
}

const templates: Record<string, { data: 'multi' | 'single', code: string }> = {
  bar: { data: 'multi', code: `{
  "dimension": { "width": 700, "height": 480 },
  "graph": { "orientation": "Vertical" },
  "legend": { "showlegends": true },
  "meta": { "caption": "Quarterly Performance" }
}` },
  line: { data: 'multi', code: `{
  "dimension": { "width": 700, "height": 480 },
  "line": { "showcircles": true },
  "legend": { "showlegends": true },
  "meta": { "caption": "Trend Analysis" }
}` },
  area: { data: 'multi', code: `{
  "dimension": { "width": 700, "height": 480 },
  "area": { "opacity": 0.4 },
  "legend": { "showlegends": true },
  "meta": { "caption": "Area Comparison" }
}` },
  pie: { data: 'single', code: `{
  "dimension": { "width": 550, "height": 480 },
  "legend": { "showlegends": true },
  "meta": { "caption": "Distribution" }
}` },
  donut: { data: 'single', code: `{
  "dimension": { "width": 550, "height": 480 },
  "legend": { "showlegends": true },
  "meta": { "caption": "Market Share" }
}` },
  stackedbar: { data: 'multi', code: `{
  "dimension": { "width": 700, "height": 480 },
  "legend": { "showlegends": true },
  "meta": { "caption": "Stacked View" }
}` },
  stackedarea: { data: 'multi', code: `{
  "dimension": { "width": 700, "height": 480 },
  "legend": { "showlegends": true },
  "meta": { "caption": "Cumulative Trends" }
}` },
  percentbar: { data: 'multi', code: `{
  "dimension": { "width": 700, "height": 480 },
  "legend": { "showlegends": true },
  "meta": { "caption": "Proportional View" }
}` },
  percentarea: { data: 'multi', code: `{
  "dimension": { "width": 700, "height": 480 },
  "legend": { "showlegends": true },
  "meta": { "caption": "Proportional Trends" }
}` },
  polar: { data: 'single', code: `{
  "dimension": { "width": 550, "height": 480 },
  "legend": { "showlegends": true },
  "meta": { "caption": "Polar View" }
}` }
}

const chartClasses: Record<string, any> = {
  bar: BarChart,
  line: LineChart,
  area: AreaChart,
  pie: PieChart,
  donut: DonutChart,
  stackedbar: StackedBarChart,
  stackedarea: StackedAreaChart,
  percentbar: PercentBarChart,
  percentarea: PercentAreaChart,
  polar: PolarAreaChart
}

const currentChart = ref('bar')
const activeTab = ref('config')
const configCode = ref('')
const dataCode = ref('')
const error = ref('')

const configEditorRef = ref<HTMLElement | null>(null)
const dataEditorRef = ref<HTMLElement | null>(null)
const configEditor = shallowRef<Monaco.editor.IStandaloneCodeEditor | null>(null)
const dataEditor = shallowRef<Monaco.editor.IStandaloneCodeEditor | null>(null)
let monaco: typeof Monaco | null = null

const loadTemplate = (chartId: string) => {
  currentChart.value = chartId
  const template = templates[chartId]
  configCode.value = template.code
  dataCode.value = JSON.stringify(datasets[template.data], null, 2)

  if (configEditor.value) {
    configEditor.value.setValue(configCode.value)
  }
  if (dataEditor.value) {
    dataEditor.value.setValue(dataCode.value)
  }

  runChart()
}

const runChart = () => {
  error.value = ''
  const output = document.getElementById('playground-output')
  if (!output) return
  output.innerHTML = ''

  try {
    const currentConfig = configEditor.value?.getValue() || configCode.value
    const currentData = dataEditor.value?.getValue() || dataCode.value
    const data = JSON.parse(currentData)
    const config = JSON.parse(currentConfig)
    const ChartClass = chartClasses[currentChart.value]
    ChartClass.create('#playground-output', data, config)
  } catch (e: any) {
    error.value = e.message
  }
}

const initMonaco = async () => {
  monaco = await loader.init()

  // Define custom light theme
  monaco.editor.defineTheme('uvchartsTheme', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#ffffff',
      'editor.foreground': '#1e293b',
      'editorCursor.foreground': '#ff5c00',
      'editor.selectionBackground': 'rgba(255, 92, 0, 0.15)',
      'editor.lineHighlightBackground': '#f8fafc',
    }
  })

  // Configure JSON schema for autocomplete
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas: [{
      uri: 'https://uvcharts.com/config-schema.json',
      fileMatch: ['*'],
      schema: {
        type: 'object',
        properties: {
          dimension: {
            type: 'object',
            description: 'Chart dimensions',
            properties: {
              width: { type: 'number', description: 'Chart width in pixels', default: 600 },
              height: { type: 'number', description: 'Chart height in pixels', default: 400 }
            }
          },
          graph: {
            type: 'object',
            description: 'Graph-level settings',
            properties: {
              orientation: {
                type: 'string',
                enum: ['Vertical', 'Horizontal'],
                description: 'Bar chart orientation'
              },
              palette: {
                type: 'string',
                enum: ['Default', 'Aurora', 'Sunset', 'Ocean', 'Forest', 'Corporate', 'Candy', 'Mono'],
                description: 'Color palette name'
              },
              bgcolor: { type: 'string', description: 'Background color' },
              opacity: { type: 'number', description: 'Element opacity (0-1)' },
              responsive: { type: 'boolean', description: 'Enable responsive sizing' }
            }
          },
          meta: {
            type: 'object',
            description: 'Chart metadata',
            properties: {
              caption: { type: 'string', description: 'Main chart title' },
              subcaption: { type: 'string', description: 'Subtitle text' },
              hlabel: { type: 'string', description: 'Horizontal axis label' },
              vlabel: { type: 'string', description: 'Vertical axis label' }
            }
          },
          legend: {
            type: 'object',
            description: 'Legend settings',
            properties: {
              showlegends: { type: 'boolean', description: 'Show/hide legend' },
              position: { type: 'string', enum: ['bottom', 'right'], description: 'Legend position' }
            }
          },
          bar: {
            type: 'object',
            description: 'Bar chart options',
            properties: {
              useGradient: { type: 'boolean', description: 'Enable gradient fill' },
              strokecolor: { type: 'string', description: 'Bar border color' }
            }
          },
          line: {
            type: 'object',
            description: 'Line chart options',
            properties: {
              showcircles: { type: 'boolean', description: 'Show data point circles' },
              circleradius: { type: 'number', description: 'Circle radius' },
              strokewidth: { type: 'number', description: 'Line stroke width' },
              showAreaFill: { type: 'boolean', description: 'Fill area under line' }
            }
          },
          area: {
            type: 'object',
            description: 'Area chart options',
            properties: {
              opacity: { type: 'number', description: 'Fill opacity (0-1)' },
              showLabels: { type: 'boolean', description: 'Show value labels' }
            }
          },
          donut: {
            type: 'object',
            description: 'Donut chart options',
            properties: {
              factor: { type: 'number', description: 'Inner radius ratio (0-1)' }
            }
          },
          effects: {
            type: 'object',
            description: 'Animation and hover effects',
            properties: {
              duration: { type: 'number', description: 'Animation duration in ms' },
              hovercolor: { type: 'string', description: 'Hover highlight color' }
            }
          },
          margin: {
            type: 'object',
            description: 'Chart margins',
            properties: {
              top: { type: 'number' },
              bottom: { type: 'number' },
              left: { type: 'number' },
              right: { type: 'number' }
            }
          }
        }
      }
    }]
  })

  // Create config editor
  if (configEditorRef.value) {
    configEditor.value = monaco.editor.create(configEditorRef.value, {
      value: configCode.value,
      language: 'json',
      theme: 'uvchartsTheme',
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'off',
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      wordWrap: 'off',
      padding: { top: 16, bottom: 16 },
      renderLineHighlight: 'none',
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      overviewRulerBorder: false,
      scrollbar: {
        vertical: 'auto',
        horizontal: 'auto',
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
      }
    })

    configEditor.value.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runChart)
  }

  // Create data editor
  if (dataEditorRef.value) {
    dataEditor.value = monaco.editor.create(dataEditorRef.value, {
      value: dataCode.value,
      language: 'json',
      theme: 'uvchartsTheme',
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'off',
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      wordWrap: 'off',
      padding: { top: 16, bottom: 16 },
      renderLineHighlight: 'none',
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      overviewRulerBorder: false,
      scrollbar: {
        vertical: 'auto',
        horizontal: 'auto',
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
      }
    })

    dataEditor.value.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runChart)
  }
}

onMounted(async () => {
  await initMonaco()
  loadTemplate('bar')
})
</script>

<template>
  <section class="playground">
    <div class="playground-layout">
      <!-- Sidebar -->
      <aside class="chart-sidebar">
        <div class="sidebar-label">Charts</div>
        <ul class="chart-list">
          <li
            v-for="chart in chartTypes"
            :key="chart.id"
            class="chart-item"
            :class="{ active: currentChart === chart.id }"
            @click="loadTemplate(chart.id)"
          >
            <span class="icon">{{ chart.icon }}</span>
            {{ chart.label }}
          </li>
        </ul>
      </aside>

      <!-- Editor -->
      <div class="editor-panel">
        <div class="panel-tabs">
          <button
            class="panel-tab"
            :class="{ active: activeTab === 'config' }"
            @click="activeTab = 'config'"
          >Config</button>
          <button
            class="panel-tab"
            :class="{ active: activeTab === 'data' }"
            @click="activeTab = 'data'"
          >Data</button>
        </div>
        <div class="panel-toolbar">
          <span class="shortcut-hint">⌘ Enter</span>
          <button class="run-btn" @click="runChart">
            <svg viewBox="0 0 10 10" fill="currentColor"><path d="M2 1l7 4-7 4V1z"/></svg>
            Run
          </button>
        </div>
        <div class="editor-container">
          <div
            v-show="activeTab === 'config'"
            ref="configEditorRef"
            class="monaco-editor-wrapper"
          ></div>
          <div
            v-show="activeTab === 'data'"
            ref="dataEditorRef"
            class="monaco-editor-wrapper"
          ></div>
          <div v-if="error" class="error-toast">{{ error }}</div>
        </div>
      </div>

      <!-- Preview -->
      <div class="preview-panel">
        <div class="preview-header">Preview</div>
        <div class="preview-container">
          <div id="playground-output"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.playground {
  padding: 0 2rem;
  height: calc(100vh - 80px);
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  display: flex;
  justify-content: center;
}

.playground-layout {
  display: grid;
  grid-template-columns: 180px 1fr 1.5fr;
  height: 100%;
  gap: 1px;
  background: rgba(0,0,0,0.06);
  max-width: 1280px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 10px 15px -3px rgba(0, 0, 0, 0.08);
}

/* Sidebar */
.chart-sidebar {
  padding: 1.5rem 1rem;
  overflow-y: auto;
  background: white;
}

.sidebar-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-tertiary);
  padding: 0 0.75rem;
  margin-bottom: 1rem;
}

.chart-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.chart-item {
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid transparent;
}

.chart-item:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
  transform: translateX(4px);
}

.chart-item.active {
  background: linear-gradient(135deg, rgba(255, 92, 0, 0.08) 0%, rgba(255, 92, 0, 0.04) 100%);
  color: var(--accent-color);
  border-color: rgba(255, 92, 0, 0.15);
  font-weight: 600;
}

.chart-item .icon {
  font-size: 1rem;
  opacity: 0.8;
  width: 20px;
  text-align: center;
}

/* Editor Panel */
.editor-panel {
  display: flex;
  flex-direction: column;
  background: white;
  position: relative;
}

.panel-tabs {
  display: flex;
  gap: 0;
  height: 48px;
  padding: 0 1rem;
  align-items: flex-end;
  background: linear-gradient(to bottom, #fafafa, white);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.panel-tab {
  padding: 0.75rem 1.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-tertiary);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  margin-bottom: -1px;
}

.panel-tab:hover {
  color: var(--text-secondary);
}

.panel-tab.active {
  color: var(--text-primary);
  background: white;
  border-bottom-color: var(--accent-color);
}

.panel-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: white;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.run-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--accent-color) 0%, #ea580c 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(255, 92, 0, 0.2);
}

.run-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 92, 0, 0.3);
}

.run-btn:active {
  transform: translateY(0);
}

.run-btn svg {
  width: 10px;
  height: 10px;
}

.shortcut-hint {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  background: var(--bg-secondary);
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  font-family: 'SF Mono', ui-monospace, monospace;
}

.editor-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: white;
}

.monaco-editor-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.error-toast {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%);
  border: 1px solid #fecaca;
  border-radius: 12px;
  font-size: 0.8rem;
  font-family: 'SF Mono', ui-monospace, monospace;
  color: #dc2626;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.1);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Preview Panel */
.preview-panel {
  display: flex;
  flex-direction: column;
  background: white;
}

.preview-header {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  background: linear-gradient(to bottom, #fafafa, white);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.preview-container {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 1rem;
  overflow: auto;
  background:
    radial-gradient(circle at 50% 50%, rgba(255, 92, 0, 0.03) 0%, transparent 50%),
    linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
}

#playground-output {
  background: white;
  border-radius: 16px;
  padding: 1rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 10px 15px -3px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.03);
}
</style>
