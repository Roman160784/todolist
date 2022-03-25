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
import {  addTaskTC, removeTaskTC, TasksMainType, TaskStatuses, updateTaskTC,  } from './redux/task-reducer';
import {  addTodolistTC, changeFilterAC, FilterValueType, getTodolistTC, removeTodolistTC, RequestStatusType, TodolistDomainType, updateTlTitleTC } from './redux/todolist-reducer';
import { Todolist } from './Todolist';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import { ErrorSnackbar } from './componetrs/ErrorSnackbar';





function App() {

  
 

    const todolist = useSelector <RootReducerType, TodolistDomainType[]>(state => state.todolist)
    const tasks = useSelector <RootReducerType, TasksMainType>(state => state.tasks)
    const appStatus = useSelector<RootReducerType, RequestStatusType> (state => state.app.appStatus)

    const dispatch = useDispatch() 

    useEffect(()=> {
      dispatch(getTodolistTC())
    }, [])
    
   

    const addTodolist = (title: string) => {
       dispatch(addTodolistTC(title))
    }

    const removeTodolist = (todolistId: string) => {
      dispatch(removeTodolistTC(todolistId))
    }

    const changeFilter = (todolistId: string, value: FilterValueType) => { 
        dispatch(changeFilterAC(todolistId, value))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }

    const removeTask = (todolistId: string, id: string) => {
       dispatch(removeTaskTC(todolistId, id))
    }

    const changeTitleInTask = (todolistId: string, id: string, title: string) => {
        dispatch(updateTaskTC(todolistId, id, {title}))
    }

    const changeStatus = (todolistId: string, id: string, status: TaskStatuses) => {
      dispatch(updateTaskTC(todolistId, id, {status}))
    }

    const changeTitleInTL = (todolistId: string, title: string) => {
      dispatch(updateTlTitleTC(todolistId, title))
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
      { appStatus === 'loading' &&  <LinearProgress color="secondary"/>  }
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
