import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import style from './usersStyle.module.css';
import Login from './register/register.js'

function Users() {
  
  return (
    <div className={style.loginContainer}>
      <Login/>
    </div>
  );
}  

export default Users;