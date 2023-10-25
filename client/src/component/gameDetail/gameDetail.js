import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGamesId, createReview } from '../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import RatingInput from './rating/rating.js';
import style from './gameDetailStyle.module.css';
import Duck from "../../../src/assets/logo/duck.gif";

function GameDetail() {
  const dispatch = useDispatch();
  const gameInfo = useSelector(state => state.gameDetail);
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = () => {
    if (reviewText.trim() !== "") {
      const reviewData = {
        text: reviewText,
        gameId: gameInfo.id,
        rating: 3,
      };
      dispatch(createReview(reviewData));
      setReviewText("");
    }
  };
  
  useEffect(() => {
    const pathname = window.location.pathname;
    const gameId = pathname.split('/games/')[1];

    if (gameId) {
      console.log("Dispatching getGamesId with gameId:", gameId);
      dispatch(getGamesId(gameId));
    }
  }, [dispatch]);

  return (
    <div className={style.cardsGamesContainer}>
      <div className={style.cardContent1} key={gameInfo.id}>
        {gameInfo ? (
          <div className={style.cardContent}>
            <div className={style.image}>
              <img src={gameInfo.thumbnail} alt={gameInfo.title} className={style.cardImage} />
              <a href={gameInfo.game_url} className={style.cardBtn}>Play Now!</a>
              <RatingInput onRatingChange={(rating) => {}} />
            </div>  
            <div className={style.title}>
              <h2 className={style.cardTitle}>{gameInfo.title}</h2>
              <h3 className={style.description}>{gameInfo.short_description}</h3>
              <h3 className={style.shortDescription}>Publicado:<h3>{gameInfo.publisher}</h3></h3>
              <h3 className={style.shortDescription}>Desarrollo: <h3>{gameInfo.developer}</h3></h3>
              <h3 className={style.shortDescription}>Lanzamiento: <h3>{gameInfo.release_date}</h3></h3>
              <h3 className={style.shortDescription}>Genero: <h3>{gameInfo.genre}</h3></h3>
              <h3 className={style.shortDescription}>Plataforma: <h3>{gameInfo.platform}</h3></h3>
              <div className={style.textArea}>
                <img src={Duck} className={style.duck}></img>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Escribe tu reseña aquí"
                  />
                  <button className={style.btnRegistro} onClick={handleReviewSubmit}>
                    <h1><FontAwesomeIcon icon={faPaperPlane}/></h1>
                  </button>
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
