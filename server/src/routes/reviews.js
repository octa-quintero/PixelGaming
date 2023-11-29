const { Router } = require ("express");
const router = Router();  // Crear instancia del router

// Importar controladores
const {
  createReview,
  getReviewsForGameWithUserInfo,
} = require("../controllers/reviews-controllers");

router.post("/reviews", createReview);
router.get("/games/:gameId/reviews", getReviewsForGameWithUserInfo);

module.exports = router;
