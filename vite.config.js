import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5143,
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },

    proxy: {
      '/api/mcqquestions': 'https://assessmentwebsite-4-3u7s.onrender.com',
      '/api/codingProblems': 'https://assessmentwebsite-6.onrender.com',
      '/api/assessments': 'https://assessmentwebsite-6.onrender.com',
      '/webcam/addImage': 'https://assessmentwebsite-webcam4.onrender.com',
      '/webcam/saveImage': 'https://assessmentwebsite-webcam4.onrender.com',
      '/api/register': 'https://assessmentwebsite-6.onrender.com',
      '/api/users': 'https://assessmentwebsite-6.onrender.com',
      '/archievedexamresult': 'https://assessmentwebsite-4-3u7s.onrender.com',
      '/result': 'https://assessmentwebsite-4-3u7s.onrender.com',
      '/compilex': 'https://assessmentwebsite-6.onrender.com',
      '/contacts': 'https://assessmentwebsite-4-3u7s.onrender.com/contacts'
    },
  },
  plugins: [react()],
});
