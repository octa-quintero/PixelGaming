import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAdmin, getAllGamesAdmin, deleteUser, deleteGame } from '../../redux/action.js';
import style from './adminStyle.module.css';

function Admin() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  const users = useSelector((state) => state.usersAdmin);
  const [isLoading, setIsLoading] = useState(true); // Agregar un estado para controlar la carga

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getAllUsersAdmin());
        await dispatch(getAllGamesAdmin());
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setIsLoading(false); 
      }
    }
    fetchData();
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleDeleteGame = (gameId) => {
    dispatch(deleteGame(gameId));
  };

  return (
    <div className={style.container}>
      <h1>Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar} alt="Avatar" className={style.avatar} /> {/* Muestra el avatar */}
            <div>
              <p>Nombre: {user.name}</p>
              <p>Nombre de usuario: {user.name_user}</p>
            </div>
            <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h1>Juegos</h1>
      <ul>
        {allGames.map((game) => (
          <li key={game.id}>
            {game.name}
            <button onClick={() => handleDeleteGame(game.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
