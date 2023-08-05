import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://134.122.97.77',
});

export default axiosInstance;