import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import { fetchUserProfile, logout } from "../../../redux/action.js";
import {
  faBars,
  faLayerGroup,
  faUser,
  faMagnifyingGlass,
  faCrown,
  faTimes,
  faGamepad,
  faHeart,
  faRightFromBracket,
  faTowerObservation,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/logo/logoPixelGaming1.png";
import style from "./navBarStyle.module.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className={style.navbarContainer}>
      <div className={style.navbar}>
        <NavLink to="/" className={style.logo}>
          <div className={style.logo}>
            <img className={style.logo1} src={logo} alt="logo" />
          </div>
        </NavLink>
        {/* Enlaces principales */}
        <div className={style.links}>
          <NavLink to="/" className={style.btn}>
            <h1><FontAwesomeIcon icon={faHeart} />{' '}Home</h1>
          </NavLink>
          <NavLink to="/games" className={style.btn}>
            <h1><FontAwesomeIcon icon={faGamepad} />{' '}Juegos</h1>
          </NavLink>
          <NavLink to="/contact" className={style.btn}>
            <h1><FontAwesomeIcon icon={faTowerObservation} />{' '}Contacto</h1>
          </NavLink>
          <NavLink to={`/library/${userData && userData.userId}`} className={style.btn}>
            <h1><FontAwesomeIcon icon={faLayerGroup} />{' '}Biblioteca</h1>
          </NavLink>
          <NavLink to="/top2023" className={style.btnTOP}>
            <h1>Top 2024 <FontAwesomeIcon className={style.nameIcon} icon={faCrown} /></h1>
          </NavLink>
        </div>

        {/* Área de registro y usuario */}
        <div className={style.registro}>
          <NavLink to={`/library/${userData && userData.userId}`} className={style.btnUser}>
            <p><FontAwesomeIcon icon={faLayerGroup} /></p>
          </NavLink>
          <NavLink to="/games" className={style.btnUser}>
            <p><FontAwesomeIcon icon={faMagnifyingGlass} /></p>
          </NavLink>
          {userData ? (
            <NavLink to={`/user-profile/${userData && userData.userId}`} className={style.btnUser}>
              {userData && userData.avatar ? (
                <img src={userData.avatar} alt="Avatar" className={style.avatarImage} />
              ) : (
                <p><FontAwesomeIcon icon={faUser} /></p>
              )}
            </NavLink>
          ) : (
            <>
              <NavLink to="/login" className={style.btnUser}>
                <p><FontAwesomeIcon icon={faUser} /></p>
              </NavLink>
            </>
          )}
          <NavLink to={userData ? `/user-profile/${userData.userId}` : "/register"} className={style.btnRegistro}>
            <h1>Obtener Acceso</h1>
          </NavLink>
        </div>

        {/* Botón de menú toggle */}
        <div className={style.toggleBtn} onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>
      </div>

      {/* Menú desplegable */}
      {isOpen && (
        <div className={style.dropdownMenu}>
          <ul>
            <li><NavLink to="/" className={style.btn}><h1><FontAwesomeIcon icon={faHeart} />{' '}Home</h1></NavLink></li>
            <li><NavLink to="/games" className={style.btn}><h1><FontAwesomeIcon icon={faGamepad} />{' '}Juegos</h1></NavLink></li>
            <li><NavLink to="/contact" className={style.btn}><h1><FontAwesomeIcon icon={faTowerObservation} />{' '}Contacto</h1></NavLink></li>
            <li><NavLink to={`/library/${userData && userData.userId}`} className={style.btn}><h1><FontAwesomeIcon icon={faLayerGroup} />{' '}Biblioteca</h1></NavLink></li>
            <li><NavLink to="/top2023" className={style.btnTOP}><h1>Top 2024 <FontAwesomeIcon className={style.nameIcon} icon={faCrown} /></h1></NavLink></li>
            <li>
              <NavLink to={`/user-profile/${userData && userData.userId}`} className={style.btnUser}>
                {userData && (
                  <div className={style.userContainer}>
                    {userProfile.name_user && (
                      <p className={style.nameUser}>{userProfile.name_user}</p>
                    )}
                    {userData.avatar && (
                      <img src={userData.avatar} alt="Avatar" className={style.avatarImage} />
                    )}
                  </div>
                )}
              </NavLink>
            </li>
            <li><NavLink to="/activity" className={style.btnRegistroDrop}><p>Acceso Gratuito</p></NavLink></li>
            <li><button onClick={handleLogout} className={style.logoutBtn}>Logout<FontAwesomeIcon icon={faRightFromBracket}/></button></li>
          </ul>
        </div>
      )}

      {/* Línea divisoria */}
      <div className={style.lineDivisor}></div>
    </div>
  );
}

export default NavBar;
