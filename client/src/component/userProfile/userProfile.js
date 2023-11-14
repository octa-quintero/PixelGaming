import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../../redux/action.js'; // Importa la acción updateUser
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
        faUser,
        faPenToSquare,
        faX,
        faPaperclip
} from '@fortawesome/free-solid-svg-icons';

import style from './userProfileStyle.module.css';

function UserProfile() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({}); // Estado para almacenar los datos editados

  const { userId } = useParams();

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
      // Si estamos en modo de edición, enviar los datos actualizados
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

  // Objeto con los nombres de campo y valores correspondientes
  const fields = [
    { name: 'Nombre', key: 'name' },
    { name: 'Apellido', key: 'last_name' },
    { name: 'Usuario', key: 'name_user' },
    { name: 'Correo Electrónico', key: 'email' },
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
          <h1 className={style.textInfo}><FontAwesomeIcon icon={faPaperclip} />{' '}Nos tomamos en serio tu privacidad. Puedes 
          estar seguro de que tus detalles están protegidos. Para mantener la confidencialidad de tu cuenta,
          evita compartir tu información con terceros.</h1>
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
                      // Restaurar el valor original si no se realizaron cambios
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
            <h1><span className={style.fieldName}>Avatar</span> <img src={userProfile.avatar} alt="Avatar" className={style.avatarImage} /></h1>
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
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
