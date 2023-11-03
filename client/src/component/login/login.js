import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faUser,
          faLock } from '@fortawesome/free-solid-svg-icons';
import style from './loginStyle.module.css';
import GameFan from "../../assets/login/login.gif";

function Login() {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    name_user: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(login(credentials));
  
      // Verifica si la respuesta contiene un token
      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
  
        setCredentials({
          name_user: '',
          password: '',
        });
      } else {
        console.error('La respuesta del servidor no contiene un token válido.');
        // Agrega lógica para mostrar un mensaje de error al usuario si es necesario
      }
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
      // Agrega lógica para mostrar el mensaje de error al usuario si es necesario
    }
  };
  

  return (
    <div className={style.loginContainer}>
      <div className={style.gameBoyContent}>
        <img src={GameFan} className={style.GameBoy}/>
      </div>
      <form onSubmit={handleSubmit} className={style.formContent}>
        <h1 className={style.text}><FontAwesomeIcon icon={faUser} />Inicia Sesión</h1>
        <div className={style.label}>
          <input
            type="text"
            name="name_user"
            value={credentials.name_user}
            onChange={handleInputChange}
            placeholder="Nombre de Usuario"
          />
        </div>
        <div className={style.label}>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Contraseña"
          />
        </div>
        <button type="submit" className={style.cardBtn}>GO!</button>
      </form>
    </div>
  );
}

export default Login;
