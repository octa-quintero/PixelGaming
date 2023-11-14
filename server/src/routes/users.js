const { Router } = require ("express");
const verifyToken = require('../middleware/middleware.js');
const router = Router();  // Crear instancia del router

// Importar controladores
const {
  createUser,
  login,
  getUserById,
  updateUser
} = require("../controllers/users-controller.js")

router.post("/users", createUser);
router.post('/login', login);
router.get("/user/:userId", verifyToken, getUserById);
router.put("/user/:userId", verifyToken, updateUser);

module.exports = router;
