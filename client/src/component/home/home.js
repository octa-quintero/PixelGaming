import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Carousel from "../carousel/carousel";
import CardsTop from "../cardsTop/cardTop.js";
import SectionCategoryAndGames from "../sectionCategoryandGames/sectionCategoryAndGames.js";
import style from "./homeStyle.module.css";

function Home() {
  return (
    <div className={style.container}>
      <Carousel/>
      <CardsTop/>
      <SectionCategoryAndGames/>
    </div>
)
};

export default Home;