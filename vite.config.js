import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server:{
      proxy:{
      '/api/mcqquestions': 'http://localhost:3001',
      '/api/codingProblems': 'http://localhost:3000',
      '/api/assessments': 'http://localhost:3000',
      '/webcam/addImage': 'http://localhost:3002',
      '/webcam/saveImage': 'http://localhost:3002',
      '/api/register': 'http://localhost:3000',
      '/api/users': 'http://localhost:3000',
      '/archievedexamresult': 'http://localhost:3001',
      },
    },
  plugins: [react()],
});
