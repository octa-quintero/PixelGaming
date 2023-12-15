const { Games, Users } = require("../db");

const addFavoriteGame = async (req, res) => {
  try {
    const userId = req.body.userId;
    const gameId = req.params.gameId;

    console.log("Adding favorite game. UserId:", userId, "GameId:", gameId);

    const user = await Users.findByPk(userId);

    if (!user) {
      console.error('Usuario no encontrado');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const game = await Games.findByPk(gameId);

    if (!game) {
      console.error('Juego no encontrado');
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    const isGameInFavorites = user.favoriteGames.includes(game.id);

    let updatedFavorites;
    if (isGameInFavorites) {
      updatedFavorites = user.favoriteGames.filter((favGameId) => favGameId !== game.id);
    } else {
      updatedFavorites = [...user.favoriteGames, game.id];
    }

    await user.update({
      favoriteGames: updatedFavorites,
    });

    const updatedUser = await Users.findByPk(userId, {
      include: [{ model: Games, as: 'userFavoriteGames' }],
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(`Error al actualizar juegos favoritos: ${error.message}`);
    res.status(500).json({ error: `Error al actualizar juegos favoritos: ${error.message}` });
  }
};

const checkGameInLibrary = async (req, res) => {
  try {
    const userId = req.params.userId;
    const gameId = req.params.gameId;

    const user = await Users.findByPk(userId);

    if (!user) {
      console.error('Usuario no encontrado');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isGameInLibrary = user.favoriteGames.includes(parseInt(gameId, 10));
    const response = { isGameInLibrary };

    console.log("Response sent:", response);

    res.status(200).json(response);
  } catch (error) {
    console.error(`Error al verificar el juego en la biblioteca: ${error.message}`);
    res.status(500).json({ error: `Error al verificar el juego en la biblioteca: ${error.message}` });
  }
};

const getFavoriteGames = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("ID del usuario:", userId);

    const user = await Users.findByPk(userId);

    if (!user) {
      console.error('Usuario no encontrado');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Utiliza la información ya presente en la base de datos
    const favoriteGamesIds = user.favoriteGames || [];

    // Consulta directa para obtener la información completa de los juegos favoritos
    const favoriteGames = await Games.findAll({
      where: {
        id: favoriteGamesIds,
      },
    });

    console.log("Datos de juegos favoritos:", favoriteGames);

    res.status(200).json({ favoriteGames });
  } catch (error) {
    console.error(`Error al obtener juegos favoritos: ${error.message}`);
    res.status(500).json({ error: `Error al obtener juegos favoritos: ${error.message}` });
  }
};





module.exports = { addFavoriteGame, checkGameInLibrary, getFavoriteGames};
