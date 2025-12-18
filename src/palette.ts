/**
 * Modern color palettes for uvCharts
 * Inspired by Tailwind CSS, Radix UI, and contemporary design systems
 */

export const palettes = {
  // Default - Modern vibrant palette
  Default: [
    '#6366f1', // Indigo
    '#8b5cf6', // Violet
    '#ec4899', // Pink
    '#f97316', // Orange
    '#22c55e', // Green
    '#0ea5e9', // Sky
    '#f43f5e', // Rose
    '#eab308', // Yellow
    '#14b8a6', // Teal
  ],

  // Professional monochrome
  Slate: ['#64748b', '#475569', '#334155', '#1e293b', '#0f172a'],

  // Aurora - Purple/Blue gradient-friendly
  Aurora: ['#a78bfa', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3'],

  // Sunset - Warm tones
  Sunset: ['#fbbf24', '#f59e0b', '#f97316', '#ef4444', '#dc2626', '#b91c1c'],

  // Ocean - Cool blues
  Ocean: ['#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63'],

  // Forest - Natural greens
  Forest: ['#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'],

  // Corporate - Professional blues
  Corporate: ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],

  // Candy - Playful pastels
  Candy: [
    '#f472b6',
    '#fb7185',
    '#fda4af',
    '#fdba74',
    '#fcd34d',
    '#a3e635',
    '#4ade80',
    '#2dd4bf',
    '#38bdf8',
    '#a78bfa',
  ],

  // Monochrome - Grayscale
  Mono: ['#374151', '#4b5563', '#6b7280', '#9ca3af', '#d1d5db'],
} as const;

export type PaletteName = keyof typeof palettes;

/**
 * Get a color from a palette by index (wraps around)
 */
export function getColorFromPalette(palette: PaletteName, index: number): string {
  const colors = palettes[palette];
  return colors[index % colors.length] ?? colors[0]!;
}
