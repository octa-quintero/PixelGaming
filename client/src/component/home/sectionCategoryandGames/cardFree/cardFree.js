import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomGames } from '../../../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    dispatch(getRandomGames())
      .then((response) => {
        console.log('Datos cargados correctamente:', response);
      })
      .catch((error) => {
        console.error('Error al obtener juegos:', error);
      });
  }, [dispatch]);

  console.log('Renderizando topGames:', gamesFree);

  return (
    <div className={style.cardsGamesContainer}>
      <div className={style.cards}>
      <div className={style.text}>
          <h1><FontAwesomeIcon icon={faRobot}/>{' '}Juegos Gratis</h1>
      </div>
        <div className={style.cardContent}>
        {gamesFree.map((games) => (
          <div className={style.cardContent1} key={games.id}>
              <img src={games.thumbnail} alt={games.title} className={style.cardImage}/>  
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
            </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default CardFree;