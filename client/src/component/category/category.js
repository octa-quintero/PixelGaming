import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from "react-router-dom";
import {
  getRandomGamesByCategory,
} from '../../redux/action.js';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer,
  faGlobe,
  faPaperclip,
  faPlay
} from '@fortawesome/free-solid-svg-icons';
import style from "./categoryStyle.module.css";
import biblioteca from '../../assets/pixelArt/library.gif';
import Cat from '../../assets/pixelArt/pixelCat.gif'
import horror from "../../assets/pixelArt/horror.gif"
import strategy from "../../assets/pixelArt/strategy.gif"
import racing from "../../assets/pixelArt/racing.gif"
import fighting from "../../assets/pixelArt/fighting.gif"

function Category() {
  const dispatch = useDispatch();
  const randomCategory = useSelector((state) => state.randomCategory) || [];
  const location = useLocation();
  const { categoryName } = useParams();
  const [paginaActual, setPaginaActual] = useState(1);
  const juegosPorPagina = 10;
  const startIndex = (paginaActual - 1) * juegosPorPagina;
  const endIndex = Math.min(startIndex + juegosPorPagina, randomCategory.length);

  useEffect(() => {
    dispatch(getRandomGamesByCategory(categoryName, paginaActual));
  }, [dispatch, categoryName, paginaActual]);

  const handlePaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePaginaSiguiente = () => {
    if (endIndex < randomCategory.length) {
      setPaginaActual((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  

  const getCategoryInfo = () => {
    const path = location.pathname;

    switch (path) {
      case '/category/horror':
        return { image: horror, categoryStyle: style.horror, text: 'Terror' };
      case '/category/strategy':
        return { image: strategy, categoryStyle: style.strategy, text: 'Estrategia' };
      case '/category/racing':
        return { image: racing, categoryStyle: style.racing, text: 'Carreras' };
      case '/category/fighting':
        return { image: fighting, categoryStyle: style.fighting, text: 'Lucha' };
      default:
        return { image: biblioteca, categoryStyle: '' };
    }
  };

  const { image, text, categoryStyle } = getCategoryInfo();

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={`${style.title1} ${categoryStyle}`}>
          <h2 className={style.category}>{text}</h2>
        </div>
        <h1 className={style.textInfo}>
          <FontAwesomeIcon icon={faPaperclip} />{' '}
          En PixelGaming creemos que cada jugador merece una experiencia única y emocionante.
          Únete a nosotros mientras te sumerges en el apasionante universo de los videojuegos y descubres por
          qué somos la elección preferida para aquellos que buscan lo mejor en juegos por categorías.
        </h1>
        <div className={style.cards}>
          {randomCategory.length === 0 ? (
            <div className={style.noGamesMessage}>
              <p>No existen juegos actualmente!</p>
              <img src={Cat} alt="Cat" />
            </div>
          ) : (
            <div className={style.cardContent}>
              {randomCategory.slice(startIndex, endIndex).map((games, index) => (
                <div key={games.id} className={style.cardContent1} id={games.id}>
                  <NavLink to={`/games/${games.id}`} className={style.cardImage2}>
                    <img src={games.thumbnail} alt={games.title} className={style.cardImage} />
                  </NavLink>
                  <div className={style.content1}>
                    <h2 className={style.title}>
                      {games.title}
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
                </div>
              ))}
            </div>
          )}
          </div>
          {randomCategory.length > juegosPorPagina && (
            <div className={style.buttonCategory}>
              <button className={style.buttonC} onClick={handlePaginaAnterior} disabled={paginaActual === 1}>
                <p className={style.buttonCategory}><FontAwesomeIcon icon={faPlay} rotation={180} /></p>
              </button>
              <button className={style.buttonC} onClick={handlePaginaSiguiente} disabled={endIndex >= randomCategory.length}>
                <p className={style.buttonCategory}><FontAwesomeIcon icon={faPlay} /></p>
              </button>
          </div>
          )}
        </div>
      <div className={style.content2}>
        <img src={image} alt="Categoría" />
      </div>
    </div>
  );
}

export default Category;
