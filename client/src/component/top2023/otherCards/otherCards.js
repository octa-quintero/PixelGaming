import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRandomGames } from '../../../redux/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import style from './otherCardsStyle.module.css';

function OtherCards() {
  const dispatch = useDispatch();
  const freeGames = useSelector((state) => state.freeGames) || [];

  useEffect(() => {
    dispatch(getRandomGames())
      .then((response) => {})
      .catch((error) => {
        console.error('Error al obtener el top 3 de juegos:', error);
      });
  }, [dispatch]);

  return (
    <div className={style.cardsTopContainer}>
      <div className={style.cards}>
        <div className={style.textInfoCard}>
          <h1 className={style.textInfo}>
            <FontAwesomeIcon icon={faPaperclip} />{' '}
            Iniciar sesión te da acceso a la Biblioteca y a la comunidad de jugadores más grande de Latam
          </h1>
          <div className={style.masJuegos}>
            <h1 className={style.text}>
              <FontAwesomeIcon icon={faGamepad} />{' '}
              Descubre más juegos Gratis!
            </h1>
            <NavLink to="/games" className={style.btnRegistro}>
              <h1>Ver Mas</h1>
            </NavLink>
          </div>
        </div>
        <div className={style.cardContent}>
          {freeGames.slice(0, 3).map((game) => (
            <NavLink
              key={game.id}
              to={`/games/${game.id}`}
              className={style.cardContent1}
              id={game.id}
            >
              <img src={game.thumbnail} alt={game.title} className={style.cardImage} width="100%" height="200" />
              <div className={style.title}>
                <h2 className={style.cardTitle}>{game.title}</h2>
                <a href={game.game_url} className={style.cardBtn}>
                  Play Now!
                </a>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OtherCards;
