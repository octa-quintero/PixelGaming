import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/action.js';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from '@fortawesome/free-solid-svg-icons';
import style from './passwordRestoreStyle.module.css';
import logo from "../../../src/assets/logo/logoPixelGaming1.png";

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const { email } = useParams();
  const [showResetFields] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // Nuevo estado para controlar el mensaje

  const handleSendToken = async () => {
    try {
      await dispatch(forgotPassword(email));
      setEmailSent(true); // Actualizar el estado para mostrar el mensaje
    } catch (error) {
      console.error('Error al enviar el token:', error.message);
    }
  };


  return (
    <div className={style.forgotPassword}>
      <h1 className={style.h1}><FontAwesomeIcon icon={faKey} />Restablecer Contraseña</h1>

      {showResetFields ? (
        <>
          <h1>Revisa Tu Correo</h1>
        </>
      ) : (
        <div className={style.forgotContent}>
          {emailSent ? (
            <p>Se ha enviado un correo electrónico a <b>{email}</b>. Por favor, revisa tu correo para modificar la contraseña.</p>
          ) : (
            <p>Haz clic en "Enviar Token" para recibir un correo electrónico a <b>{email}</b> con las instrucciones para restablecer tu contraseña.</p>
          )}
        </div>
      )}
      <button  className={style.cardBtn}  onClick={handleSendToken} disabled={emailSent}>Enviar Token</button>
      <div className={style.logo}>
        <img className={style.logo1} src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
