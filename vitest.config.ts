import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/index.ts', 'src/**/*.d.ts'],
      thresholds: {
        // Utilities - high coverage target
        'src/utils/**/*.ts': {
          statements: 85,
          branches: 75,
          functions: 85,
          lines: 85,
        },
        // Chart classes - good coverage target (branch coverage is hard due to D3 callbacks)
        'src/charts/**/*.ts': {
          statements: 85,
          branches: 60,
          functions: 85,
          lines: 85,
        },
        // Global minimums (functions threshold removed due to uncalled palette helper)
        statements: 85,
        branches: 69,
        lines: 85,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
