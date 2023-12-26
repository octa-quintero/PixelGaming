const express = require('express');
const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes/index.js');
const PORT = process.env.PORT || 3001;
const { Pool } = require('pg');
require('./db.js');

const server = express(); // Creación de la instancia del servidor
server.use(cors()); // Habilitar CORS

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conexión exitosa con la base de datos!');
    done(); // liberar el cliente al pool
  }
});

// Servir archivos estáticos en producción
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client/build')));
}

server.name = 'API';

// Middleware para manejo de datos
server.use(urlencoded({ extended: true, limit: '50mb' }));
server.use(json({ limit: '50mb' }));
server.use(cookieParser());

// Middleware para registro de solicitudes en consola
server.use(morgan('dev'));

// Configuración de encabezados para CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Usar rutas definidas en el archivo 'routes/index.js'
server.use('/', routes);

// Middleware para manejo de errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

