import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite dev proxy: /api/* → http://localhost:8080/*
// This avoids CORS issues during development.
// In production, configure your reverse proxy (nginx etc.) similarly.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
