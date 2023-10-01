import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";

const rootElement = document.getElementById('root');  
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
