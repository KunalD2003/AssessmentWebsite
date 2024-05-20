import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
    '/api/assessments': 'https://assessmentwebsite-6.onrender.com',
    },
  },
  plugins: [react()],
})
