import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/action';
import { useParams } from 'react-router-dom'; // Asegúrate de importar useParams
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
        faUser} from '@fortawesome/free-solid-svg-icons';

import style from './userProfileStyle.module.css';

function UserProfile() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  // Cambia la obtención del userId usando useParams
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  return (
    <div className={style.userProfileContainer}>
      <div className={style.userContent}>
        <div className={style.content}>
        <h1 className={style.title}><FontAwesomeIcon icon={faUser} />Informacion de Cuenta</h1>
          <div className={style.bienvenido}>
            <h1 className={style.text1}>{userProfile.name_user}<img src={userProfile.avatar} alt="Avatar" className={style.avatarImage} /></h1>
          </div>
        </div>
          {userProfile && (
        <div className={style.info}>
          <h1><span className={style.fieldName}>Nombre:</span> {userProfile.name}</h1>
          <h1><span className={style.fieldName}>Apellido:</span> {userProfile.last_name}</h1>
          <h1><span className={style.fieldName}>Usuario:</span> {userProfile.name_user}</h1>
          <h1><span className={style.fieldName}>Correo Electrónico:</span> {userProfile.email}</h1>
          <h1><span className={style.fieldName}>Avatar:</span> <img src={userProfile.avatar} alt="Avatar" className={style.avatarImage} /></h1>
        </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
