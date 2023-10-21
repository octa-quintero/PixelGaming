import axios from 'axios';


// Acciones para obtener filtrado avanzado
export function fetchGamesByTagsAndPlatform(tag, platform) {
  return async dispatch => {
    try {
      const response = await axios.get(`/games/filter?tag=${tag}&platform=${platform}`);
      console.log("Request to /games/filter was successful");
      dispatch({ type: "GET_GAMES_BY_TAGS_PLATFORM", payload: response.data });
    } catch (error) {
      console.error("Error occurred:", error);
      dispatch({ type: "FILTER_GAMES_BY_TAGS_PLATFORM_ERROR", payload: error.message });
    }
  };
}



// Acciones asincrónicas para buscar países por nombre
export function searchGames(name) {
  return dispatch => {
    axios.get(`/games?name=${name}`)
      .then(response => {
        dispatch({ type: "GET_GAME_NAME", payload: response.data });
      })
      .catch(error => {
        console.error("Error occurred:", error);
        dispatch({ type: "GET_GAME_NAME_ERROR", payload: error.message });
      });
  };
}

// Acciones asincrónicas para obtener Top 3 Juegos
export function getTop3Games() {
  return (dispatch) => {
    return axios.get("/games/top3")
      .then((response) => {
        console.log(response.data); // Agrega esto para verificar los datos
        dispatch({ type: "GET_TOP3_GAMES", payload: response.data });
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        dispatch({ type: "GET_TOP3_GAMES_ERROR", payload: error.message });
      });
  };
}

// Acciones asincrónicas para obtener Top 10 Juegos
export function getTop10Games() {
  return (dispatch) => {
    return axios.get("/games/top10")
      .then((response) => {
        console.log(response.data); // Agrega esto para verificar los datos
        dispatch({ type: "GET_TOP10_GAMES", payload: response.data });
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        dispatch({ type: "GET_TOP3_GAMES_ERROR", payload: error.message });
      });
  };
}


// Acciones asincrónicas para obtener Top 3 Juegos
export function getRandomGames() {
  return (dispatch) => {
    return axios.get("/games/freegames")
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "GET_FREE_GAMES", payload: response.data });
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        dispatch({ type: "GET_FREE_GAMES_ERROR", payload: error.message });
      });
    };
  }

export function getAllGames(page) {
  return dispatch => {
    axios.get("/games/all")
      .then(response => {
        dispatch({ type: "GET_ALL_GAMES", payload: response.data });
      })
      .catch(error => {
        console.error("Error occurred:", error);
        dispatch({ type: "GET_ALL_GAMES_ERROR", payload: error.message });
      });
    };
  }

// Acciones asincrónicas para obtener el detalle de un juego por ID
export function getGamesId(gameId) {
  return dispatch => {
    console.log("Fetching game details for id:", gameId);
    
    axios.get(`/games/${gameId}`)
      .then(response => {
        console.log("Info:", response.data);
        dispatch({ type: "GET_GAME_ID", payload: response.data });
      })
      .catch(error => {
        console.error("Error occurred:", error);
        dispatch({ type: "GET_GAME_ID_ERROR", payload: error.message });
      });
  };
}



// Acciones asincrónicas para crear una nueva reseña
export function createReview(values) {
  return dispatch => {
    axios.post("/reviews", values)
      .then(response => { 
        dispatch({ type: "CREATE_REVIEWS", payload: response.data });
      })
      .catch(error => {
        console.error("Error occurred:", error);
        dispatch({ type: "CREATE_REVIEWS_ERROR", payload: error.message });
      });
  };
}
// Acciones asincrónicas para obtener actividades
export function getActivities(order) {
  return dispatch => {
    axios.get(`/activities?order=${order}`)
      .then(response => {
        console.log(response);
        dispatch({ type: "GET_ACTIVITIES", payload: response.data });
      })
      .catch(error => {
        console.error("Error occurred:", error);
        dispatch({ type: "GET_ACTIVITIES_ERROR", payload: error.message });
      });
  };
}

// Acciones para remover la lista de países
export const removeGames = () => ({
  type: "REMOVE_COUNTRIES"
});

// Acciones para remover el detalle de un país
export const removeGame = () => ({
  type: "REMOVE_COUNTRY"
});
  