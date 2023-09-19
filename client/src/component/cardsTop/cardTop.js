import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTop3Games } from '../../redux/action';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRobot,
        faCrown } from '@fortawesome/free-solid-svg-icons'
import style from './cardTopStyle.module.css';

function CardsTop() {
  const dispatch = useDispatch();
  const topGames = useSelector((state) => state.games) || []; // Inicializa como un array vacío

  useEffect(() => {
    dispatch(getTop3Games())
      .then((response) => {
        console.log('Datos cargados correctamente:', response);
      })
      .catch((error) => {
        console.error('Error al obtener el top 3 de juegos:', error);
      });
  }, [dispatch]);

  console.log('Renderizando topGames:', topGames);

  return (
    <div className={style.cardsTopContainer}>
      <div className={style.cards}>
          <h1 className={style.text}><FontAwesomeIcon className={style.nameIcon} icon={faCrown} />{' '}Top recomendados por la comunidad</h1>
        <div className={style.cardContent}>
        {topGames.map((game) => (
            <div className={style.cardContent1} key={game.id}>
              <img src={game.thumbnail} alt={game.title} className={style.cardImage}/>
                <div className={style.title}>
                  <h2 className={style.cardTitle}>{game.title}</h2>
                  <a href={game.game_url} className={style.cardBtn}>Play Now!</a>
                </div>
            </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default CardsTop;
