import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import style from './usersStyle.module.css';
import Register from './register/register.js'

function Users() {
  
  return (
    <div className={style.loginContainer}>
      <Register/>
    </div>
  );
}  

export default Users;