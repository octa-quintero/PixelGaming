const { Games, Users, Review } = require("../db");
const axios = require("axios");


// Crear nueva reseña.
const createReview = async (req, res, next) => {
  try {
    console.log("Creating new review...");

    const { text, rating, gameId } = req.body;
    console.log("Data OK:", req.body);

    // Validar que el juego y el usuario existan antes de crear la reseña
    const game = await Games.findByPk(gameId);

    if (!game) {
      return res.status(404).json({ error: "Juego o usuario no encontrado" });
    }

    // Crear una nueva reseña en la base de datos
    const newReview = await Review.create({
      text,
      rating,
      GameId: gameId,  // Asignar gameId a la reseña
    });

    // Asociar la reseña al juego y al usuario
    await newReview.setGame(game);

    console.log("Review created:", newReview);

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error al crear Review:', error);
    res.status(500).json({ error: 'Error al crear Review' });
    next(error);
  }
};


// Obtener reseñas de un juego
const getReviewsForGame = async (req, res, next) => {
  try {
    const gameId = req.params.gameId; // Obtén el ID del juego de los parámetros de la ruta
    const game = await Games.findByPk(gameId);

    if (!game) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    const reviews = await Review.findAll({
      where: { GameId: gameId },
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error al obtener reseñas del juego:', error);
    res.status(500).json({ error: 'Error al obtener reseñas del juego' });
    next(error);
  }
};


module.exports = { 
  createReview,
  getReviewsForGame
};

