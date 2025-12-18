<script setup lang="ts">
import { onMounted } from 'vue'
import { BarChart } from '@uvcharts/charts/BarChart'
import { LineChart } from '@uvcharts/charts/LineChart'
import { AreaChart } from '@uvcharts/charts/AreaChart'
import { PieChart } from '@uvcharts/charts/PieChart'
import { DonutChart } from '@uvcharts/charts/DonutChart'
import { WaterfallChart } from '@uvcharts/charts/WaterfallChart'

import {
  barChartData,
  lineChartData,
  areaChartData,
  pieChartData,
  donutChartData,
  waterfallChartData
} from '../chartData'

const charts = [
  { id: 'bar-chart', name: 'Bar Chart', type: BarChart, data: barChartData },
  { id: 'line-chart', name: 'Line Chart', type: LineChart, data: lineChartData },
  { id: 'area-chart', name: 'Area Chart', type: AreaChart, data: areaChartData },
  { id: 'pie-chart', name: 'Pie Chart', type: PieChart, data: pieChartData },
  { id: 'donut-chart', name: 'Donut Chart', type: DonutChart, data: donutChartData },
  { id: 'waterfall-chart', name: 'Waterfall Chart', type: WaterfallChart, data: waterfallChartData }
]

onMounted(() => {
  charts.forEach(chartItem => {
    const config = {
      dimension: { width: 300, height: 200 },
      meta: {
        position: `#${chartItem.id}`,
        caption: chartItem.name
      },
      graph: { responsive: true }
    }

    // @ts-ignore - Dynamic class instantiation
    chartItem.type.create(`#${chartItem.id}`, chartItem.data, config)
  })
})
</script>

<template>
  <section class="gallery">
    <div class="container">
      <h2>Chart Gallery</h2>
      <p class="intro">Explore our comprehensive details of charts.</p>

      <div class="chart-grid">
        <div v-for="chart in charts" :key="chart.id" class="chart-item">
          <div :id="chart.id" class="preview"></div>
          <h3>{{ chart.name }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  padding: 8rem 2rem;
  background: var(--bg-secondary);
  position: relative;
}

.gallery h2 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--text-primary);
  letter-spacing: -0.03em;
}

.intro {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 5rem;
  font-size: 1.25rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.5rem;
  max-width: 1280px;
  margin: 0 auto;
}

.chart-item {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: var(--shadow-sm);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
}

.chart-item:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: var(--shadow-xl);
  border-color: rgba(0,0,0,0.08);
}

.preview {
  height: 280px;
  padding: 1.5rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
}

.chart-item:hover .preview {
  transform: scale(1.02);
}

h3 {
  padding: 1.25rem 2rem;
  font-size: 1.15rem;
  font-weight: 700;
  border-top: 1px solid rgba(0,0,0,0.05);
  background: white;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h3::after {
  content: '→';
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  color: var(--accent-color);
}

.chart-item:hover h3::after {
  opacity: 1;
  transform: translateX(0);
}
</style>
