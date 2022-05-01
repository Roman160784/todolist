
import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootReducerType } from "./redux/store"
import { addTaskTC, removeTaskTC, TasksMainType, TaskStatuses, updateTaskTC } from "./redux/task-reducer"
import { addTodolistTC, changeTodolistFilterAC, changeTodolistTitleTC, FilterValueType, getTodolistsTC, removeTodolistTC, RequestStatusType, TodolistDomainType } from "./redux/todolist-reducer"
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import { AddIteamForm } from './componetrs/AddIteamForm';
import { Todolist } from './Todolist';
import { Navigate } from "react-router-dom"




export const TodolistList = () => {
    
    const todolist = useSelector <RootReducerType, TodolistDomainType[]>(state => state.todolist)
    const tasks = useSelector <RootReducerType, TasksMainType>(state => state.tasks)
    const isLogin = useSelector<RootReducerType, boolean>(state => state.auth.isLogin)

    const dispatch = useDispatch() 

    useEffect(() => {
      dispatch(getTodolistsTC())
    }, [])
    
   

    const addTodolist = (title: string) => {
      dispatch(addTodolistTC(title))
    }

    const removeTodolist = (todolistId: string) => {
      dispatch(removeTodolistTC(todolistId))
    }

    const changeFilter = (todolistId: string, value: FilterValueType) => { 
        dispatch(changeTodolistFilterAC({todolistId, value}))
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
        dispatch(changeTodolistTitleTC(todolistId, title))
    }

    if(!isLogin){
      return <Navigate to='/login'/>
    }

    return <>
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
      </>
}