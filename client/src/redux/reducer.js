  // Estado inicial del store
  const initialState = {
    games: [],
    token: null,
    user: null,
    userProfile: [],
    users: [],
    freeGames: [],
    gameDetail: {},
    allGames: [],
    filteredGames: [],
    reviews: [],
    getReviews: [],
    favoriteGames: [],
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false,
    refreshPasswordSuccess: false,
    library: [],
    isGameInLibrary: false,
    error: null,
  };

  // Reducer de Redux para manejar el estado global
  function reducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_FAVORITE_GAMES':
        return {
          ...state,
          favoriteGames: action.payload,
          error: null,
        };
      case 'GET_FAVORITE_GAMES_ERROR':
        return {
          ...state,
          favoriteGames: [],
          error: action.payload.error,
        };
      case 'CHECK_GAME_IN_LIBRARY_SUCCESS':
        return {
          ...state,
          isGameInLibrary: action.payload.isGameInLibrary,
          error: null,
        };
  
      case 'CHECK_GAME_IN_LIBRARY_ERROR':
        return {
          ...state,
          isGameInLibrary: false,
          error: action.payload.error,
        };
    case "ADD_GAME_TO_LIBRARY":
      return {
      ...state,
      library: [...state.library],
      };

      case "FORGOT_PASSWORD_SUCCESS":
        return {
          ...state,
          forgotPasswordSuccess: true,
        };
  
      case "RESET_PASSWORD_SUCCESS":
        return {
          ...state,
          resetPasswordSuccess: true,
        };
  
      case "REFRESH_PASSWORD_SUCCESS":
        return {
          ...state,
          refreshPasswordSuccess: true,
        };

      case "SET_USER_PROFILE":
      return {
        ...state,
        userProfile: action.payload,
      };

      case "UPDATE_USER_PROFILE":
        return {
          ...state,
          userProfile: action.payload,
        };

      case "GET_GAMES_ORDER":
      // Actualizar el estado con la lista de juegos ordenados
        return {
        ...state,
        games: action.payload
        };

        case "LOGIN_SUCCESS":
        localStorage.setItem("token", action.payload.token)
        return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        };

        case "LOGOUT":
        return {
          ...state,
            token: null,
            user: null,
          };

    case "CREATE_USER":
      return {
        ...state,
        users: [...state.users, action.payload]
      };

    case "GET_TOP3_GAMES":
      return {
        ...state,
        topGames: action.payload
      };

    case "GET_TOP10_GAMES":
      // Actualizar el estado con la lista de los primeros 3 juegos
      return {
      ...state,
      top10Games: action.payload
      };

    case "GET_ALL_GAMES":
      // Actualizar el estado con la lista de todos los juegos
      return {
      ...state,
      allGames: action.payload
    };

    case "GET_GAMES_BY_TAGS_PLATFORM":
      // Actualizar el estado con la lista de juegos filtrados por etiquetas y plataforma
      return {
      ...state,
      filteredGames: action.payload 
    };

    case "GET_GAMES_NAME":
      // Actualizar el estado con la lista de juegos por nombre u otro criterio
      return {
        ...state,
        gamesByName: action.payload
      };

    case "GET_FREE_GAMES":
      // Actualizar el estado con la lista de juegos gratis aleatorios
      return {
        ...state,
        freeGames: action.payload
      };

    case "GET_GAME_ID":
      // Actualizar el estado con el detalle del juego
      return {
        ...state,
        gameDetail: action.payload
      };

      case "GET_REVIEWS":
        // Actualizar el estado con la lista de reseñas
        return {
          ...state, // Copiar el estado actual
          reviews: action.payload, // Actualizar la propiedad de reseñas con los datos de la acción
        };

    case "CREATE_REVIEWS":
      // Agregar una nueva reviews al estado
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        error: null,
      };

    case "CREATE_REVIEWS_ERROR":
      // Manejar errores al crear actividades
      return {
        ...state,
        error: action.payload,
      };

    case "REMOVE_GAMES":
      // Limpiar la lista de juegos en el estado
      return {
        ...state,
        games: []
      };

    case "REMOVE_GAME":
      // Limpiar el detalle del juego en el estado
      return {
        ...state,
        gameDetail: {}
      };
    default:
      return state;
  }
}

export default reducer;
