import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Carousel from "../carousel/carousel";
import CardsTop from "../cardsTop/cardTop"
import style from "./homeStyle.module.css";

function Home() {
  return (
    <div className={style.container}>
      <Carousel/>
      <CardsTop/>
    </div>
)
};

export default Home;