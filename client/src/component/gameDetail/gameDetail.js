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
    <div>
      <div className={style.cardContent1} key={gameInfo.id}>
        {gameInfo ? (
          <div>
            <img src={gameInfo.thumbnail} alt={gameInfo.title} className={style.cardImage} />
            <div className={style.title}>
              <h2 className={style.cardTitle}>{gameInfo.title}</h2>
              <h3 className={style.shortDescription}>{gameInfo.short_description}</h3>
              <div className={style.platformButton}>
                <h4 className={style.genre}>{gameInfo.genre}</h4>
                <div className={style.icon}>
                  {gameInfo.platform && gameInfo.platform.includes('PC') ? (
                    <FontAwesomeIcon icon={faComputer} />
                  ) : gameInfo.platform && gameInfo.platform.includes('Web') ? ( 
                    <FontAwesomeIcon icon={faGlobe} />
                  ) : (
                    gameInfo.platform
                  )}
                </div>
                <a href={gameInfo.game_url} className={style.cardBtn}>Play Now!</a>
              </div>
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
