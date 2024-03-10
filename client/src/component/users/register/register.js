import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import {
        faUser} from '@fortawesome/free-solid-svg-icons';
import style from './registerStyle.module.css';

import GameBoy from "../../../assets/gameBoy/game_boy.gif";

import Duck from "../../../assets/usersPixelArt/duck.webp";
import Ghost from "../../../assets/usersPixelArt/ghost.webp";
import Ghost1 from "../../../assets/usersPixelArt/ghost1.webp";
import Cat from "../../../assets/usersPixelArt/cat.webp";
import Flower from "../../../assets/usersPixelArt/flower.webp";
import Picachu from "../../../assets/usersPixelArt/picachu.webp";
import Skull from "../../../assets/usersPixelArt/skull.webp";
import Ufo from "../../../assets/usersPixelArt/ufo.webp";
import Fungus from "../../../assets/usersPixelArt/fungus.webp";
import Kirby from "../../../assets/usersPixelArt/kirby.webp";
import Charizard from "../../../assets/usersPixelArt/charizard.webp";
import Computer from "../../../assets/usersPixelArt/computer.webp";
import Espada from "../../../assets/usersPixelArt/espada.webp";
import GameVoy from "../../../assets/usersPixelArt/gameboy.webp";
import Hamburguer from "../../../assets/usersPixelArt/hamburguer.webp";
import Pacman from "../../../assets/usersPixelArt/pacman.webp";
import Pizza from "../../../assets/usersPixelArt/pizza.webp";
import Superman from "../../../assets/usersPixelArt/superman.webp";

function Register() {
  const [user, setUser] = useState({
    name: '',
    last_name: '',
    name_user: '',
    password: '',
    email: '',
    avatar: null
  });

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setUser({ ...user, avatar });
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  if (user.password !== confirmedPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  try {
    await navigate('/login');
    alert('La cuenta fue creada con éxito');
    dispatch(createUser(user));
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    alert('Hubo un error al crear la cuenta');
  }


  setUser({
    name: '',
    last_name: '',
    name_user: '',
    password: '',
    email: '',
    avatar: null
  });
  setSelectedAvatar(null);
  setConfirmedPassword('');
};

  // Array de campos para el formulario
  const formFields = [
    { name: 'name', type: 'text', placeholder: 'Ingresa tu nombre' },
    { name: 'last_name', type: 'text', placeholder: 'Tu apellido' },
    { name: 'name_user', type: 'text', placeholder: 'Nombre de Usuario' },
    { name: 'password', type: 'password', placeholder: 'Contraseña' },
    { name: 'email', type: 'email', placeholder: 'Correo electrónico' }
  ];

  // Lista de nombres de archivo de avatares
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
        <img src={GameBoy} className={style.GameBoy} loading="lazy"/>
      </div>
      <form onSubmit={handleSubmit} className={style.loginContent}>
  <h1 className={style.text}><FontAwesomeIcon icon={faUser} />Crea Tu Cuenta</h1>
  {/* Renderiza los campos de entrada */}
  {formFields.map((field) => (
    <div key={field.name} className={style.label}>
      <input
        type={field.type}
        name={field.name}
        value={user[field.name]}
        onChange={handleInputChange}
        placeholder={field.placeholder}
      />
      {/* Agrega el campo de repetir contraseña si es necesario */}
      {field.name === 'password' && (
        <input
          type="password"
          name="confirmPassword"
          value={confirmedPassword}
          onChange={(event) => setConfirmedPassword(event.target.value)}
          placeholder="Repetir Contraseña"
        />
      )}
    </div>
  ))}
  <h1 className={style.avatarSelect}>Selecciona tu Avatar</h1>
  {/* Renderiza los avatares y el botón de envío */}
  <div className={style.avatarSelection}>
    {avatarImages.map((avatar, index) => (
      <div
        key={index}
        className={`${style.avatarOption} ${selectedAvatar === avatar.image ? style.selectedAvatar : ''}`}
        onClick={() => handleAvatarSelect(avatar.image)}
      >
        <img
          src={avatar.image}
          alt={avatar.name}
          className={style.avatarImage}
          loading="lazy"
        />
      </div>
    ))}
  </div>
  <button type="submit" className={style.cardBtn}>Unete Gratis!</button>
</form>
    </div>
  );
}

export default Register;
