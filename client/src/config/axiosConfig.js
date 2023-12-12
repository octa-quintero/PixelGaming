import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/'
});

// Agrega un interceptor para configurar los encabezados antes de cada solicitud
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    if (!config.headers) {
      config.headers = {}; // Inicializa config.headers si no está definido
    }
    config.headers['Authorization'] = token; // Agrega el token a los encabezados
  }
  return config;
});

export default instance;

