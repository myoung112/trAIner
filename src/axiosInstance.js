import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ceprj.gachon.ac.kr:60012'
});

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
