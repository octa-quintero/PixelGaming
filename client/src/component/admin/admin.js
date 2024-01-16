import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAdmin, getAllGamesAdmin, deleteUser, deleteGame } from '../../redux/action.js';
import style from './adminStyle.module.css';

function Admin() {
  const dispatch = useDispatch();
  const gamesAdmin = useSelector((state) => state.gamesAdmin);
  const users = useSelector((state) => state.usersAdmin);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchGameTerm, setSearchGameTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getAllUsersAdmin());
        await dispatch(getAllGamesAdmin());
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }
    fetchData();
  }, [dispatch]);

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prevSelected =>
      prevSelected.includes(userId) ? prevSelected.filter((id) => id !== userId) : [...prevSelected, userId]
    );
  };

  const toggleGameSelection = (gameId) => {
    setSelectedGames(prevSelected =>
      prevSelected.includes(gameId) ? prevSelected.filter((id) => id !== gameId) : [...prevSelected, gameId]
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchGameChange = (event) => {
    setSearchGameTerm(event.target.value);
  };

  const handleDeleteSelectedUsers = () => {
    // Mostrar un cartel de confirmación antes de eliminar usuarios
    if (window.confirm('¿Estás seguro de que quieres eliminar los usuarios seleccionados?')) {
      selectedUsers.forEach((userId) => {
        dispatch(deleteUser(userId));
      });
      setSelectedUsers([]);
    }
  };

  const handleDeleteSelectedGames = () => {
    // Mostrar un cartel de confirmación antes de eliminar juegos
    if (window.confirm('¿Estás seguro de que quieres eliminar los juegos seleccionados?')) {
      selectedGames.forEach((gameId) => {
        dispatch(deleteGame(gameId));
      });
      setSelectedGames([]);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.name_user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGames = gamesAdmin.filter((game) => game.title.toLowerCase().includes(searchGameTerm.toLowerCase()));

  return (
    <div className={style.container}>
      <div className={style.contentButton}>
        <h1>Usuarios</h1>
        <input type="text" placeholder="Buscar usuarios..." value={searchTerm} onChange={handleSearchChange} />
        <button className={style.button1} onClick={handleDeleteSelectedUsers}>
          Eliminar seleccionados
        </button>
      </div>
      <ul className={style.container1}>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <div className={style.dates}>
              <span className={style.content}>
                <p className={style.names}>
                  <span className={style.boldText}>Nombre:</span> {user.name}
                </p>
                <p>
                  <span className={style.boldText}>Usuario:</span> {user.name_user}
                </p>
              </span>
              <input
                type="checkbox"
                onChange={() => toggleUserSelection(user.id)}
                checked={selectedUsers.includes(user.id)}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className={style.contentButton}>
        <h1>Juegos</h1>
        <input type="text" placeholder="Buscar juegos..." value={searchGameTerm} onChange={handleSearchGameChange} />
        <button className={style.button2} onClick={handleDeleteSelectedGames}>
          Eliminar seleccionados
        </button>
      </div>
      <ul className={style.container1}>
        {filteredGames.map((game) => (
          <li key={game.id}>
            <div className={style.dates}>
              <span className={style.content}>
                <p>
                  <span className={style.boldText}>Juego:</span> {game.title}
                </p>
              </span>
              <input
                type="checkbox"
                onChange={() => toggleGameSelection(game.id)}
                checked={selectedGames.includes(game.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
