import axios from '../config/axiosConfig.js'

export const resetPasswordSuccess = () => ({
  type: "RESET_PASSWORD_SUCCESS",
});

// Acción asíncrona para enviar la solicitud de restablecimiento de contraseña
export const resetPassword = ( resetToken , newPassword ) => async (dispatch) => {
  try {


    const response = await axios.put(`/reset-password/${ resetToken }`, { newPassword });

    if (response.status === 200) {
      dispatch(resetPasswordSuccess());
    } else {
      console.error('Error en la solicitud de restablecimiento de contraseña:', response.data.message);
    }
  } catch (error) {
    console.error('Error en la solicitud de restablecimiento de contraseña:', error.message);
  }
};

// Acción para indicar que el proceso de actualización de contraseña fue exitoso
export const refreshPasswordSuccess = () => ({
  type: "REFRESH_PASSWORD_SUCCESS",
});

// Acción asíncrona para enviar la solicitud de actualización de la contraseña
export const refreshPassword = ( refreshToken ) => async (dispatch) => {
  try {
    const response = await axios.put('/refresh-token', { refreshToken });
    if (response.status === 200) {
      dispatch(refreshPasswordSuccess());
    } else {
      console.error('Error en la solicitud de actualización de contraseña:', response.data.message);
    }
  } catch (error) {
    console.error('Error en la solicitud de actualización de contraseña:', error.message);
  }
};

// Acción para indicar que el proceso de olvido de contraseña fue exitoso
export const forgotPasswordSuccess = () => ({
  type: "FORGOT_PASSWORD_SUCCESS",
});
// Acción asíncrona para enviar la solicitud de olvido de contraseña
export const forgotPassword = (email) => async (dispatch) => {
  try {
    const response = await axios.put('/forgot-password', { email });
    if (response.status === 200) {
      dispatch(forgotPasswordSuccess());
    } else {
      console.error('Error en la solicitud de olvido de contraseña:', response.data.message);
    }
  } catch (error) {
    console.error('Error en la solicitud de olvido de contraseña:', error.message);
  }
};


// Acciones para crear usuario
export function createUser(user) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/users', user);
      dispatch({ type: "CREATE_USER", payload: response.data });
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };
}

// Acción para obtener los detalles del usuario
export function fetchUserProfile(userId) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`/user/${userId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const userData = response.data;
      dispatch({ type: "SET_USER_PROFILE", payload: userData });
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };
}


// Acción para manejar el inicio de sesión exitoso
export function loginSuccess(data) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: data,
  };
}

// Acción para manejar un error en el inicio de sesión
export function loginFailure(error) {
  return {
    type: 'LOGIN_FAILURE',
    payload: error,
  };
}

// Acción para iniciar sesión
export function login(credentials) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/login', credentials);
      console.log (response,'Funciona')
      const { token, user } = response.data;

      if (token) {
        dispatch(loginSuccess({ token, user }));
      } else {
        dispatch(loginFailure("Token no válido"));
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
}

// Acción para actualizar los detalles del usuario
export function updateUserProfile(userId, updatedUserData) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(`/user/${userId}`, updatedUserData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch({ type: "UPDATE_USER_PROFILE", payload: response.data });
      dispatch(fetchUserProfile(userId));
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };
}

// Acción para cerrar sesión
export function logout() {
  return {
    type: 'LOGOUT'
  };
}

// ACTIONS USERS // // ACTIONS USERS // // ACTIONS USERS // 


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
        dispatch({ type: "GET_GAME_ID", payload: response.data });
      })
      .catch(error => {
        console.error("Error occurred:", error);
        dispatch({ type: "GET_GAME_ID_ERROR", payload: error.message });
      });
  };
}

// Acción asincrónica para obtener la biblioteca de juegos de un usuario
export function getLibraryByUserId(userId) {
  return async dispatch => {
    try {
      const response = await axios.get(`/library/${userId}`);
      dispatch({ type: "GET_LIBRARY_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Error occurred:", error);
      dispatch({ type: "GET_LIBRARY_ERROR", payload: error.message });
    }
  };
}

// Acción asincrónica para agregar un juego a la biblioteca
export function addToLibrary(values) {
  return async dispatch => {
    try {
      const response = await axios.post("/library/add", values);
      dispatch({ type: "ADD_TO_LIBRARY_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Error occurred:", error);
      dispatch({ type: "ADD_TO_LIBRARY_ERROR", payload: error.message });
    }
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

// Acciones asincrónicas para obtener reseñas por ID de juego
export function getReviewsByGameId(gameId) {
  return dispatch => {
    axios.get(`/games/${gameId}/reviews`)
      .then(response => {
        console.log(response);
        dispatch({ type: "GET_REVIEWS", payload: response.data });
      })
      .catch(error => {
        console.error("Error occurred:", error);
        dispatch({ type: "GET_REVIEWS_ERROR", payload: error.message });
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
  