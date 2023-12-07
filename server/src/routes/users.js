const { Router } = require("express");
const verifyToken = require('../middleware/middleware.js');
const router = Router();

const {
  manageLibrary,
  getUserLibrary,
  gameInLibrary
  } = require("../controllers/games-library.js");
  
// Importar controladores existentes
const {
  createUser,
  login,
  getUserById,
  updateUser,
  resetPassword,
  forgotPassword,
  logout
} = require("../controllers/users-controller.js")

router.post("/users", createUser);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.get("/user/:userId", getUserById);
router.put("/user/:userId", verifyToken, updateUser);

// restore password
router.put('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);

// Nueva ruta para agregar juego a la biblioteca
router.post('/library/add', verifyToken, manageLibrary);
router.get('/library/user/:userId', verifyToken, getUserLibrary);
router.get('/library/game/:gameId', verifyToken, gameInLibrary);

module.exports = router;
