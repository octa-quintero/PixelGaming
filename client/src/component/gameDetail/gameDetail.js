import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGamesId,
  createReview,
  fetchUserProfile,
  getReviewsByGameId,
  addGameToLibrary,
  checkGameInLibrary
} from '../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faTriangleExclamation,
  faPaperclip
} from '@fortawesome/free-solid-svg-icons';
import style from './gameDetailStyle.module.css';
import Heart from "../../../src/assets/pixelArt/heart.png";
import Duck from "../../../src/assets/logo/duck.gif";

function GameDetail() {
  const dispatch = useDispatch();
  const gameInfo = useSelector(state => state.gameDetail);
  const userProfile = useSelector((state) => state.userProfile);
  const reviews = useSelector(state => state.reviews);
  const [reviewText, setReviewText] = useState("");
  const isGameInLibrary = useSelector(state => state.isGameInLibrary)
  
  const handleReviewSubmit = () => {
    if (reviewText.trim() !== "") {
      const reviewData = {
        text: reviewText,
        gameId: gameInfo.id,
        userId: userProfile.id,
        avatar: userProfile.avatar,
        name_user: userProfile.name_user,
      };
      dispatch(createReview(reviewData));
      setReviewText("");
    }
  };

  const handleAddToLibrary = async () => {
    await dispatch(addGameToLibrary({ userId: userProfile.id, gameId: gameInfo.id }));
    await dispatch(checkGameInLibrary({ userId: userProfile.id, gameId: gameInfo.id }));
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
      const pathname = window.location.pathname;
      const gameId = pathname.split('/games/')[1];
  
      while (!userProfile.id) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
  
      await dispatch(fetchUserProfile(userProfile.id));
  
      if (gameId) {
        await dispatch(getGamesId(gameId));
        await dispatch(getReviewsByGameId(gameId));
  
        while (!gameInfo.id) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        await dispatch(checkGameInLibrary({ userId: userProfile.id, gameId: gameInfo.id }));
      }
    };
  
    fetchData();
  }, [dispatch, userProfile.id, gameInfo.id]);
  


  return (
    <div className={style.cardsGamesContainer}>
      <div className={style.cardContent1} key={gameInfo?.id}>
        {gameInfo ? (
          <div className={style.cardContent}>
            <div className={style.image}>
              <img src={gameInfo.thumbnail} alt={gameInfo.title} className={style.cardImage} />
              <a href={gameInfo.game_url} className={style.cardBtn}>Play Now!</a>
              <p className={style.reseÑa}>{' '}<FontAwesomeIcon icon={faTriangleExclamation} />Tenga en cuenta que
                este juego gratuito puede ofrecer o no compras opcionales dentro del juego.</p>
            </div>  
              <div className={style.title}>
                <div className={style.Favorite}>
                  <h2 className={style.cardTitle}>{gameInfo.title}</h2>
                  <img
                    src={Heart}
                    className={isGameInLibrary ? style.heartInLibrary : style.heart}
                    alt="Favorite"
                    onClick={handleAddToLibrary}
                  />
                </div>
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
          <h2 className={style.Coments}>Comentarios</h2>
        <div className={style.reviewsContainer}>
            {reviews.map(review => (
              <div key={review.id} className={style.reviewComponent}>
                <div className={style.reviewUser}>
                  <p>{review.name_user}</p>
                  <img src={review.avatar} alt="Avatar" className={style.avatarImage} />
                </div>
                <p className={style.text}>{review.text}</p>
              </div>
            ))}
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