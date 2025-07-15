import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // ✅ this will resolve correctly in dev with proxy
  withCredentials: true, // optional: if using cookies
});

export default axiosInstance;
