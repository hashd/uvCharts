<template>
  <section class="hero">
    <!-- Decorative Background Elements -->
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <div class="content slide-up">
      <div class="badge">v2.0 is now available</div>
      <h1 class="title">
        The chart library <br>
        <span class="gradient-text">developers love.</span>
      </h1>
      <p class="subtitle">
        Simple, robust, and beautiful charts for modern web applications.
        Built with D3.js, optimized for TypeScript.
      </p>
      <div class="cta-group">
        <button class="btn primary" @click="emit('get-started')">
          Get Started
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="icon"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <a href="https://github.com/imaginea/uvCharts" target="_blank" class="btn secondary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="icon"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          Star on GitHub
        </a>
      </div>
      <div class="stats">
        <div class="stat-item">
            <strong>10+</strong> Chart Types
        </div>
        <div class="separator"></div>
        <div class="stat-item">
            <strong>AAA</strong> Accessibility
        </div>
        <div class="separator"></div>
        <div class="stat-item">
            <strong>100%</strong> TypeScript
        </div>
      </div>
    </div>
    <div class="visual slide-up" style="animation-delay: 0.2s;">
      <div id="hero-chart" class="chart-container"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { BarChart } from '@uvcharts/charts/BarChart'
import type { GraphDefinition } from '@uvcharts/types'

const emit = defineEmits<{
  (e: 'get-started'): void
}>()

onMounted(() => {
  const graphDef: GraphDefinition = {
    categories: ['uvCharts'],
    dataset: {
      'uvCharts': [
        { name: 'Mon', value: 40 },
        { name: 'Tue', value: 70 },
        { name: 'Wed', value: 55 },
        { name: 'Thu', value: 85 },
        { name: 'Fri', value: 60 },
        { name: 'Sat', value: 45 },
        { name: 'Sun', value: 75 }
      ]
    }
  }

  const config = {
    dimension: {
      width: 500,
      height: 380
    },
    meta: {
      caption: 'Weekly Activity',
      position: '#hero-chart'
    },
    graph: {
      orientation: 'Vertical',
      responsive: true
    },
    bar: {
        useGradient: true,
        strokecolor: 'none'
    },
    chart: {
        background: 'transparent'
    }
  }

  BarChart.create('#hero-chart', graphDef, config as any)
})
</script>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8rem 2rem 6rem;
  max-width: 1280px;
  margin: 0 auto;
  gap: 4rem;
  overflow: visible;
}

/* Background Blobs */
.bg-blob {
  position: absolute;
  filter: blur(80px);
  z-index: -1;
  opacity: 0.5;
  border-radius: 50%;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: rgba(255, 92, 0, 0.15);
  top: -10%;
  left: -10%;
}

.blob-2 {
  width: 300px;
  height: 300px;
  background: rgba(8, 145, 178, 0.15);
  bottom: 10%;
  right: -5%;
}

.content {
  flex: 1;
  max-width: 600px;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 92, 0, 0.1);
  color: var(--accent-color);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 92, 0, 0.2);
}

.title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.04em;
  color: var(--text-primary);
}

.gradient-text {
  background: linear-gradient(135deg, var(--accent-color) 0%, #ff8a4d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  font-weight: 400;
  line-height: 1.6;
  max-width: 90%;
}

.cta-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.btn.primary {
  background: var(--text-primary);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background: #000;
}

.btn.secondary {
  background: white;
  color: var(--text-primary);
  border-color: #e5e7eb;
}

.btn.secondary:hover {
  border-color: #d1d5db;
  background: #f9fafb;
}

.stats {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0,0,0,0.05);
}

.stat-item {
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.stat-item strong {
    color: var(--text-primary);
    font-size: 1.1rem;
}

.separator {
    width: 1px;
    height: 24px;
    background: rgba(0,0,0,0.1);
}

.visual {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
}

.chart-container {
  width: 500px;
  height: 400px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(0,0,0,0.05);
  backdrop-filter: blur(12px);
  position: relative;
  z-index: 1;
}

.visual::before {
    content: '';
    position: absolute;
    top: -20px;
    right: 20px;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, var(--brand-teal) 0%, transparent 70%);
    opacity: 0.2;
    z-index: 0;
}
</style>
