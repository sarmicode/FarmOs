import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: false,
    // Allow the sandbox live-preview proxy host (and any *.e2b.app subdomain).
    allowedHosts: ['.e2b.app']
  },
  build: {
    rollupOptions: {
      output: {
        // Split heavy vendor libraries into their own long-cacheable chunks so
        // no single bundle grows past the 500 kB warning threshold.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    }
  }
})
