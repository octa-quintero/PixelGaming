const { Games, Users, Op } = require("../db");
const axios = require("axios");

// Cargar datos de países desde una API externa
async function data() {
  try {
    const response = await axios.get("https://www.freetogame.com/api/games");
    const gamesData = response.data;

    console.log(gamesData.length);

    // Actualizar o insertar países en la base de datos
    const upsertPromises = gamesData.map((gamesData) => {
      return Games.upsert({
        id: gamesData.id,
        name: gamesData.title,
        image: gamesData.thumbnail,
        description: gamesData.short_description,
        game_url: gamesData.game_url,
        genre: gamesData.genre,
        platform: gamesData.platform,
        publisher: gamesData.publisher,
        release_date: gamesData.release_date
      });
    });

    await Promise.all(upsertPromises);

    console.log("Registros creados o actualizados correctamente");
  } catch (error) {
    console.error("Error al obtener los datos de Juegos:", error);
    throw error;
  }
}

// Obtener todos los países
async function getAllGames(req, res, next) {
  try {
    const allGamesData = await Games.findAll();
    res.json(allGamesData);
  } catch (error) {
    next(error);
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

async function getAllGames(req, res, next) {
  try {
    const allGamesData = await Games.findAll();
    res.json(allGamesData);
  } catch (error) {
    next(error);
  }
}

// Obtener el detalle de un país en particular
async function getOneGame(req, res, next) {
  const { gameId } = req.params;

  try {
    const games = await Games.findOne({
      where: { id: gameId },
      include: [
        {
          // model: TouristActivity,
          attributes: ['id', 'name', 'description', 'game_url', 'genre', 'platform', 'publisher', 'release_date'],
          through: { attributes: [] },
        },
      ],
    });

    if (!games) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }
    
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el detalle del juego" });
  }
}

// Obtener países con orden específico
async function getGamesOrder(req, res, next) {
  try {
    const { order } = req.params;
    const { page = 1 } = req.query;
    const itemsPerPage = 9;
    const offset = itemsPerPage * (page - 1);

    const dataCopy = [...(await Games.findAll())];
    let orderData;

    switch (order) {
      case "asc":
        orderData = dataCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "desc":
        orderData = dataCopy.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "genre":
        orderData = dataCopy.sort((a, b) => a.genre - b.genre);
        break;
      case "platform":
        orderData = dataCopy.sort((a, b) => a.platform - b.platform);
        break;
      default:
        throw new Error("Orden no válido");
    }

    const paginatedData = orderData.slice(offset, offset + itemsPerPage);

    const totalResults = dataCopy.length;

    res.json({ results: paginatedData, totalResults });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getGames,
  getTop3Games,
  getAllGames,
  getOneGame,
  getGamesOrder,
  data
};

