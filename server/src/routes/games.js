const { Router } = require ("express");
const router = Router();  // Crear instancia del router
const verifyToken = require("../middleware/middleware.js");

// Importar controladores
const {
  getGames,
  getOneGame,
  getRandomGames,
  getTop10Games,
  getTop3Games,
  getAllGames,
  filterGamesByTagsAndPlatform,
} = require("../controllers/games-controllers.js");

// Definir rutas y asociar a los controladores correspondientes
router.get("/games", verifyToken, getGames);
router.get("/games/top3", verifyToken, getTop3Games);
router.get("/games/top10", verifyToken, getTop10Games);
router.get("/games/freegames",verifyToken, getRandomGames);
router.get("/games/all",verifyToken,  getAllGames);
router.get("/games/filter", verifyToken, filterGamesByTagsAndPlatform);
router.get("/games/:gameId", getOneGame)


module.exports = router;