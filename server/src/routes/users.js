const { Router } = require ("express");
const verifyToken = require('../middleware/middleware.js');
const router = Router();  // Crear instancia del router

// Importar controladores
const {
  createUser,
  login,
  getAllUsers
} = require("../controllers/users-controller.js")

router.post("/users", createUser);
router.post('/login', verifyToken, login);
router.get("/user", getAllUsers);

module.exports = router;
