import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/action.js';
import { useParams } from 'react-router-dom';
import style from './passwordRestoreStyle.module.css';

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
    <div>
      <h1>Restablecer Contraseña</h1>

      {showResetFields ? (
        <>
          <h1>Revisa Tu Correo</h1>
        </>
      ) : (
        <div>
          {emailSent ? (
            <p>Se ha enviado un correo electrónico a {email}. Por favor, revisa tu correo para modificar la contraseña.</p>
          ) : (
            <p>Haz clic en "Enviar Token" para recibir un correo electrónico con las instrucciones para restablecer tu contraseña.</p>
          )}
          <button onClick={handleSendToken} disabled={emailSent}>Enviar Token</button>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordPage;
