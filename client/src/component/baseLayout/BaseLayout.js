import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Navbar from './navBar/navBar.js';
import Footer from './footer/footer.js';
import Home from '../home/home.js';
import Games from '../games/games.js';
import Top2023 from '../top2023/top2023.js';
import GameDetail from '../gameDetail/gameDetail.js';
import Users from '../users/users.js';
import UserProfile from '../userProfile/userProfile.js';
import Login from '../login/login.js';
import ForgotPassword from '../passwordRestore/forgotPassword.js';
import ForgotPasswordPage from '../passwordRestore/passwordRestore.js';
import ResetPasswordPage from '../passwordRestore/passwordRestoreConfirm.js';
import Admin from '../admin/admin.js';
import Library from '../library/library.js';
import Contact from '../contact/contact.js';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation();

  // Redirige a la página de inicio de sesión si el usuario no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Renderiza el componente si el usuario está autenticado
  return <Element {...rest} />;
};
export default function BaseLayout() {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation();
  const isPasswordRelatedRoute =
    location.pathname.includes('/forgot-password') || location.pathname.includes('/reset-password');

  return (
    <Box>
      <Grid container display={'flex'} flexDirection={'column'} minHeight={'100vh'} justifyContent={'space-between'}>
        {!isPasswordRelatedRoute && (
          <Grid item>
            <Navbar />
          </Grid>
        )}
        <Grid item flexGrow={1} display={'flex'} justifyContent={'center'} alignItems={'flex-start'} minHeight={'100vh'}>
          <Routes>
            <Route exact path={'/'} element={<Home />} />
            <Route path={'/games'} element={<Games />} />
            <Route path={'/contact'} element={<Contact />} />
            <Route path={'/top2023'} element={<Top2023 />} />
            <Route path={'/library/:userId'} element={<Library />} />
            <Route path={'/games/:gameId'} element={<GameDetail />} />
            <Route path={'/restore-password'} element={<ForgotPassword />} />
            <Route path={'/admin'} element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
            {isAuthenticated ? (
              <>
                <Route path={'/user-profile/:userId'} element={<UserProfile />} />
                <Route path={'/register'} element={<Navigate to="/" />} />
                <Route path={'/login'} element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path={'/user-profile/:userId'} element={<Navigate to="/login" />} />
                <Route path={'/register'} element={<Users />} />
                <Route path={'/login'} element={<Login />} />
              </>
            )}
            <Route path={'/forgot-password/:email'} element={<ForgotPasswordPage />} />
            <Route path={'/reset-password/:resetToken'} element={<ResetPasswordPage />} />
          </Routes>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
}
