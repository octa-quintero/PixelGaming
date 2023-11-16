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
router.get("/games", getGames);
router.get("/games/top3", getTop3Games);
router.get("/games/top10", getTop10Games);
router.get("/games/freegames", getRandomGames);
router.get("/games/all", getAllGames);
router.get("/games/filter", filterGamesByTagsAndPlatform);
router.get("/games/:gameId", getOneGame)


module.exports = router;