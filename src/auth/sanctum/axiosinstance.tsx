import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://134.122.97.77',
});

export default axiosInstance;