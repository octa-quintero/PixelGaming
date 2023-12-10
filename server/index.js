const express = require('express');
const cors = require('cors');
const path = require('path');
const { conn } = require('./src/db.js');
const { data } = require("./src/controllers/games-controllers.js");
const server = require('./src/app.js');

const PORT = process.env.PORT || 3001;

// Middleware
server.use(cors());

// Servir archivos estáticos en producción
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client/build')));
}

console.log(__dirname, 'client/build');

// Sincronización de la base de datos y inicio del servidor
async function startServer() {
  try {
    await conn.sync({ force: false });
    await server.listen(PORT);
    console.log('Server listening on port', PORT);
    await data();
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();