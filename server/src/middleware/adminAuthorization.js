module.exports = (req, res, next) => {
  if (req.user && req.user.isAdmin) { // Aquí 'isAdmin' se refiere al campo de tu modelo
    next(); // Permite continuar con la siguiente función/middleware
  } else {
    res.status(403).json({ message: 'Acceso denegado: no eres administrador.' });
  }
};