import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTop3Games } from '../../../redux/action';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import style from './cardTopStyle.module.css';

function CardsTop() {
  const dispatch = useDispatch();
  const topGames = useSelector((state) => state.topGames) || [];

  useEffect(() => {
    dispatch(getTop3Games());
  }, [dispatch]);

  return (
    <div className={style.cardsTopContainer}>
      <div className={style.cards}>
        <div className={style.textInfoCard}>
          <h1 className={style.textInfo}>
            <FontAwesomeIcon icon={faPaperclip} />{' '}
            Inicia sesión para acceder a tu Biblioteca. Descubre juegos totalmente gratis!
          </h1>
          <div className={style.masJuegos}>
            <h1 className={style.text}>
              <FontAwesomeIcon className={style.crown} icon={faCrown} />Top recomendados por la comunidad
            </h1>
            <NavLink to="/top2023" className={style.btnRegistro}>
              <h1>Ver Mas</h1>
            </NavLink>
          </div>
        </div>
        <div className={style.cardContent}>
          {topGames.map((game) => (
            <NavLink
              key={game.id}
              to={`/games/${game.id}`}
              className={style.cardContent1}
              id={game.id}
            >
              <img src={game.thumbnail} alt={game.title} className={style.cardImage} />
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

export default CardsTop;
