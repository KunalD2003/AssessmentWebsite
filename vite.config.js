import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Bind to 0.0.0.0 to accept connections from any network interface
    port: process.env.PORT || 3000, // Use the PORT environment variable or default to 3000
    proxy: {
      '/api/assessments': {
        target: 'https://assessmentwebsite-6.onrender.com',
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // If the target site uses self-signed SSL certificates
      },
    },
  },
  plugins: [react()],
})
