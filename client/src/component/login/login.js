import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { login } from '../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faUser } from '@fortawesome/free-solid-svg-icons';
import style from './loginStyle.module.css';
import GameFan from "../../assets/login/login.gif";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      await dispatch(login(credentials));
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
    }
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.gameBoyContent}>
        <img src={GameFan} alt='GameBoy' className={style.GameBoy}/>
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
