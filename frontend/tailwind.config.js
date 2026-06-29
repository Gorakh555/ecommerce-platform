/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:     { DEFAULT: '#0f0f0f', soft: '#5a5a5a', faint: '#a8a8a8' },
        canvas:  '#faf9f7',
        surface: '#ffffff',
        accent:  { DEFAULT: '#2d5be3', light: '#e8edfb' },
        seller:  { DEFAULT: '#7c3aed', light: '#ede9fe' },
        warm:    '#f5f0e8',
        bdr:     '#e4e2de',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
