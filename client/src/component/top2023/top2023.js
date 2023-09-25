import React from 'react';
import Cards from "./cards/cards.js"
import OtherCards from "./otherCards/otherCards.js"
import style from './top2023Style.module.css'

function top2023() {
return (
  <div className={style.top2023Container}>
    <Cards/>
    <OtherCards/>
  </div>
)
}

export default top2023;