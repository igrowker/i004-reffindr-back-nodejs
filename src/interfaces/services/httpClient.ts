import axios from 'axios'
import 'dotenv/config'
import https from 'https'

const { BACKEND_URL } = process.env

const agent = new https.Agent({
  rejectUnauthorized: false,
})

const httpClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvbkBzbm93LmNvbSIsIm5hbWUiOiJKb24iLCJzdWIiOiI2Iiwicm9sZSI6IjEiLCJuYmYiOjE3MzI2MzY0NDUsImV4cCI6MTczMzA2ODQ0NSwiaWF0IjoxNzMyNjM2NDQ1LCJpc3MiOiJBdXRoSXNzdWVyIiwiYXVkIjoiVXNlcnNBdWRpZW5jZSJ9.dy6qM4zbzzqNqljv6-QAy2tYR4U8xzNg-LvsmHauYDHTSeHu3BR6GnieCT3fU4aGIz5ot-8N0flTv5RIy7gDHA`,
  },
  httpsAgent: agent,
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject({
      response: {
        status: error.response?.status || 500,
        data: error.response?.data || { message: 'Internal Server Error.' },
      },
    })
  }
)

export default httpClient
