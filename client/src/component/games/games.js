import React, { useState } from 'react';
import style from './gamesStyle.module.css';
import Cards from './cards/cards.js';
import Filter from './filter/filter.js';

function Games() {

  return (
    <div className={style.gamesContainer}>
      <Filter/>
      <Cards/>
    </div>
  );
}

export default Games;
