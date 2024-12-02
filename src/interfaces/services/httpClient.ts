import axios from 'axios'
import 'dotenv/config'
import https from 'https'

const { DEPLOY_URL } = process.env

const agent = new https.Agent({
  rejectUnauthorized: false,
})

const httpClient = axios.create({
  baseURL: DEPLOY_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
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
