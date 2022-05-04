import React, { useEffect } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Button from '@material-ui/core/Button/Button';
import Container from '@material-ui/core/Container/Container';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import { Menu } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from './redux/store';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import { ErrorSnackbar } from './componetrs/ErrorSnackbar';
import { Login } from './componetrs/Login';
import { Route, Routes } from 'react-router-dom';
import { TodolistList } from './TodolistList';
import { logOutTC } from './redux/auth-reducer';
import { initializeAppTC } from './redux/app-reducer';
import { selectAutorised, selectStatus } from './redux/selectors/app-selectors';
import { selectIsLogin } from './redux/selectors/auth-selectors';
import { isExportDeclaration } from 'typescript';


function App() {

  const appStatus = useSelector(selectStatus)
  const isLogin = useSelector(selectIsLogin)
  const autorised = useSelector(selectAutorised)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  const logOutHandler = () => {
    dispatch(logOutTC())
  }
  
  if(!autorised) {
    return <LinearProgress/>
   }
  

  return <div className="App">
    {<ErrorSnackbar />}
    <AppBar position="static" >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Menu />
        </IconButton>
        <Typography >
          News
        </Typography>
         {isLogin && <Button onClick={logOutHandler} color="inherit">Login OUT</Button>}
      </Toolbar>
    </AppBar>
    {appStatus === 'loading' && <LinearProgress color="secondary" />}

    <Container fixed>
      <Routes>
        <Route path='/' element={<TodolistList />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<h1 style={{ textAlign: 'center', fontSize: '50px' }}>404 : PAGE NOT FOUND</h1>} />
      </Routes>
    </Container>
  </div>

}

export default App

