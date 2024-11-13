import axios from 'axios'
import 'dotenv/config'

const BACKEND_URL = process.env.BASE_URL

const httpClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default httpClient
