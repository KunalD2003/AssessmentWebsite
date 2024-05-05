import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server:{
      proxy:{
      '/api/mcqquestions': 'http://localhost:3000',
      '/api/codingProblems': 'http://localhost:3000',
      '/api/assessments': 'http://localhost:3001',
      },
    },
  plugins: [react()],
});
