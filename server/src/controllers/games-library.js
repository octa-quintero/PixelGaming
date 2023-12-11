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

    // Actualiza el usuario para reflejar el nuevo juego favorito
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

    console.log("Received userId:", userId, "and gameId:", gameId);

    const user = await Users.findByPk(userId);

    if (!user) {
      console.error('Usuario no encontrado');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isGameInLibrary = user.favoriteGames.includes(gameId);

    console.log("Response sent:", { isGameInLibrary });

    res.status(200).json({ isGameInLibrary });
  } catch (error) {
    console.error(`Error al verificar el juego en la biblioteca: ${error.message}`);
    res.status(500).json({ error: `Error al verificar el juego en la biblioteca: ${error.message}` });
  }
};




module.exports = { addFavoriteGame, checkGameInLibrary};
