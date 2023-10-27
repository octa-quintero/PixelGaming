import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../redux/action.js';
import style from './registerStyle.module.css';

// Importa tus avatares aquí
import Duck from "../../../assets/usersPixelArt/duck.png";
import Ghost from "../../../assets/usersPixelArt/ghost.png";
import Ghost1 from "../../../assets/usersPixelArt/ghost1.png";
import Cat from "../../../assets/usersPixelArt/cat.png";
import Flower from "../../../assets/usersPixelArt/flower.png";
import Picachu from "../../../assets/usersPixelArt/picachu.png";
import Skull from "../../../assets/usersPixelArt/skull.png";
import Ufo from "../../../assets/usersPixelArt/ufo.png";
import Fungus from "../../../assets/usersPixelArt/fungus.png";

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
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setUser({ ...user, avatar });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createUser(user));
  };

  // Array de campos para el formulario
  const formFields = [
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'last_name', label: 'Apellido', type: 'text' },
    { name: 'name_user', label: 'Nombre de usuario', type: 'text' },
    { name: 'password', label: 'Contraseña', type: 'password' },
    { name: 'email', label: 'Correo electrónico', type: 'email' }
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
    { name: 'Fungus', image: Fungus }
  ];

  return (
    <div className={style.loginContainer}>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={user[field.name]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <form onSubmit={handleSubmit}>
        <div className={style.avatarSelection}>
          {avatarImages.map((avatar, index) => (
            <div
              key={index}
              className={`${style.avatarOption}`}
              onClick={() => handleAvatarSelect(avatar.image)}
            >
              <img
                src={avatar.image}
                alt={avatar.name}
                className={style.avatarImage}
              />
            </div>
          ))}
        </div>
      </form>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
