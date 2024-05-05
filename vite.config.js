import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server:{
      proxy:{
      '/api/mcqquestions': 'http://localhost:3000',
      '/api/codingProblems': 'http://localhost:3001'
      },
    },

  plugins: [react()],
})
