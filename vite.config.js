import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server:{
      proxy:{
      '/api/mcqquestions': 'https://assessmentwebsite-4-3u7s.onrender.com',
      '/api/codingProblems': 'https://assessmentwebsite-6.onrender.com',
      '/api/assessments': 'https://assessmentwebsite-6.onrender.com',
      '/webcam/addImage': 'https://assessmentwebsite-webcam2.onrender.com',
      '/webcam/saveImage': 'https://assessmentwebsite-webcam2.onrender.com',
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
