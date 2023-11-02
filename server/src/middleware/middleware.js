require('dotenv').config();

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization');

  // Verifica si el encabezado de autorización existe
  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  // Divide el encabezado para extraer el token
  const [bearer, token] = authHeader.split(' ');

  // Verifica si el token tiene el formato correcto
  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Formato de token inválido' });
  }

  try {
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
