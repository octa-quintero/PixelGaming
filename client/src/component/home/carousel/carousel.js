import React, { useState, useEffect } from "react";
import style from "./carouselStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import CarouselImage from "../../../assets/carousel/Carousel1.jpg";
import CarouselImage1 from "../../../assets/carousel/Carousel2.jpg";
import CarouselImage2 from "../../../assets/carousel/Carousel3.jpg";
import CarouselImage3 from "../../../assets/carousel/Carousel4.jpg";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [CarouselImage, CarouselImage1, CarouselImage2, CarouselImage3];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [currentSlide]);

  return (
    <div className={style.carouselContainer}>
      <div className={style.sliderContainer}>
        <div className={style.slider} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              id={`slide${index}`}
              className={style.active}
            />
          ))}
        </div>
        <div className={style.sliderNav}>
          <button onClick={prevSlide}><p><FontAwesomeIcon icon={faArrowLeft} /></p></button>
          <button onClick={nextSlide}><p><FontAwesomeIcon icon={faArrowRight} /></p></button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
