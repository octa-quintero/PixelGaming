import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTop10Games } from '../../../redux/action.js';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCrown,
  faComputer,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import style from './cardsStyle.module.css';

function Top2023() {
  const dispatch = useDispatch();
  const top10Games = useSelector((state) => state.top10Games) || [];

  useEffect(() => {
    dispatch(getTop10Games());
  }, [dispatch]);

  return (
    <div className={style.cardsGamesContainer}>
      <div className={style.cards}>
        <div className={style.text}>
          <h1>
            <span><FontAwesomeIcon icon={faCrown} /></span>{' '}
            Top Games 2023
          </h1>
          <p>
            Descubre 10 juegos gratuitos más populares de septiembre,
            clasificados según las preferencias de nuestros usuarios. Actualizamos nuestra lista constantemente...
          </p>
        </div>
        <div className={style.cardContent}>
          {top10Games.map((game, index) => (
            <NavLink
              key={game.id}
              to={`/games/${game.id}`}
              className={style.cardContent1}
              id={game.id}
            >
              <img src={game.thumbnail} alt={game.title} className={style.cardImage} />
              <div className={style.content}>
                <h2 className={style.title}>
                  {game.title}
                  <span className={style.cardNumber}>{index + 1}</span>
                </h2>
                <h3 className={style.shortDescription}>{game.short_description}</h3>
                <h3 className={style.publisher}>Publicado: {game.publisher}</h3>
                <h3 className={style.developer}>Desarrollo: {game.developer}</h3>
                <h3 className={style.releaseDate}>Publicado: {game.release_date}</h3>
                <div className={style.plattformButton}>
                  <h4 className={style.genre}>{game.genre}</h4>
                  <div className={style.icon}>
                    {game.platform.includes('PC') ? (
                      <FontAwesomeIcon icon={faComputer} />
                    ) : game.platform.includes('Web') ? (
                      <FontAwesomeIcon icon={faGlobe} />
                    ) : (
                      game.platform
                    )}
                  </div>
                  <a href={game.game_url} className={style.cardBtn}>
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

export default Top2023;
