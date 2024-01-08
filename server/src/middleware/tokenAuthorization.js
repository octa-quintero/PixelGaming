require('dotenv').config();
const { Users } = require("../db")

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

async function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization');

  // Verifica si el encabezado de autorización existe
  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  // Verifica si el token tiene el formato correcto
  if (!authHeader) {
    return res.status(401).json({ message: 'Formato de token inválido' });
  }

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(authHeader, secretKey);

    // Continúa con la solicitud
    next();
  } catch (error) {
    console.error(error, "error")
    res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = verifyToken;
