const { Router } = require ("express");
const router = Router();  // Crear instancia del router

// Importar controladores
const {
  getGames,
  getOneGame,
  getRandomGames,
  getTop3Games,
  getGamesOrder,
  getAllGames
} = require("../controllers/games-controllers.js");

// Definir rutas y asociar a los controladores correspondientes
router.get("/games", getGames);
router.get("/games/top3", getTop3Games);
router.get("/games/freegames", getRandomGames);
router.get("/games/all", getAllGames);
router.get("/details/:gamesId", getOneGame)
router.get("/games/:order", getGamesOrder);


module.exports = router;