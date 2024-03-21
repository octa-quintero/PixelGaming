const express = require('express');
const cors = require('cors');
const path = require('path');
const { conn } = require('./src/db.js');
const { data } = require("./src/controllers/games-controllers.js");
const server = require('./src/app.js');

const PORT = process.env.PORT || 3001;

// Middleware
server.use(cors());

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.resolve(__dirname, '..', 'client', 'build');
  server.use(express.static(buildPath));
}

async function startServer() {
  try {
    await conn.authenticate();
    console.log('Connected to the database');
    await conn.sync({ force: false });
    console.log('Database synchronized successfully');
    await server.listen(PORT);
    console.log('Server listening on port', PORT);
    await data();
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
