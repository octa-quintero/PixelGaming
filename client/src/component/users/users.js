import React from 'react';
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