import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "./reducer";
import axios from "axios";
axios.defaults.baseURL =  "http://localhost:3001";

// Configuración del store de Redux utilizando configureStore
const store = configureStore({
  reducer, // Reducer raíz
  middleware: [thunk], // Middleware de Redux Thunk
  devTools: true, // Activar herramientas de desarrollo de Redux
});

export default store;

