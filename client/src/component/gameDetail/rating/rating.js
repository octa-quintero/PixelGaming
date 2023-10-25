import React, { useState } from 'react';
import Emoticon from "../../../assets/pixelArt/emoticon1.png";
import Emoticon2 from "../../../assets/pixelArt/emoticon3.png";
import Emoticon3 from "../../../assets/pixelArt/emoticon5.png";
import ColoredEmoticon1 from "../../../assets/pixelArt/emoticon.png";
import ColoredEmoticon2 from "../../../assets/pixelArt/emoticon2.png";
import ColoredEmoticon3 from "../../../assets/pixelArt/emoticon4.png";
import style from "./ratingStyle.module.css";

function RatingInput({ onRatingChange }) {
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [emoticon1, setEmoticon1] = useState(Emoticon);
  const [emoticon2, setEmoticon2] = useState(Emoticon2);
  const [emoticon3, setEmoticon3] = useState(Emoticon3);

  const handleRatingClick = (value, setRating, setEmoticon) => {
    setRating(value);
    onRatingChange(value);

    switch (value) {
      case 1:
        setEmoticon(ColoredEmoticon1);
        break;
      case 2:
        setEmoticon(ColoredEmoticon2);
        break;
      case 3:
        setEmoticon(ColoredEmoticon3);
        break;
      default:
    }
  };

  return (
    <div className={style.rating}>
      <h3>Calificación: </h3>
      <div className={style.ratingEmoticon}>
        <img
          src={emoticon1}
          alt="Emoticon"
          onClick={() => handleRatingClick(1, setRating1, setEmoticon1)}
          onMouseEnter={() => setEmoticon1(ColoredEmoticon1)}
          onMouseLeave={() => setEmoticon1(rating1 === 0 ? Emoticon : ColoredEmoticon1)}
        />
        <img
          src={emoticon2}
          alt="Emoticon"
          onClick={() => handleRatingClick(2, setRating2, setEmoticon2)}
          onMouseEnter={() => setEmoticon2(ColoredEmoticon2)}
          onMouseLeave={() => setEmoticon2(rating2 === 0 ? Emoticon2 : ColoredEmoticon2)}
        />
        <img
          src={emoticon3}
          alt="Emoticon"
          onClick={() => handleRatingClick(3, setRating3, setEmoticon3)}
          onMouseEnter={() => setEmoticon3(ColoredEmoticon3)}
          onMouseLeave={() => setEmoticon3(rating3 === 0 ? Emoticon3 : ColoredEmoticon3)}
        />
      </div>
    </div>
  );
}

export default RatingInput;
