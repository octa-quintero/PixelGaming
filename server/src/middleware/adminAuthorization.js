require('dotenv').config();
const { Users } = require("../db");
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

async function adminAuthorization(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(authHeader, secretKey);
    const user = await Users.findByPk(decoded.userId);

    if (!user || !user.is_admin) {
      return res.status(403).json({ message: 'Acceso denegado: no eres administrador.' });
    }
    next();
  } catch (error) {
    console.error(error, "error");
    res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = adminAuthorization;
