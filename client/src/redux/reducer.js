// Estado inicial del store
const initialState = {
  games: [],
  activities: [],
  gamesDetail: {}
};

// Reducer de Redux para manejar el estado global
function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_GAMES_ORDER":
    case "GET_TOP3_GAMES":
    case "GET_ALL_GAMES":
    case "GET_GAMES_NAME":
      // Actualizar el estado con la lista de países
      return {
        ...state,
        games: action.payload
      };

    case "GET_GAMES_ID":
      // Actualizar el estado con el detalle del país
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

    case "REMOVE_COUNTRIES":
      // Limpiar la lista de países en el estado
      return {
        ...state,
        games: []
      };

    case "REMOVE_COUNTRY":
      // Limpiar el detalle del país en el estado
      return {
        ...state,
        gamesDetail: {}
      };

    default:
      return state;
  }
}

export default reducer;
