const { Router } = require("express");
const verifyToken = require('../middleware/tokenAuthorization.js');
const isAdmin = require('../middleware/adminAuthorization.js')
const router = Router();

const {
  getAllGames,
  getAllUsers,
  deleteUser,
  deleteGame
} = require("../controllers/admin-controllers.js")

router.get("/users", verifyToken, isAdmin, getAllGames);
router.get("/users", verifyToken, isAdmin, getAllUsers);
router.get("/users", verifyToken, isAdmin, deleteUser);
router.get("/users", verifyToken, isAdmin, deleteGame);

module.exports = router;
