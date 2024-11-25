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
    Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZyIsIm5hbWUiOiJzdHJpbmciLCJzdWIiOiIxIiwicm9sZSI6IjEiLCJuYmYiOjE3MzI1Njk5MDgsImV4cCI6MTczMzAwMTkwOCwiaWF0IjoxNzMyNTY5OTA4LCJpc3MiOiJBdXRoSXNzdWVyIiwiYXVkIjoiVXNlcnNBdWRpZW5jZSJ9.aFHul-J0sAh_gGRJm_iu7DoXzVLazsgH8TPJ3SVirc15vAuWGPxIvur4968t5PaROoOL4SYfToOAfEdcFesYog`,
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
