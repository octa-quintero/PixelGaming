import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/action.js';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faKey, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from "../../../src/assets/logo/logoPixelGaming1.png";
import style from './passwordRestoreConfirm.module.css';

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      if (newPassword === confirmPassword) {
        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(newPassword)) {
          // Contraseña válida
          setIsLoading(true);
          await dispatch(resetPassword(resetToken, newPassword));
          setIsLoading(false);

          // Mostrar mensaje y cerrar la ventana
          const confirmation = window.confirm('Se cambió la contraseña. Regresa al Inicio');

          if (confirmation) {
            window.close();
          }
        } else {
          // Verificar los requisitos de la contraseña
          if (!/(?=.*[A-Z])/.test(newPassword) && !/(?=.*\d)/.test(newPassword)) {
            setPasswordError('La contraseña debe contener al menos una mayúscula y un número.');
          } else if (!/(?=.*[A-Z])/.test(newPassword)) {
            setPasswordError('La contraseña debe contener al menos una mayúscula.');
          } else if (!/(?=.*\d)/.test(newPassword)) {
            setPasswordError('La contraseña debe contener al menos un número.');
          }
        }
      } else {
        setPasswordError('Las contraseñas no coinciden.');
      }
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error.message);
      setPasswordError('Error al restablecer la contraseña. Por favor, inténtalo de nuevo.');
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setPasswordError('');
  };

  return (
    <div className={style.restorePassword}>
      <h1 className={style.h1}><FontAwesomeIcon icon={faKey} />Actualiza tu contraseña</h1>
      <p>Cuida tu información personal. Protégete y evita compartir información valiosa. No la compartas y mantén tus datos seguros.</p>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Nueva contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Confirmar nueva contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className={style.show}>
        {passwordError && <p className={style.errorText}>{passwordError}</p>}
        <button onClick={toggleShowPassword} className={style.showPasswordBtn}>
          {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
        </button>
      </div>
      <button onClick={(e) => handleResetPassword(e)} className={style.cardBtn} disabled={isLoading}>
        {isLoading ? 'Enviando...' : 'Restablecer Contraseña'}
      </button> 
      <div className={style.logo}>
        <img className={style.logo1} src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
