import React from "react";
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
              <FontAwesomeIcon icon={faInstagram } />
              <FontAwesomeIcon icon={faLinkedinIn} />
              <FontAwesomeIcon icon={faGithub}/>
            </h1>
        </div>
        <img src={logo1} className={style.logo1}></img>
      </div>
    </div>
  );
}

export default Footer;
