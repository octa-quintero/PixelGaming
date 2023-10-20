import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGamesId } from '../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import style from './gameDetailStyle.module.css';

function GameDetail() {
  const dispatch = useDispatch();
  const gameInfo = useSelector(state => state.gameDetail);
  
  useEffect(() => {
    // Accede al `gameId` desde la URL actual, por ejemplo, utilizando window.location
    const pathname = window.location.pathname;
    const gameId = pathname.split('/games/')[1];

    if (gameId) {
      console.log("Dispatching getGamesId with gameId:", gameId);
      dispatch(getGamesId(gameId));
    }
  }, [dispatch]);

  console.log("GameDetail component rendered with gameInfo:", gameInfo);

  return (
    <div className={style.cardsGamesContainer}>
      <div className={style.cardContent1} key={gameInfo.id}>
        {gameInfo ? (
          <div className={style.cardContent}>
            <div className={style.image}>
              <img src={gameInfo.thumbnail} alt={gameInfo.title} className={style.cardImage} />
              <a href={gameInfo.game_url} className={style.cardBtn}>Play Now!</a>
            </div>  
            <div className={style.title}>
              <h2 className={style.cardTitle}>{gameInfo.title}</h2>
              <h3 className={style.description}>{gameInfo.short_description}</h3>
              <h3 className={style.shortDescription}>Publicado:<h3>{gameInfo.publisher}</h3></h3>
              <h3 className={style.shortDescription}>Desarrollo: <h3>{gameInfo.developer}</h3></h3>
              <h3 className={style.shortDescription}>Lanzamiento: <h3>{gameInfo.release_date}</h3></h3>
              <h3 className={style.shortDescription}>Genero: <h3>{gameInfo.genre}</h3></h3>
              <h3 className={style.shortDescription}>Plataforma: <h3>{gameInfo.platform}</h3></h3>
            </div>
          </div>
        ) : (
          <p>Loading game details...</p>
        )}
      </div>
    </div>
  );
}

export default GameDetail;
