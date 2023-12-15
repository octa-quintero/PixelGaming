const { Router } = require("express");
const verifyToken = require('../middleware/middleware.js');
const router = Router();

const {
  addFavoriteGame,
  checkGameInLibrary,
  getFavoriteGames
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

// Nueva ruta para agregar un juego a los favoritos
router.post('/add-favorite/:gameId', verifyToken,  addFavoriteGame);
router.get('/check-library/:gameId/:userId', verifyToken, checkGameInLibrary);
router.get('/library/:userId', verifyToken, getFavoriteGames);


module.exports = router;
