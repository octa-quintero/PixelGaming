const { Router } = require ("express");
const verifyToken = require('../middleware/middleware.js');
const router = Router();  // Crear instancia del router

// Importar controladores
const {
  createUser,
  login,
  getUserById
} = require("../controllers/users-controller.js")

router.post("/users", createUser);
router.post('/login', login);
router.get("/user/:userId", getUserById);

module.exports = router;
