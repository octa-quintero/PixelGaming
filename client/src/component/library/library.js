import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import {
  getFavoriteGames,
  addGameToLibrary,
  removeGameFromLibrary, // Agrega esta importación
} from '../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faComputer, faGlobe, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import style from "./libraryStyle.module.css";
import Heart from "../../assets/pixelArt/heart.png"
import biblioteca from '../../assets/pixelArt/library.gif';

function Library() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const parsedUserId = parseInt(userId, 10);
  const favoriteGames = useSelector(state => state.favoriteGames);

  useEffect(() => {
    dispatch(getFavoriteGames(parsedUserId));
  }, [dispatch, parsedUserId]);

  const handleAddToLibrary = async (gameId) => {
    if (favoriteGames) {
      const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este juego de tus favoritos?");
      if (confirmDelete) {
        await dispatch(addGameToLibrary({ userId: parsedUserId, gameId })); // Usa la acción para eliminar el juego
        dispatch(getFavoriteGames(parsedUserId)); // Actualiza la lista después de eliminar el juego
      }
    } else {
      await dispatch(addGameToLibrary({ userId: parsedUserId, gameId }));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1 className={style.title1}>
          <FontAwesomeIcon icon={faLayerGroup} />Biblioteca
        </h1>
        <h1 className={style.textInfo}><FontAwesomeIcon icon={faPaperclip} />{' '} Agrega y elimina juegos cuando quieras!
        Experimenta la libertad de construir tu colección perfecta. Para una experiencia sin restricciones explora nuestras
        opciones premium y lleva tu biblioteca al siguiente nivel.</h1>
        <div className={style.cards}>
          <div className={style.cardContent}>
            {favoriteGames.map((games, index) => (
              <div
                key={games.id}
                to={`/games/${games.id}`}
                className={style.cardContent1}
                id={games.id}
              >
                <NavLink
                  key={games.id}
                  to={`/games/${games.id}`}
                  id={games.id}
                  className={style.cardImage2}>
                  <img src={games.thumbnail} alt={games.title} className={style.cardImage}/>
                </NavLink>
                <div className={style.content1}>
                  <h2 className={style.title}>
                    {games.title}
                    <div className={style.cardNumbertHeart}>
                      <h4 className={style.cardNumber}>{index + 1}</h4>
                      <img
                        src={Heart}
                        className={ style.heartInLibrary}
                        alt="Favorite"
                        onClick={() => handleAddToLibrary(games.id)}
                      />
                    </div>
                  </h2>
                  <h3 className={style.shortDescription}>{games.short_description}</h3>
                  <h3 className={style.publisher}>Publicado: {games.publisher}</h3>
                  <h3 className={style.developer}>Desarrollo: {games.developer}</h3>
                  <h3 className={style.releaseDate}>Publicado: {games.release_date}</h3>
                  <div className={style.plattformButton}>
                    <h4 className={style.genre}>{games.genre}</h4>
                    <div className={style.icon}>
                      {games.platform.includes('PC') ? (
                        <FontAwesomeIcon icon={faComputer} />
                      ) : games.platform.includes('Web') ? (
                        <FontAwesomeIcon icon={faGlobe} />
                      ) : (
                        games.platform
                      )}
                    </div>
                    <a href={games.game_url} className={style.cardBtn}>
                      ¡Jugar ahora!
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={style.content2}>
        <img src={biblioteca} alt="Biblioteca" />
      </div>
    </div>
  );
}

export default Library;
