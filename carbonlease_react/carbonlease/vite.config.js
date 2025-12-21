import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
 server: {
    proxy: {
      '/ws-event': {
        target: 'http://localhost:80',
        ws: true,
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
