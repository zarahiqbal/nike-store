// This file contains the API configuration for the application.
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://elegant-duck-3bccb7b995.strapiapp.com/api',
});

export default api;