import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faLayerGroup,
  faUser,
  faMagnifyingGlass,
  faCrown,
  faTimes,
  faGamepad,
  faHeart,
  faTowerObservation,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/logo/logoPixelGaming1.png";
import style from "./navBarStyle.module.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.navbarContainer}>
      <div className={style.navbar}>
        <NavLink to="/" className={style.logo}>
          <div className={style.logo}>
            <img className={style.logo1} src={logo} alt="logo" />
          </div>
        </NavLink>
        <div className={style.links}>
          <NavLink to="/" className={style.btn}>
              <h1><FontAwesomeIcon icon={faHeart}/>{' '}Home</h1>
          </NavLink>
          <NavLink to="/games" className={style.btn}>
              <h1><FontAwesomeIcon icon={faGamepad} />{' '}Juegos</h1>
          </NavLink>
          <NavLink to="/activitySearch" className={style.btn}>
              <h1><FontAwesomeIcon icon={faTowerObservation} />{' '}Contacto</h1>
          </NavLink>
          <NavLink to="/activity" className={style.btn}>
              <h1><FontAwesomeIcon icon={faLayerGroup}/>{' '}Biblioteca</h1>
          </NavLink>
          <NavLink to="/top2023" className={style.btnTOP}>
              <h1>Top 2023 <FontAwesomeIcon className={style.nameIcon} icon={faCrown} /></h1>
          </NavLink>
        </div>
          <div className={style.registro}>
            <NavLink to="/biblioteca" className={style.btnUser}>
              <p><FontAwesomeIcon icon={faLayerGroup}/></p>
            </NavLink>
            <NavLink to="/games" className={style.btnUser}>
              <p><FontAwesomeIcon icon={faMagnifyingGlass} /></p>
            </NavLink>
            <NavLink to="/games" className={style.btnUser}>
              <p><FontAwesomeIcon icon={faUser} /></p>
            </NavLink>
            <NavLink to="/register" className={style.btnRegistro}>
              <h1>Acceso Gratuito</h1>
            </NavLink>
          </div>
        <div className={style.toggleBtn} onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>
      </div>
      {isOpen && (
        <div className={style.dropdownMenu}>
          <ul>
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/paises">Juegos</NavLink></li>
            <li><NavLink to="/actividades">Contacto</NavLink></li>
            <li><NavLink to="/actividades">Biblioteca</NavLink></li>
            <li><NavLink to="/activity" className={style.btnTOPDrop}><h1>Top 2023</h1></NavLink></li>
            <li><NavLink to="/activity" className={style.btnRegistroDrop}><p>Acceso Gratuito</p>
            </NavLink></li>
          </ul>
        </div>
      )}
      <div className={style.lineDivisor}></div>
    </div>
  );
}

export default NavBar;