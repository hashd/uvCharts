<script setup lang="ts">
import HeroSection from './components/HeroSection.vue'
import FeatureList from './components/FeatureList.vue'
import DocViewer from './components/DocViewer.vue'
import CodeDemoSection from './components/CodeDemoSection.vue'
import FrameworkSupport from './components/FrameworkSupport.vue'
import Playground from './components/Playground.vue'
import Logo from './components/Logo.vue'
import { ref } from 'vue'

const currentView = ref('home')

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'docs', label: 'Docs' },
  { id: 'playground', label: 'Playground' }
]

const scrollToTop = () => {
    window.scrollTo(0,0)
}
</script>

<template>
  <div class="app-container">
    <header class="site-header">
      <nav class="nav-container">
        <div class="logo-wrapper" @click="currentView = 'home'; scrollToTop()">
            <Logo />
            <span class="logo-text">uvCharts</span>
        </div>
        <ul class="nav-links">
          <li v-for="item in navItems" :key="item.id">
            <a
              href="#"
              @click.prevent="currentView = item.id; scrollToTop()"
              :class="{ active: currentView === item.id }"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
        <div class="actions">
          <a href="https://github.com/imaginea/uvCharts" target="_blank" class="github-link">GitHub</a>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <template v-if="currentView === 'home'">
        <HeroSection @get-started="currentView = 'docs'; scrollToTop()" />
        <FeatureList />
        <CodeDemoSection />
        <FrameworkSupport />
      </template>

      <DocViewer v-if="currentView === 'docs'" />
      <Playground v-if="currentView === 'playground'" />
    </main>

    <footer class="site-footer">
      <p>&copy; {{ new Date().getFullYear() }} uvCharts. Released under MIT Licnese.</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}


.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.logo-wrapper:hover {
  opacity: 0.8;
}

.logo-text {
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  position: relative;
  padding: 0.5rem 0;
}

.nav-links a:hover {
  color: var(--text-primary);
}

.nav-links a.active {
  color: var(--accent-color);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent-color);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.nav-links a.active::after,
.nav-links a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.github-link {
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.6rem 1.2rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 100px;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.github-link:hover {
  border-color: #d1d5db;
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.main-content {
  margin-top: 80px;
  flex: 1;
}

.site-footer {
  padding: 4rem 2rem;
  text-align: center;
  color: var(--text-tertiary);
  font-size: 0.9rem;
  background: var(--bg-secondary);
  border-top: 1px solid rgba(0,0,0,0.05);
}
</style>
