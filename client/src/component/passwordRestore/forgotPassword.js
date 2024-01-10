import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import style from './forgotPasswordStyle.module.css';
import logo from "../../../src/assets/logo/logoPixelGaming1.png";

function ForgotPassword() { 
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false); 

  const handleSendToken = async (e) => {
    e.preventDefault();
    try {
      await dispatch(forgotPassword(email));
      setEmailSent(true);
    } catch (error) {
      console.error('Error al enviar el token:', error.message);
    }
  };

  return (
    <div className={style.forgotPassword}>
      <h1 className={style.h1}><FontAwesomeIcon icon={faUser} />Recupera tu Cuenta</h1>

      <div className={style.forgotContent}>
        {emailSent ? (
          <p>Se ha enviado un correo electrónico a <b>{email}</b>. Por favor, revisa tu correo para modificar la contraseña.</p>
        ) : (
          <form onSubmit={handleSendToken} className={style.formRestore}>
            <label htmlFor="emailInput">Ingrese su dirección de correo para recibir un token y restablecer su contraseña.</label>
            <input 
              type="email" 
              id="emailInput" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Ingresa tu correo electrónico"
              className={style.restorePassword}
              required 
            />
            <button type="submit" className={style.cardBtn} disabled={emailSent}>Enviar Token</button>
          </form>
        )}
      </div>
      
      <div className={style.logo}>
        <img className={style.logo1} src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default ForgotPassword;
