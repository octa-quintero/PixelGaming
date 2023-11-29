import React, { useState } from 'react';
import Emoticon from "../../../assets/pixelArt/emoticon.png";
import Emoticon2 from "../../../assets/pixelArt/emoticon2.png";
import Emoticon3 from "../../../assets/pixelArt/emoticon4.png";
import style from "./ratingStyle.module.css";

function RatingInput({ onRatingChange }) {
  const [emoticon1, setEmoticon1] = useState(Emoticon);
  const [emoticon2, setEmoticon2] = useState(Emoticon2);
  const [emoticon3, setEmoticon3] = useState(Emoticon3);

  const handleRatingClick = (value, setRating) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <div className={style.rating}>
      <h3>Calificación: </h3>
      <div className={style.ratingEmoticon}>
        <img
          src={emoticon1}
          alt="Emoticon"
          onClick={() => handleRatingClick(1, setEmoticon1)}
        />
        <img
          src={emoticon2}
          alt="Emoticon"
          onClick={() => handleRatingClick(2, setEmoticon2)}
        />
        <img
          src={emoticon3}
          alt="Emoticon"
          onClick={() => handleRatingClick(3, setEmoticon3)}
        />
      </div>
    </div>
  );
}

export default RatingInput;
