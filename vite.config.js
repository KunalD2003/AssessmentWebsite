import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server:{
    proxy:{
    '/api/assessments': 'http://localhost:3001',
    },
  },
  plugins: [react()],
});
