const { Router } = require ("express");
const router = Router();  // Crear instancia del router

// Importar controladores
const {
  createReview,
  getReviewsForGame
} = require("../controllers/reviews-controllers");

router.post("/reviews", createReview);
router.get("/games/:gameId/reviews", getReviewsForGame);

module.exports = router;
