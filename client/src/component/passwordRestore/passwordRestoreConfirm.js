import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword, refreshPassword } from '../../redux/action.js';
import { useParams } from 'react-router-dom';

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      console.log('Antes de dispatch resetPassword');
      if (newPassword === confirmPassword) {
        await dispatch(resetPassword(resetToken, newPassword));
        console.log('Después de dispatch resetPassword');
    
        // Solo necesitas enviar el token una vez, elige si enviarlo con resetPassword o refreshPassword
        console.log('Antes de dispatch refreshPassword');
        await dispatch(refreshPassword(resetToken));
        console.log('Después de dispatch refreshPassword');
    
        // Navega a la página de inicio
      } else {
        console.error('Las contraseñas no coinciden.');
      }
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error.message);
    }
  };

  console.log('Reset Token:', resetToken);

  return (
    <div>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar nueva contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>
        Restablecer Contraseña
      </button>
    </div>
  );
}

export default ResetPasswordPage;
