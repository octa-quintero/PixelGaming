const { Games, Users } = require("../db");

const addFavoriteGame = async (req, res) => {
  try {
    const userId = req.body.userId;
    const gameId = req.params.gameId;

    console.log("Adding favorite game. UserId:", userId, "GameId:", gameId);

    // Busca al usuario en la base de datos
    const user = await Users.findByPk(userId);

    if (!user) {
      console.error('Usuario no encontrado');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Busca el juego en la base de datos
    const game = await Games.findByPk(gameId);

    if (!game) {
      console.error('Juego no encontrado');
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    // Añade el id del juego al array de juegos favoritos del usuario
    await user.update({
      favoriteGames: [...user.favoriteGames, game.id],
    });

    // Actualiza el usuario para reflejar el nuevo juego favorito
    const updatedUser = await Users.findByPk(userId, {
      include: [{ model: Games, as: 'userFavoriteGames' }],
    });

    console.log("Game added successfully. Updated user:", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(`Error al agregar juego favorito: ${error.message}`);
    res.status(500).json({ error: `Error al agregar juego favorito: ${error.message}` });
  }
};

module.exports = { addFavoriteGame };
