import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket
} from '@fortawesome/free-solid-svg-icons';
import style from './cardCategory.module.css';

function CardCategory() {
  const links = [
    { to: "/category/horror", text: "Terror", cardClass: "terror" },
    { to: "/category/fighting", text: "Lucha", cardClass: "fight" },
    { to: "/category/racing", text: "Carreras", cardClass: "racing" },
    { to: "/category/strategy", text: "Estrategia", cardClass: "strategy" }
  ];

  return (
    <div className={style.container}>
      <div className={style.text}>
        <h1>Categorias{' '}<FontAwesomeIcon icon={faRocket} /></h1>
      </div>
      <div className={style.cards}>
        {links.map((link, index) => (
          <NavLink key={index} to={link.to} className={`${style.card} ${style[link.cardClass]}`}>
            <div className={style.cardCategory}>
              {link.text}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default CardCategory;
