require('dotenv').config();

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization');

  // Verifica si el encabezado de autorización existe
  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    // Decodifica el token sin verificar el formato "Bearer"
    const token = authHeader;

    // Verifica y decodifica el token
    const decoded = jwt.verify(token, secretKey);

    // Puedes acceder a los datos del usuario desde `decoded`, por ejemplo, `decoded.userId`

    // Continúa con la solicitud
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = verifyToken;
