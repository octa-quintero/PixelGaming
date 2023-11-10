import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/action';
import style from './userProfileStyle.module.css';

function UserProfile() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  return (
    <div className={style.userProfileContainer}>
      {userProfile && (
        <div>
          <h1>Nombre: {userProfile.name}</h1>
          <h1>Apellido: {userProfile.last_name}</h1>
          <h1>Nombre de Usuario: {userProfile.name_user}</h1>
          <h1>Correo Electrónico: {userProfile.email}</h1>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
