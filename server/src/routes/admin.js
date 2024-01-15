const { Router } = require ("express");
const verifyToken = require('../middleware/tokenAuthorization.js');
const isAdmin = require('../middleware/adminAuthorization.js');
const router = Router();

const {
  getAllGamesAdmin,
  getAllUsersAdmin,
  deleteUser,
  deleteGame
} = require("../controllers/admin-controllers.js");

// Rutas para obtener y eliminar usuarios
router.get("/admin/games", verifyToken, isAdmin, getAllGamesAdmin);
router.get("/admin/users", verifyToken, isAdmin, getAllUsersAdmin);
router.delete("/admin/games/:gameId", verifyToken, isAdmin, deleteGame);
router.delete("/admin/users/:userId", verifyToken, isAdmin, deleteUser);

module.exports = router;
