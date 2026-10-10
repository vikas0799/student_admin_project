import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // The Express backend runs on port 3000 and does not enable CORS,
    // so the browser talks to Vite and Vite forwards /api/* to the backend.
    // e.g. /api/getdata -> http://localhost:3000/getdata
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
