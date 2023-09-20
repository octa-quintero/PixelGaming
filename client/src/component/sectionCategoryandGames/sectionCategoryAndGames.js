import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardCategory from "../cardCategory/cardCategory.js";
import style from './sectionCategoryAndGames.module.css';

function SectionCategoryAndGames(){
  return(
  <div className={style.container}>
    <CardCategory/>
  </div>
  )
}

export default SectionCategoryAndGames;