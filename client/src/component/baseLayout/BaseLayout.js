import React, {useEffect, useState} from 'react';
import Style from './BaseLayout.module.scss'
import Navbar from './navBar/navBar.js';
import Footer from './footer/footer.js'
import Home from '../home/home.js'
import Games from '../games/games.js'
import Top2023 from '../top2023/top2023.js'
import GameDetail from '../gameDetail/gameDetail.js'
import Users from '../users/users.js'
import Login from '../login/login.js'
import {Route, Routes} from "react-router-dom";
import {Box, Grid} from "@mui/material";

export default function BaseLayout() {
  let [darkMode, setDarkMode] = useState(false);

  function handleToggleDarkMode() {
      let oppositeOfCurrentDarkMode = !darkMode
      console.log(oppositeOfCurrentDarkMode)
      localStorage.setItem('darkMode', `${oppositeOfCurrentDarkMode}`)
      setDarkMode(oppositeOfCurrentDarkMode)
  }

  useEffect(() => {
      let detectedDarkMode = eval(localStorage.getItem('darkMode'));

      if  (detectedDarkMode) {
          setDarkMode(detectedDarkMode)
      } else {
        localStorage.setItem('darkMode', 'false')
      }
}, [])

return (
<Box className={darkMode ? Style.dark : Style.light}>
<Grid container display={'flex'} flexDirection={'column'}  minHeight={'100vh'}
      justifyContent={'space-between'}>
    <Grid item >
      <Navbar darkMode={darkMode} handleClick={handleToggleDarkMode}/>
    </Grid>
    <Grid item flexGrow={1} display={'flex'} justifyContent={'center'} alignItems={'flex-start'} minHeight={'100vh'}>
      <Routes>
        <Route exact path={'/'} element={<Home/>}/>
        <Route path={'/games'} element={<Games/>}/>
        <Route path={'/top2023'} element={<Top2023/>}/>
        <Route path={'/register'} element={<Users/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/games/:gameId'} element={<GameDetail/>}/>
      </Routes>
    </Grid>
    <Grid item>
      <Footer/>
    </Grid>
</Grid>
</Box>
)
};


