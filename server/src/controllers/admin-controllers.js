const { Games, Users, Op } = require("../db");

async function getAllUsers(req, res, next) {
  try {
    const allUsersData = await Users.findAll();
    res.json(allUsersData);
  } catch (error) {
    next(error);
  }
}

async function getAllGames(req, res, next) {
  try {
    const allGamesData = await Games.findAll();
    res.json(allGamesData);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  const { userId } = req.params;
  try {
    await Users.destroy({ where: { id: userId } });
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
}

async function deleteGame(req, res, next) {
  const { gameId } = req.params;
  try {
    await Games.destroy({ where: { id: gameId } });
    res.status(200).json({ message: 'Juego eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
}


module.exports = {
  deleteUser,
  getAllUsers,
  getAllGames,
  deleteGame
};
