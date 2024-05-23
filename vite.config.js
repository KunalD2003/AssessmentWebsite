import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
server:{
      host: '0.0.0.0',
      port: process.env.PORT || 5143,

      proxy:{
      '/api/mcqquestions': 'https://assessmentwebsite-4-3u7s.onrender.com',
      '/api/codingProblems': {
        target: process.env.VITE_API_SHIVAM_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/api/assessments': 'https://assessmentwebsite-6.onrender.com',
      '/webcam/addImage': 'https://assessmentwebsite-webcam4.onrender.com',
      '/webcam/saveImage': 'https://assessmentwebsite-webcam4.onrender.com',
      '/api/register': {
        target: process.env.VITE_API_SHIVAM_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/api/users': {
        target: process.env.VITE_API_SHIVAM_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/archievedexamresult': 'https://assessmentwebsite-4-3u7s.onrender.com',
      '/result': 'https://assessmentwebsite-4-3u7s.onrender.com',
      '/compilex': {
        target: process.env.VITE_API_SHIVAM_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/contacts': 'https://assessmentwebsite-4-3u7s.onrender.com/contacts'
      },
      preview: {
        host: '0.0.0.0',
        port: process.env.PORT || 5143,
      }
    },
  plugins: [react()],
});
