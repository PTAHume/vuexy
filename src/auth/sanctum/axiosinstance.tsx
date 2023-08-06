import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://46.101.81.249',
});

export default axiosInstance;