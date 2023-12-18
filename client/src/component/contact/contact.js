import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faTowerObservation
} from '@fortawesome/free-solid-svg-icons';
import style from './contactStyle.module.css';
import Computer from '../../assets/pixelArt/computer.gif';
import Pixel from '../../assets/logo/pixel.gif';
import Instagram from '../../assets/pixelArt/instagram.png';
import Linkedin from '../../assets/pixelArt/linkedin.png';
import Github from '../../assets/pixelArt/github.png';
import Logo from '../../assets/logo/logo.png'



function Contact() {
  return (
    <div className={style.contactContainer}>
      <div className={style.userContent}>
        <div className={style.content}>
          <h1 className={style.title}><FontAwesomeIcon icon={faTowerObservation} />Contacto</h1>
        </div>
        <p>
        Soy <b>Octavio Quintero,</b> desarrollador <b>FullStack</b> y creador de <b>PixelGaming</b><img  className={style.pixel} src={Pixel}></img>. 
        Mi idea fue simplificar la búsqueda de juegos gratuitos para los amantes del gaming.  Quería crear un espacio
        interactivo donde los usuarios pudieran compartir conocimientos y descubrimientos, facilitando así la elección de juegos. 
        Además, implementé la función de registro y biblioteca personal para ofrecer a cada usuario la posibilidad de personalizar 
        su experiencia, guardar sus juegos favoritos y construir una colección digital. PixelGaming se destaca por ofrecer una experiencia
        donde podes buscar , interactuara través de reseñas y guardar tus juegos favoritos en tu biblioteca, ademas de personalizar tu perfil.
        </p>
        <p>
        Desarrollada con tecnologías líderes como <b>Node.js</b>, <b>React.js</b> y <b>PostgreSQL</b>, PixelGaming se distingue por su enfoque 
        innovador. La estructura organizativa, dividida en dos sectores. El backend  esta potenciado por <b>Node.js</b>, <b>Express</b> y
        <b> Sequelize</b>. En el frontend utilize <b>React.js</b> para asegurar una experiencia de usuario fluida. El diseño visual fue creado con  
        {' '}<b>Illustrator</b> agregando un toque estético, ofreciendo a los usuarios una interfaz atractiva y fácil de explorar.
        </p>
        <p className={style.logo}>
        Si buscas un <>desarrollador</> comprometido, creativo y orientado a resultados, estás en el lugar correcto. Mi
        habilidad para comprender las metas del proyecto y traducirlas en soluciones funcionales es mi fortaleza. 
        Ya sea que necesites una aplicación web, un sitio responsive o una solución personalizada, estoy listo!
        <img src={Logo}></img>
        </p>
          <div className={style.iconDate}>
            <NavLink to="/" className={style.Icon}>
              <img src={Instagram} ></img><h1>Instagram</h1>
            </NavLink>
            <NavLink to="/" className={style.Icon}>
              <img src={Github} ></img><h1>Github</h1>
            </NavLink>
            <NavLink to="/" className={style.Icon}>
              <img src={Linkedin} ></img><h1>Linkedin</h1>
            </NavLink>
          </div>
        </div>
      <div className={style.contact}>
        <img src={Computer}></img>
      </div>
    </div>
  );
}

export default Contact;
