import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from "../../../assets/logo/pixel.gif";
import logo1 from "../../../assets/logo/logo.png"
import style from "./footerStyle.module.css";

function Footer() {

  return (
    <div className={style.footer}>
      <div className={style.lineDivisor}></div>
      <div className={style.footer1}>
        <img src={logo} className={style.logo}></img>
        <div className={style.info}>
          <p>Informacion y contacto</p>
            <h1>mail: octa.quinteroo@gmail.com</h1>
            <h1>tel: +54 3585106603</h1>
            <h1>Cordoba, Argentina</h1>
        </div>
        <div className={style.icons}>
          <p>Social</p>
            <h1>
              <a className={style.icon} href="https://www.instagram.com/octa.quintero/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
              <a className={style.icon} href="https://www.linkedin.com/in/octavio-quintero/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a className={style.icon} href="https://github.com/octa-quintero" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
            </h1>
        </div>
        <a href="https://octavioquintero.vercel.app/" target="_blank" rel="noopener noreferrer">
        <a href="https://octavioquintero.vercel.app/" target="_blank" rel="noopener noreferrer" className={style.navLink}>
  <img src={logo1} className={style.logo1} alt="Logo" />
</a>

</a>

      </div>
    </div>
  );
}

export default Footer;
