<script setup lang="ts">
import { onMounted } from 'vue'
import { LineChart } from '@uvcharts/charts/LineChart'
import type { GraphDefinition } from '@uvcharts/types'

onMounted(() => {
  const graphDef: GraphDefinition = {
    categories: ['UV', 'PV'],
    dataset: {
      'UV': [
        { name: 'Mon', value: 4000 },
        { name: 'Tue', value: 3000 },
        { name: 'Wed', value: 2000 },
        { name: 'Thu', value: 2780 },
        { name: 'Fri', value: 1890 },
        { name: 'Sat', value: 2390 },
        { name: 'Sun', value: 3490 }
      ],
      'PV': [
        { name: 'Mon', value: 2400 },
        { name: 'Tue', value: 1398 },
        { name: 'Wed', value: 9800 },
        { name: 'Thu', value: 3908 },
        { name: 'Fri', value: 4800 },
        { name: 'Sat', value: 3800 },
        { name: 'Sun', value: 4300 }
      ]
    }
  }

  const config = {
    dimension: { width: 500, height: 350 },
    meta: { position: '#demo-chart' },
    graph: { responsive: true },
    line: { showAreaFill: true }
  }

  LineChart.create('#demo-chart', graphDef, config as any)
})
</script>

<template>
  <section class="code-demo">
    <div class="container">
      <div class="text-side">
        <h2>Unbelievably simple API.</h2>
        <p>
          Define your data, configure your options, and render.
          It's that straightforward. No complex configurations or steep learning curves.
        </p>
        <div class="code-block">
<pre>// 1. Define Data
const data = {
  categories: ['UV', 'PV'],
  dataset: {
    'UV': [
      { name: 'Mon', value: 4000 },
      ...
    ]
  }
};

// 2. Render
LineChart.create('#chart', data);</pre>
        </div>
      </div>
      <div class="visual-side">
        <div class="chart-card">
            <div id="demo-chart" class="chart-container"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.code-demo {
  padding: 6rem 2rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
  position: relative;
  overflow: hidden;
}

/* Subtle background accent */
.code-demo::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1000px;
  height: 1000px;
  background: radial-gradient(circle, rgba(26, 153, 170, 0.08) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 6rem;
  position: relative;
  z-index: 1;
}

.text-side {
  flex: 1;
}

.visual-side {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

h2 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  letter-spacing: -0.03em;
}

p {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.code-block {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 2rem;
  font-family: 'SF Mono', ui-monospace, 'Menlo', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #e2e8f0;
  box-shadow: var(--shadow-xl);
  position: relative;
}

/* Window controls */
.code-block::before {
  content: '';
  display: block;
  width: 52px;
  height: 12px;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='12' viewBox='0 0 52 12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6' cy='6' r='6' fill='%23ff5f56'/%3E%3Ccircle cx='26' cy='6' r='6' fill='%23ffbd2e'/%3E%3Ccircle cx='46' cy='6' r='6' fill='%2327c93f'/%3E%3C/svg%3E");
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

pre {
  margin: 0;
  overflow-x: auto;
}

.chart-card {
  background: white;
  border-radius: 24px;
  padding: 1.5rem;
  width: 100%;
  max-width: 580px;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.chart-container {
    height: 380px;
    width: 100%;
}
</style>
