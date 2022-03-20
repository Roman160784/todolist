import AppBar from '@material-ui/core/AppBar/AppBar';
import Box from '@material-ui/core/Box/Box';
import Button from '@material-ui/core/Button/Button';
import Container from '@material-ui/core/Container/Container';
import Grid from '@material-ui/core/Grid/Grid';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Paper from '@material-ui/core/Paper/Paper';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import { Menu } from '@material-ui/icons';
import React, { useEffect,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { AddIteamForm } from './componetrs/AddIteamForm';
import { RootReducerType } from './redux/store';
import {  TasksMainType, TaskStatuses } from './redux/task-reducer';
import {  addTodolistTC, FilterValueType,  getTodolistTC, removeTlTC, TodolistDomainType } from './redux/todolist-reducer';
import { Todolist } from './Todolist';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import { ErrorSnackbar } from './componetrs/ErrorSnackbar';





function App() {

  useEffect(() => {
    dispatch(getTodolistTC())
  }, [])
 

    const todolist = useSelector <RootReducerType,TodolistDomainType[]>(state => state.todolist)
    const tasks = useSelector <RootReducerType,TasksMainType>(state => state.tasks)
    
    
    const dispatch = useDispatch() 

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    const removeTodolist = (todolistId: string) => {
      dispatch(removeTlTC(todolistId))
    }

    const changeFilter = (todolistId: string, value: FilterValueType) => { 
      
    }

    const addTask = (todolistId: string, title: string) => {
    
    }

    const removeTask = (todolistId: string, id: string) => {
        
    }

    const changeTitleInTask = (todolistId: string, id: string, title: string) => {
        
    }

    const changeStatus = (todolistId: string, id: string, status: TaskStatuses) => {
       
    }

    const changeTitleInTL = (todolistId: string, title: string) => {
        
    }

    
    return <div className="App">
    { <ErrorSnackbar/> }
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {<LinearProgress color="secondary"/> }
        <Container fixed>
            <Grid  style={{padding: "30px"}} container>
            <AddIteamForm title={''} addIteam={addTodolist}/>
            </Grid>
            <Grid container spacing={5}>
            {todolist.map(tl => {
                
                return <Grid item> 
               <Paper elevation={5} style={{padding: "10px"}}>
                    <Todolist 
                    key={tl.id}
                    todo={tl}
                    tasks={tasks[tl.id]}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    removeTodolist={removeTodolist}
                    changeTitleInTask={changeTitleInTask}
                    changeTitleInTL={changeTitleInTL}
                    changeStatus={changeStatus} 
                    removeTask={removeTask} /> 
                      </Paper>  
                        </Grid>  
            })
            }
              </Grid>
            </Container>
        </div>
  
}

export default App;
