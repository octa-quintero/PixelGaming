import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword, forgotPassword, refreshPassword } from '../../redux/action.js';
import { useParams } from 'react-router-dom';
import style from './passwordRestoreStyle.module.css';

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { email } = useParams();
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [showResetFields, setShowResetFields] = useState(false);

  const handleSendToken = async () => {
    try {
      await dispatch(forgotPassword(email));

      // Después de enviar el token, muestra los campos para cambiar la contraseña
      setShowResetFields(true);
    } catch (error) {
      console.error('Error al enviar el token:', error.message);
      // Maneja el error según sea necesario
    }
  };

  const handleResetPassword = async () => {
    try {
      // Aquí podrías llamar a la acción para restablecer la contraseña
      // Ajusta la lógica según tus necesidades
      await dispatch(resetPassword(resetToken, newPassword));

      // Después de restablecer la contraseña, podrías realizar alguna acción adicional si es necesario
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error.message);
      // Maneja el error según sea necesario
    }
  };

  // ... Resto del código

  return (
    <div>
      <h1>Restablecer Contraseña</h1>

      {showResetFields ? (
        // Campos para ingresar la nueva contraseña
        <>
          <input
            type="password"
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>Restablecer Contraseña</button>
        </>
      ) : (
        // Botón para enviar el token
        <button onClick={handleSendToken}>Enviar Token</button>
      )}
    </div>
  );
}

export default ResetPasswordPage;
