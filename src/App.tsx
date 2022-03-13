import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { AddIteamForm } from './componetrs/AddIteamForm';
import { RootReducerType } from './redux/store';
import {  TasksMainType, TaskStatuses, } from './redux/task-reducer';
import {  createTodolistTC, FilterValueType, getTodolistTC, TodolistDomainType,  } from './redux/todolist-reducer';
import { Todolist } from './Todolist';

function App() {

   useEffect(() =>{
       dispatch(getTodolistTC())
   }, [])

    const todolist = useSelector <RootReducerType,TodolistDomainType[]>(state => state.todolist)
    const tasks = useSelector <RootReducerType,TasksMainType>(state => state.tasks)
    const dispatch = useDispatch() 

    const addTodolist = (title: string) => {
        dispatch(createTodolistTC(title))
    }

    const removeTodolist = (todolistId: string) => {
      
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

  

 
    
    return (
        <div className="App">
            <AddIteamForm title={''} addIteam={addTodolist}/>
            
            {todolist.map(tl => {
                
                return <Todolist
                    key={tl.id}
                    // todolistId={tl.id}
                    // title={tl.title}
                    // filter={tl.filter} 
                    todo={tl}
                    tasks={tasks[tl.id]}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    removeTodolist={removeTodolist}
                    changeTitleInTask={changeTitleInTask}
                    changeTitleInTL={changeTitleInTL}
                    changeStatus={changeStatus} 
                    removeTask={removeTask}            
                />
            }
            )
            }
           
        </div>
    );
}

export default App;
