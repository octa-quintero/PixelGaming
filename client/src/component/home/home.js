import React from "react";
import Carousel from "./carousel/carousel.js";
import CardsTop from "./cardsTop/cardTop.js";
import SectionAbout from "./sectionAbout/sectionAbout.js"
import SectionCategoryAndGames from "./sectionCategoryandGames/sectionCategoryAndGames.js";
import style from "./homeStyle.module.css";

function Home() {
  return (
    <div className={style.container}>
      <Carousel/>
      <CardsTop/>
      <SectionCategoryAndGames/>
      <SectionAbout/>
    </div>
)
};

export default Home;