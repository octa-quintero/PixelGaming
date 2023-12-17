import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getFavoriteGames } from '../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from 'react-router-dom';
import { faLayerGroup, faComputer, faGlobe, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import {
  addGameToLibrary,
  checkGameInLibrary
} from '../../redux/action.js';
import style from "./libraryStyle.module.css";
import Heart from "../../assets/pixelArt/heart.png"
import biblioteca from '../../assets/pixelArt/library.gif';

function Library() {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = parseInt(location.pathname.split("/")[2], 10);
  const favoriteGames = useSelector(state => state.favoriteGames);
  const gameInfo = useSelector(state => state.gameDetail);
  const isGameInLibrary = useSelector(state => state.isGameInLibrary)

  useEffect(() => {
    dispatch(getFavoriteGames(userId));
  }, [dispatch, userId]);

  const handleAddToLibrary = async () => {
    await dispatch(addGameToLibrary({ userId: userId.id, gameId: gameInfo.id }));
    await dispatch(checkGameInLibrary({ userId: userId.id, gameId: gameInfo.id }));
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
                            <NavLink
              key={games.id}
              to={`/games/${games.id}`}
              className={style.cardContent1}
              id={games.id}
            >
                <img src={games.thumbnail} alt={games.title} className={style.cardImage} />
                <div className={style.content1}>
                  <h2 className={style.title}>
                    {games.title}
                    <div className={style.cardNumbertHeart}>
                    <h4 className={style.cardNumber}>{index + 1}</h4>
                    <img
                    src={Heart}
                    className={isGameInLibrary ? style.heartInLibrary : style.heart}
                    alt="Favorite"
                    onClick={handleAddToLibrary}
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
              </NavLink>
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
