const { Router } = require ("express");
const router = Router();  // Crear instancia del router

// Importar controladores
const {
  createUser,
  login
} = require("../controllers/users-controller.js")

router.post("/users", createUser);
router.post("/login", login);

module.exports = router;
