import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/'
});

// Agrega un interceptor para configurar los encabezados antes de cada solicitud
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtén el token de localStorage
  if (token) {
    config.headers.common['Authorization'] = `${token}`; // Agrega el token a los encabezados
  }
  return config;
});

export default instance;
