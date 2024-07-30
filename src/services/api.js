import axios from 'axios'

const { VITE_API_BASE_URL, VITE_API_KEY } = import.meta.env

const api = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': VITE_API_KEY,
  },
})

export default api
