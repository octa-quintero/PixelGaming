// Estado inicial del store
const initialState = {
  games: [],
  freeGames: [],
  gameDetail: {},
  allGames: [],
  filteredGames: [],
};

// Reducer de Redux para manejar el estado global
function reducer(state = initialState, action) {
  switch (action.type) {

    case "GET_GAMES_ORDER":
    // Actualizar el estado con la lista de juegos ordenados
      return {
      ...state,
      games: action.payload
      };

    case "GET_TOP3_GAMES":
      // Actualizar el estado con la lista de los primeros 3 juegos
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

    case "GET_GAMES_ID":
      // Actualizar el estado con el detalle del juego
      return {
        ...state,
        gameDetail: action.payload
      };

    case "GET_ACTIVITIES":
      // Actualizar el estado con la lista de actividades turísticas
      return {
        ...state,
        activities: action.payload
      };

    case "CREATE_ACTIVITY":
      // Agregar una nueva actividad al estado
      return {
        ...state,
        activities: [...state.activities, action.payload],
        error: null,
      };

    case "CREATE_ACTIVITY_ERROR":
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
