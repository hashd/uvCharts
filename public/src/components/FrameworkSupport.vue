<script setup lang="ts">
const frameworks = [
  { name: 'React', color: '#61dafb' },
  { name: 'Vue', color: '#42b883' },
  { name: 'Angular', color: '#dd0031' },
  { name: 'Svelte', color: '#ff3e00' },
  { name: 'Vanilla', color: '#f7df1e' }
]
</script>

<template>
  <section class="frameworks">
    <div class="container">
      <h2>Works everywhere.</h2>
      <p>Framework agnostic. Use it with your favorite tools.</p>

      <div class="grid">
        <div v-for="fw in frameworks" :key="fw.name" class="fw-card">
            <div class="dot" :style="{ background: fw.color }"></div>
            <span>{{ fw.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.frameworks {
  padding: 8rem 2rem;
  text-align: center;
  background: white;
  color: var(--text-primary);
  border-top: 1px solid rgba(0,0,0,0.05);
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

p {
  color: var(--text-secondary);
  font-size: 1.25rem;
  margin-bottom: 4rem;
}

.grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.fw-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.75rem;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-primary);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: default;
  box-shadow: var(--shadow-sm);
}

.fw-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: var(--shadow-lg);
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}
</style>
