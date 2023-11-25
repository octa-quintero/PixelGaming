import React from 'react';
import Navbar from './navBar/navBar.js';
import Footer from './footer/footer.js'
import Home from '../home/home.js'
import Games from '../games/games.js'
import Top2023 from '../top2023/top2023.js'
import GameDetail from '../gameDetail/gameDetail.js'
import Users from '../users/users.js'
import UserProfile from '../userProfile/userProfile.js'
import Login from '../login/login.js'
import ForgotPasswordPage from '../passwordRestore/passwordRestore.js'
import ResetPasswordPage from '../passwordRestore/passwordRestoreConfirm.js'
import Contact from '../contact/contact.js'
import { Route, Routes } from "react-router-dom";
import { Box, Grid } from "@mui/material";

export default function BaseLayout() {
    // Obtén la ruta actual
    const currentPath = window.location.pathname;

    // Verifica si la ruta es la de restablecimiento de contraseña
    const isResetPasswordPage = currentPath.includes('/reset-password');
    const isForgotPasswordPage = currentPath.includes('/forgot-password');
    const isLoginPage = currentPath.includes('/login');

    

    return (
        <Box>
            <Grid container display={'flex'} flexDirection={'column'}  minHeight={'100vh'}
                justifyContent={'space-between'}>
                {!isResetPasswordPage && !isForgotPasswordPage && !isLoginPage && (
                    <Grid item>
                        <Navbar />
                    </Grid>
                )}
                <Grid item flexGrow={1} display={'flex'} justifyContent={'center'} alignItems={'flex-start'} minHeight={'100vh'}>
                    <Routes>
                        <Route exact path={'/'} element={<Home/>}/>
                        <Route path={'/games'} element={<Games />}/>
                        <Route path={'/contact'} element={<Contact/>} />
                        <Route path={'/top2023'} element={<Top2023/>}/>
                        <Route path={'/games/:gameId'} element={<GameDetail/>} />
                        <Route path={'/register'} element={<Users/>}/>
                        <Route path={'/user-profile/:userId'} element={<UserProfile/>}/>
                        <Route path={'/login'} element={<Login/>} />
                        <Route path={'/forgot-password/:email'} element={<ForgotPasswordPage/>}/>
                        <Route path={'/reset-password/:resetToken'} element={<ResetPasswordPage/>}/>
                    </Routes>
                </Grid>
                {!isResetPasswordPage && !isForgotPasswordPage && !isLoginPage && (
                <Grid item>
                  <Footer />
                </Grid>
                )}
            </Grid>
        </Box>
    );
};

