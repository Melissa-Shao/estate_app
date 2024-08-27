import axios from 'axios';

const apiRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://smile-estate-app.onrender.com/api'
    : 'http://localhost:3000/api',
  withCredentials: true,
});

export default apiRequest;