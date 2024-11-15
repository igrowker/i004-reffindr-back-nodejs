import axios from 'axios'
import 'dotenv/config'

const { BACKEND_URL } = process.env

const httpClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject({
      response: {
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Internal Server Error." },
      },
    });
  }
);

export default httpClient
