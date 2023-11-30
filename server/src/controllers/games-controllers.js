const { Games, Users, Review, Op } = require("../db");
const axios = require("axios");


// Cargar datos de juegos desde una API externa
async function data() {
  try {
    const response = await axios.get("https://www.freetogame.com/api/games");
    const gamesData = response.data;

    console.log(gamesData.length);

    // Actualizar o insertar juegos en la base de datos
    const upsertPromises = gamesData.map((gamesData) => {
      return Games.upsert({
        id: gamesData.id,
        title: gamesData.title,
        thumbnail: gamesData.thumbnail,
        short_description: gamesData.short_description,
        game_url: gamesData.game_url,
        genre: gamesData.genre,
        platform: gamesData.platform,
        publisher: gamesData.publisher,
        release_date: gamesData.release_date,
        developer: gamesData.developer
      });
    });

    await Promise.all(upsertPromises);

    console.log("Registros creados o actualizados correctamente");
  } catch (error) {
    console.error("Error al obtener los datos de Juegos:", error);
    throw error;
  }
}

// Obtener todos los juegos
async function getAllGames(req, res, next) {
  try {
    const allGamesData = await Games.findAll();
    res.json(allGamesData);
  } catch (error) {
    next(error);
  }
}

// Controlador para la ruta GET
async function filterGamesByTagsAndPlatform(req, res, next) {
  try {
    const { tag, platform } = req.query; // Accede a los datos del cuerpo de la solicitud

    const apiUrl = `https://www.freetogame.com/api/filter?tag=${tag}&platform=${platform}`;

    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      const filteredGames = response.data;
      console.log("Juegos filtrados:", filteredGames);
      res.json(filteredGames);
    } else {
      throw new Error('No se pudo obtener la lista de juegos filtrados');
    }
  } catch (error) {
    next(error);
  }
}


// Obtener Top 10 Juegos
async function getTop10Games(req, res, next) {
  try {
    const response = await axios.get('https://www.freetogame.com/api/games?sort-by=relevance');
    
    if (response.status === 200) {
      const games = response.data.slice(0, 10); // Obtener los primeros 3 juegos
      res.json(games); // Enviar los juegos como respuesta al cliente
    } else {
      throw new Error('No se pudo obtener la lista de juegos');
    }
  } catch (error) {
    next(error); // Lanzar el error para que se maneje adecuadamente en un controlador Express u otro lugar
  }
}

// Obtener Top 3 Juegos
async function getTop3Games(req, res, next) {
  try {
    const response = await axios.get('https://www.freetogame.com/api/games?sort-by=relevance');
    
    if (response.status === 200) {
      const games = response.data.slice(0, 3); // Obtener los primeros 3 juegos
      res.json(games); // Enviar los juegos como respuesta al cliente
    } else {
      throw new Error('No se pudo obtener la lista de juegos');
    }
  } catch (error) {
    next(error); // Lanzar el error para que se maneje adecuadamente en un controlador Express u otro lugar
  }
}
// Obtener lista de 6 juegos Randoms
async function getRandomGames(req, res, next) {
  try {
    const response = await axios.get('https://www.freetogame.com/api/games?sort-by=popularity');
    
    if (response.status === 200) {
      const games = response.data; // Obtener todos los juegos
      shuffleArray(games); // Mezclar aleatoriamente la lista de juegos
      const randomGames = games.slice(0, 6); // Tomar los primeros 6 juegos de la lista aleatoria
      res.json(randomGames); // Enviar los juegos aleatorios como respuesta al cliente
    } else {
      throw new Error('No se pudo obtener la lista de juegos');
    }
  } catch (error) {
    next(error); // Lanzar el error para que se maneje adecuadamente en un controlador Express u otro lugar
  }
}

// Función para mezclar aleatoriamente un array (Fisher-Yates shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Obtener lista de juegos con paginación y búsqueda
async function getGames(req, res, next) {
  try {
    const { page, search } = req.query;
    const itemsPerPage = 10;

    let currentPage = page ? parseInt(page) : 1;
    let offset = (currentPage - 1) * itemsPerPage;

    let nameSearch = {};
    if (search) {
      nameSearch.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    const games = await Games.findAll({
      where: nameSearch,
      offset,
      limit: itemsPerPage,
    });

    return res.json(games);
  } catch (error) {
    next(error);
  }
}


// Obtener el detalle de un país en particular
async function getOneGame(req, res, next) {
  const { gameId } = req.params;
  console.log("gameId:", gameId);

  try {
    const game = await Games.findOne({
      where: { id: gameId },
    });

    if (!game) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }
    
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el detalle del juego" });
  }
}


module.exports = {
  getGames,
  getTop10Games,
  getTop3Games,
  getRandomGames,
  getAllGames,
  getOneGame,
  filterGamesByTagsAndPlatform,
  data
};

