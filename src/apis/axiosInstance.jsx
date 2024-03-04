import axios from 'axios';

const BASE_URL = 'http://localhost:1337'

// role chính
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, 
  withCredentials: true, 
});

axiosInstance.interceptors.request.use((config) => {
  // Get accessToken from local storage
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers['x-access-token'] = accessToken;
  }

  return config;
});

export default axiosInstance;