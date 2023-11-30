const { Games, Users, Review } = require("../db");

// Agregar juego a la biblioteca personal del usuario
const addToLibrary = async (req, res, next) => {
  try {
    console.log("Adding game to library...");

    const { userId, gameId } = req.body;
    console.log("Data OK:", req.body);

    // Validar que el usuario y el juego existan antes de agregar a la biblioteca
    const user = await Users.findByPk(userId);
    const game = await Games.findByPk(gameId);

    if (!user || !game) {
      return res.status(404).json({ error: "Usuario o juego no encontrado" });
    }

    // Verificar si el juego ya está en la biblioteca del usuario
    const isInLibrary = await user.hasGame(game);

    if (isInLibrary) {
      return res.status(400).json({ error: "El juego ya está en la biblioteca del usuario" });
    }

    // Agregar el juego a la biblioteca del usuario
    await user.addGame(game);

    console.log("Game added to library");

    res.status(201).json({ message: "Game added to library" });
  } catch (error) {
    console.error('Error al agregar juego a la biblioteca:', error);
    res.status(500).json({ error: 'Error al agregar juego a la biblioteca' });
    next(error);
  }
};

// Obtener la biblioteca de juegos de un usuario
const getUserLibrary = async (req, res, next) => {
  try {
    console.log("Getting user's game library...");

    const { userId } = req.params;
    console.log("User ID:", userId);

    // Validar que el usuario exista antes de obtener la biblioteca
    const user = await Users.findByPk(userId, {
      include: [{
        model: Games,
        attributes: ['id', 'title', 'thumbnail', 'short_description', 'game_url', 'genre','platform','publisher','release_date','developer']
      }]
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log("User's game library:", user.Games);

    res.status(200).json(user.Games);
  } catch (error) {
    console.error('Error al obtener la biblioteca del usuario:', error);
    res.status(500).json({ error: 'Error al obtener la biblioteca del usuario' });
    next(error);
  }
};

// Verificar si un juego está en la biblioteca del usuario
const isGameInLibrary = async (userId, gameId) => {
  try {
    const user = await Users.findByPk(userId, {
      include: [{
        model: Games,
        where: { id: gameId },
      }],
    });

    return !!user && user.Games.length > 0;
  } catch (error) {
    console.error('Error al verificar si el juego está en la biblioteca del usuario:', error);
    throw error;
  }
};


module.exports = { addToLibrary, getUserLibrary, isGameInLibrary };
