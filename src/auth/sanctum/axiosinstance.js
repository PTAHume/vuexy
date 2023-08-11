import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.dealmanager.co.uk',
});

export default axiosInstance;