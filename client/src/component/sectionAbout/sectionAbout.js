import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGhost
} from '@fortawesome/free-solid-svg-icons';
import PixelGaming from "../../assets/collage/collage.png";
import style from './sectionAboutStyle.module.css';


function SectionAbout() {
  return (
    <div className={style.sectionAbout} style={{ backgroundImage: `url(${PixelGaming})` }}>
      <div className={style.text}>
          <h4 className={style.Icon}><FontAwesomeIcon icon={faGhost} /></h4>
          <p>Descubre los mejores juegos GRATIS de la comunidad en PixelGaming.
              Explora nuestra amplia biblioteca y comparte tus valoraciones sobre
              los juegos. ¡Bienvenido a <span className={style.pixelGaming}>PixelGaming</span>!
          </p>
              <NavLink to="/activity" className={style.btnRegistro}>
                <h1>Comienza tu experiencia</h1>
              </NavLink>
      </div>
    </div>  
  );
}

export default SectionAbout;