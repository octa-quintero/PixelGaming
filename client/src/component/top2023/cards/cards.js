import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTop10Games } from '../../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
  faComputer,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import style from "./cardsStyle.module.css"

function Top2023() {
const dispatch = useDispatch();
const top10Games = useSelector((state) => state.top10Games) || []; // Inicializa como un array vacío

useEffect(() => {
  dispatch(getTop10Games())
    .then((response) => {
      console.log('Datos cargados correctamente:', response);
    })
    .catch((error) => {
      console.error('Error al obtener el top 10 de juegos:', error);
    });
  },[dispatch]);

  console.log('Renderizando top10Games:', top10Games);

  return (
    <div className={style.cardsGamesContainer}>
      <div className={style.cards}>
      <div className={style.text}>
          <h1><span><FontAwesomeIcon icon={faCrown}/></span>{' '}Top Games 2023</h1>
          <p>Descubre nuestros 10 juegos gratuitos más populares de septiembre de 2023,
            clasificados según las preferencias de nuestros usuarios. Actualizamos nuestra lista
            constantemente... </p>
      </div>
        <div className={style.cardContent}>
        {top10Games.map((games, index) => (
          <div className={style.cardContent1} key={games.id}>
              <img src={games.thumbnail} alt={games.title} className={style.cardImage} />  
                <div className={style.content}>
                  <h2 className={style.title}>{games.title}<span className={style.cardNumber}>{index + 1}</span></h2>
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

export default Top2023;