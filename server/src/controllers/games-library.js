const { Games, Users, Review } = require("../db");

// Agregar o quitar juego de la biblioteca personal del usuario
const manageLibrary = async (req, res, next) => {
  try {
    console.log("Managing game in library...");

    const { userId, gameId, action } = req.body;
    console.log("Data OK:", req.body);

    // Validar que el usuario y el juego existan antes de manipular la biblioteca
    const user = await Users.findByPk(userId);
    const game = await Games.findByPk(gameId);

    if (!user || !game) {
      return res.status(404).json({ error: "Usuario o juego no encontrado" });
    }

    // Obtener la lista de juegos favoritos del usuario
    let favoriteGames = user.favoriteGames || [];

    // Verificar si el juego ya está en la lista de favoritos del usuario
    const isInFavorites = favoriteGames.includes(gameId);

    if (action === "add") {
      // Agregar el juego a la lista de favoritos del usuario si no está presente
      if (!isInFavorites) {
        favoriteGames.push(gameId);
        await user.update({ favoriteGames });
        console.log("Game added to favorites");
        res.status(201).json({ message: "Game added to favorites" });
      } else {
        res.status(400).json({ error: "El juego ya está en la lista de favoritos del usuario" });
      }
    } else if (action === "remove") {
      // Quitar el juego de la lista de favoritos del usuario si está presente
      if (isInFavorites) {
        favoriteGames = favoriteGames.filter((id) => id !== gameId);
        await user.update({ favoriteGames });
        console.log("Game removed from favorites");
        res.status(200).json({ message: "Game removed from favorites" });
      } else {
        res.status(400).json({ error: "El juego no está en la lista de favoritos del usuario" });
      }
    } else {
      res.status(400).json({ error: "Acción no válida. Use 'add' o 'remove'" });
    }
  } catch (error) {
    console.error('Error al gestionar juego en la biblioteca:', error);
    res.status(500).json({ error: 'Error al gestionar juego en la biblioteca' });
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

// Controlador para verificar si un juego está en la biblioteca del usuario logueado
const gameInLibrary = async (req, res, next) => {
  try {
    console.log("Verifying if game is in library...");

    const { gameId } = req.params; // Obtener el ID del juego de la URL
    const userId = req.user.userId; // Obtener el ID del usuario del token

    // Validar que el usuario y el juego existan antes de realizar la verificación
    const user = await Users.findByPk(userId);
    const game = await Games.findByPk(gameId);

    if (!user || !game) {
      return res.status(404).json({ error: "Usuario o juego no encontrado" });
    }

    // Verificar si el juego está en la biblioteca del usuario
    const isInLibrary = await user.hasGame(game);

    res.status(200).json({ isInLibrary });
  } catch (error) {
    console.error('Error al verificar juego en la biblioteca:', error);
    res.status(500).json({ error: 'Error al verificar juego en la biblioteca' });
    next(error);
  }
};


module.exports = { manageLibrary, getUserLibrary, gameInLibrary };
