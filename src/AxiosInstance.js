// src/axiosInstance.js
import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SHIVAM_URL,
});

// export const axiosInstance2 = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL_2,
// });
