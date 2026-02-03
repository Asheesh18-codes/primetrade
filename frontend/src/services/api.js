import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1';

console.log("API Service initialized with base URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  console.log("API Request interceptor - URL:", config.url, "Method:", config.method);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("API Response success:", response.status, response.data);
    return response;
  },
  (error) => {
    console.log("API Response error:", error.message, error.response);
    return Promise.reject(error);
  }
);

export const register = (email, password) => {
  console.log("Register function called with:", { email, password });
  return api.post('/auth/register', { email, password });
};
export const login = (email, password) => {
  console.log("Login function called with:", { email, password });
  return api.post('/auth/login', { email, password });
};
export const createTask = (title, description) => api.post('/tasks', { title, description });
export const getTasks = () => api.get('/tasks');
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
