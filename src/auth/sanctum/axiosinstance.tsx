import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://46.101.81.249',
});

export default axiosInstance;