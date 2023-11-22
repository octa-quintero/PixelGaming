import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faUser } from '@fortawesome/free-solid-svg-icons';
import style from './loginStyle.module.css';
import GameFan from "../../assets/login/login.gif";

import Duck from "../../assets/usersPixelArt/duck.png";
import Ghost from "../../assets/usersPixelArt/ghost.png";
import Ghost1 from "../../assets/usersPixelArt/ghost1.png";
import Cat from "../../assets/usersPixelArt/cat.png";
import Flower from "../../assets/usersPixelArt/flower.png";
import Picachu from "../../assets/usersPixelArt/picachu.png";
import Skull from "../../assets/usersPixelArt/skull.png";
import Ufo from "../../assets/usersPixelArt/ufo.png";
import Fungus from "../../assets/usersPixelArt/fungus.png";
import Kirby from "../../assets/usersPixelArt/kirby.png";
import Charizard from "../../assets/usersPixelArt/charizard.png";
import Computer from "../../assets/usersPixelArt/computer.png";
import Espada from "../../assets/usersPixelArt/espada.png";
import GameVoy from "../../assets/usersPixelArt/gameboy.png";
import Hamburguer from "../../assets/usersPixelArt/hamburguer.png";
import Pacman from "../../assets/usersPixelArt/pacman.png";
import Pizza from "../../assets/usersPixelArt/pizza.png";
import Superman from "../../assets/usersPixelArt/superman.png";

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
      await dispatch(login(credentials));
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
      // Agrega lógica para mostrar el mensaje de error al usuario si es necesario
    }
  };

  const avatarImages = [
    { name: 'Duck', image: Duck },
    { name: 'Ghost', image: Ghost },
    { name: 'Ghost1', image: Ghost1 },
    { name: 'Cat', image: Cat },
    { name: 'Flower', image: Flower },
    { name: 'Picachu', image: Picachu },
    { name: 'Skull', image: Skull },
    { name: 'Ufo', image: Ufo },
    { name: 'Fungus', image: Fungus },
    { name: 'Kirby', image: Kirby },
    { name: 'Pizza', image: Pizza },
    { name: 'Charizard', image: Charizard },
    { name: 'Pacman', image: Pacman},
    { name: 'Espada', image: Espada },
    { name: 'Superman', image: Superman },
    { name: 'Hamburguer', image: Hamburguer },
    { name: 'GameVoy', image: GameVoy },
    { name: 'Computer', image: Computer }
  ];

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
