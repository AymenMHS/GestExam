// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true, // indispensable pour envoyer/recevoir les cookies Laravel (Sanctum)
  headers: {
    Accept: 'application/json',
  },
});

export default api;
