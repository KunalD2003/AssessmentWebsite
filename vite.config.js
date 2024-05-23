import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
server:{
      host: '0.0.0.0',
      port: process.env.PORT || 5143,

      proxy:{
      '/api/mcqquestions': {
        target: process.env.VITE_API_ANKIT_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/api/codingProblems': {
        target: process.env.VITE_API_SHIVAM_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/api/assessments': {
        target: process.env.VITE_API_SHIVAM_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/webcam/addImage': {
        target: process.env.VITE_API_PRIYANKA_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/webcam/saveImage': {
        target: process.env.VITE_API_PRIYANKA_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/api/register': {
        target: process.env.VITE_API_SHIVAM_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/api/users': {
        target: process.env.VITE_API_SHIVAM_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/archievedexamresult': {
        target: process.env.VITE_API_SHIVAM_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/result': {
        target: process.env.VITE_API_ANKIT_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/compilex': {
        target: process.env.VITE_API_SHIVAM_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      '/contacts': {
        target: process.env.VITE_API_ANKIT_URL,  // Your backend API URL for development
        changeOrigin: true,
      },
      },
      preview: {
        host: '0.0.0.0',
        port: process.env.PORT || 5143,
      }
    },
  plugins: [react()],
});
