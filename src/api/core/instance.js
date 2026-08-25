import axios from 'axios';
import {
  attachRequestInterceptor,
  attachResponseInterceptor,
} from './interceptors';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

attachRequestInterceptor(instance);
attachResponseInterceptor(instance);

export default instance;
