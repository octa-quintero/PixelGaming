import axios from "axios";

// Acciones asincrónicas para obtener países ordenados
export function getGames(order, page) {
  return dispatch => {
    axios.get(`/games/${order}?page=${page}`)
    .then(response => {
        console.log(response);
        dispatch({ type: "GET_GAMES_ORDER", payload: response.data });
      })
      .catch(error => {
        console.error("Error occurred:", error);
        dispatch({ type: "GET_GAMES_ORDER_ERROR", payload : error.message });
      });
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

// Acciones asincrónicas para obtener Top 3 Juegos
export function getRandomGames() {
  return (dispatch) => {
    return axios.get("/games/freegames")
      .then((response) => {
        console.log(response.data); // Agrega esto para verificar los datos
        dispatch({ type: "GET_FREE_GAMES", payload: response.data });
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        dispatch({ type: "GET_FREE_GAMES_ERROR", payload: error.message });
      });
  };
}

// Acciones asincrónicas para obtener todos los países
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

// Acciones asincrónicas para filtrar países por continente
export function sortCountriesContinent(continent) {
  return dispatch => {
    axios.get("/countries/all")
      .then(response => {
        dispatch({ type: "SORT_COUNTRIES_CONTINENT", payload: response.data, continent: continent });
      })
      .catch(error => {
        console.error("Error occurred:", error);
        dispatch({ type: "SORT_COUNTRIES_CONTINENT_ERROR", payload: error.message });
      });
  };
}

// Acciones asincrónicas para filtrar países por actividad
export function sortCountriesActivity(activity) {
  return dispatch => {
    axios.get("/countries/all")
      .then(response => {
        dispatch({ type: "SORT_COUNTRIES_ACTIVITY", payload: response.data, activity: activity });
      })
      .catch(error => {
        console.error("Error occurred:", error);
        dispatch({ type: "SORT_COUNTRIES_ACTIVITY_ERROR", payload: error.message });
      });
  };
}

// Acciones asincrónicas para obtener países paginados
export function getCountries(page) {
  return dispatch => {
    axios.get(`/countries?page=${page}`)
      .then(response => {
        dispatch({ type: "GET_COUNTRIES", payload: response.data });
      })
      .catch(error => {
        console.error("Error occurred:", error);
        dispatch({ type: "GET_COUNTRIES_ERROR", payload: error.message });
      });
  };
}


// Acciones asincrónicas para obtener el detalle de un país por ID
export function getCountryId(id) {
  return dispatch => {
    console.log("Fetching country details for id:", id);
    
    axios.get(`/details/${id}`)
      .then(response => {
        console.log("Info:", response.data);
        dispatch({ type: "GET_COUNTRY_ID", payload: response.data });
      })
      .catch(error => {
        console.error("Error occurred:", error);
        dispatch({ type: "GET_COUNTRY_ID_ERROR", payload: error.message });
      });
  };
}

// Acciones asincrónicas para crear una nueva actividad
export function createActivity(values) {
  return dispatch => {
    axios.post("/activity", values)
      .then(response => {
        dispatch({ type: "CREATE_ACTIVITY", payload: response.data });
      })
      .catch(error => {
        console.error("Error occurred:", error);
        dispatch({ type: "CREATE_ACTIVITY_ERROR", payload: error.message });
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
export const removeCountries = () => ({
  type: "REMOVE_COUNTRIES"
});

// Acciones para remover el detalle de un país
export const removeCountry = () => ({
  type: "REMOVE_COUNTRY"
});
  