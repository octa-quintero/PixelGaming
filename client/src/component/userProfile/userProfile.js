import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile, logout } from '../../redux/action.js';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
        faUser,
        faPenToSquare,
        faX,
        faPaperclip,
        faKey,
        faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

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

import style from './userProfileStyle.module.css';

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.userProfile);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);

  const { userId } = useParams();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    // Actualizar el estado de los datos editados cuando el perfil de usuario cambia
    setEditedData({
      name: userProfile.name,
      last_name: userProfile.last_name,
      name_user: userProfile.name_user,
      email: userProfile.email,
    });
  }, [userProfile]);

  const handleEditToggle = () => {
    if (isEditing) {
      dispatch(updateUserProfile(userId, editedData));
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    // Actualizar el estado de los datos editados al cambiar un campo
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    // Restablecer los datos editados a los valores originales del perfil
    setEditedData({
      name: userProfile.name,
      last_name: userProfile.last_name,
      name_user: userProfile.name_user,
      email: userProfile.email,
    });

    setIsEditing(false);
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar.image);
    setEditedData({ ...editedData, avatar: avatar.image });
  };

  const fields = [
    { name: 'Nombre', key: 'name' },
    { name: 'Apellido', key: 'last_name' },
    { name: 'Usuario', key: 'name_user' },
    { name: 'Correo Electrónico', key: 'email' },
  ];

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
    <div className={style.userProfileContainer}>
      <div className={style.userContent}>
        <div className={style.content}>
          <h1 className={style.title}><FontAwesomeIcon icon={faUser} />Configuración de la Cuenta</h1>
          <div className={style.bienvenido}>
            <h2>Bienvenido</h2>
            <h1 className={style.text1}>
              {userProfile.name_user}
              <img src={userProfile.avatar} alt="Avatar" className={style.avatarImage} />
            </h1>
          </div>
        </div>
        <h1 className={style.textInfo}><FontAwesomeIcon icon={faPaperclip} />Nos tomamos en serio tu privacidad. Puedes
          estar seguro de que tus datos están protegidos. Para mantener la confidencialidad de tu cuenta,
          evita compartir información con terceros.</h1>
        {userProfile && (
          <div className={style.info}>
            {fields.map((field) => (
              <h4 key={field.key} className={style.field}>
                <span className={style.fieldName}>{field.name}</span>
                {isEditing ? (
                  <input
                    type="text"
                    name={field.key}
                    value={editedData[field.key]}
                    onChange={handleInputChange}
                    onClick={() => setEditedData({ ...editedData, [field.key]: '' })}
                    onBlur={() => {
                      if (editedData[field.key] === '') {
                        setEditedData({ ...editedData, [field.key]: userProfile[field.key] });
                      }
                    }}
                    className={style.editInput}
                    placeholder={field.placeholder}
                    />
                ) : (
                  userProfile[field.key]
                )}
              </h4>
            ))}
            <NavLink to={`/forgot-password/${userProfile.email}`} className={style.btnRegistro} target="_blank">
              <h1>Actualizar Contraseña<FontAwesomeIcon icon={faKey} /></h1>
            </NavLink>
        <h1
          className={style.avatarSelect}
          onClick={() => setShowAvatarSelection(!showAvatarSelection)} // Cambio aquí
          >
          Editar Avatar<FontAwesomeIcon icon={faPenToSquare}/><img src={userProfile.avatar} alt="Avatar" className={style.avatarImage} />
        </h1>
        {showAvatarSelection && (
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
                />
              </div>
            ))}
          </div>
        )}
          </div>
        )}
        <div className={style.editButtonContainer}>
          <button onClick={handleEditToggle} className={style.cardBtn}>
            {isEditing ? (
              <>
                Guardar{'  '}<FontAwesomeIcon icon={faPenToSquare} />
              </>
            ) : (
              <>
                Editar Informacion<FontAwesomeIcon icon={faPenToSquare} />
              </>
            )}
          </button>
          {isEditing && (
            <button onClick={handleCancel} className={style.cardBtn}>
              Cancelar  <FontAwesomeIcon icon={faX} />
            </button>
          )}
          <button onClick={handleLogout} className={style.logoutBtn}>
            Logout<FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;