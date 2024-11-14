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

export default httpClient
