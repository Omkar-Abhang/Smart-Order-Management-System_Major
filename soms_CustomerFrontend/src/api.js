import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

// Automatically attach JWT token from localStorage/sessionStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
