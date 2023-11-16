const { Router } = require ("express");
const verifyToken = require('../middleware/middleware.js');
const router = Router();

// Importar controladores
const {
  createUser,
  login,
  getUserById,
  updateUser,
  resetPassword,
  forgotPassword,
  refreshToken
} = require("../controllers/users-controller.js")

router.post("/users", createUser);
router.post('/login', login);
router.get("/user/:userId", verifyToken, getUserById);
router.put("/user/:userId", verifyToken, updateUser);

// restore password
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);
router.post('/refresh-token', refreshToken);

module.exports = router;
