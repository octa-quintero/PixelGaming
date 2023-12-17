import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRandomGames } from '../../../../redux/action.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRobot,
  faComputer,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import style from './cardFreeStyle.module.css';

function CardFree() {
  const dispatch = useDispatch();
  const gamesFree = useSelector((state) => state.freeGames) || [];

  useEffect(() => {
    dispatch(getRandomGames());
  }, [dispatch]);

  return (
    <div className={style.cardsGamesContainer}>
      <div className={style.cards}>
        <div className={style.masJuegos}>
          <h1 className={style.text}>
            <FontAwesomeIcon className={style.crown} icon={faRobot} />
            Juegos gratis destacados
          </h1>
          <NavLink to="/games" className={style.btnRegistro}>
            <h1>Ver Más</h1>
          </NavLink>
        </div>
        <div className={style.cardContent}>
          {gamesFree.map((games) => (
            <NavLink
              key={games.id}
              to={`/games/${games.id}`}
              className={style.cardContent1}
              id={games.id}
            >
              <img src={games.thumbnail} alt={games.title} className={style.cardImage} />
              <div className={style.content}>
                <h2 className={style.title}>{games.title}</h2>
                <h3 className={style.shortDescription}>{games.short_description}</h3>
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
                    Play Now!
                  </a>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardFree;
