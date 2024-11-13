import axios from 'axios';
import { env } from '../../shared/config/env';

const httpClient = axios.create({
  baseURL: env.BACKEND_URL,
  timeout: 5000,
});

export default httpClient;