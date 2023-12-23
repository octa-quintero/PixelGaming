import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode }  from  "jwt-decode"
import { fetchUserProfile } from "../../../redux/action.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGhost
} from '@fortawesome/free-solid-svg-icons';
import PixelGaming from "../../../assets/collage/collage.png";
import style from './sectionAboutStyle.module.css';


function SectionAbout() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken);
      if (decodedToken.userId) {
        dispatch(fetchUserProfile(decodedToken.userId));
      }
    }
  }, [dispatch]);
  
  return (
    <div className={style.sectionAbout} style={{ backgroundImage: `url(${PixelGaming})` }}>
      <div className={style.text}>
          <h4 className={style.Icon}><FontAwesomeIcon icon={faGhost} /></h4>
          <p>Descubre los mejores juegos GRATIS de la comunidad en PixelGaming.
              Explora nuestra amplia biblioteca y comparte tus valoraciones sobre
              los juegos. ¡Bienvenido a <span className={style.pixelGaming}>PixelGaming</span>!
          </p>
            <NavLink 
              to={`/register`} 
              className={style.btnRegistro}
              >
                <h1>Comenzá tu experiencia</h1>
            </NavLink>
      </div>
    </div>  
  );
}

export default SectionAbout;