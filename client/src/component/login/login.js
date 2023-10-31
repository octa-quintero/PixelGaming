import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/action.js'; // Asegúrate de importar la acción adecuadamente
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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(credentials));
    // Restablecer los campos después de enviar
    setCredentials({
      name_user: '',
      password: '',
    });
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
