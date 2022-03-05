import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { AddIteamForm } from './componetrs/AddIteamForm';
import { RootReducerType } from './redux/store';
import { addTaskTC, TasksMainType, TaskStatuses } from './redux/task-reducer';
import { addTodolistTC, changeFilterAC, FilterValueType, getTodolistsTC, removeTodolistTC, TodolistDomainType, TodolistType, updateTodolistTC } from './redux/todolist-reducer';
import { Todolist } from './Todolist';

function App() {

    const todolist = useSelector <RootReducerType,TodolistDomainType[]>(state => state.todolist)
    const tasks = useSelector <RootReducerType,TasksMainType>(state => state.tasks)
    const dispatch = useDispatch() 

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

    const changeTitleInTask = (title: string) => {

    }

    const changeStatus = (todolistId: string, id: string, status: TaskStatuses) => {

    }

    const changeTitleInTL = (todolistId: string, title: string) => {
        dispatch(updateTodolistTC(todolistId, title))
    }

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])
    
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
                />
            }
            )
            }
           
        </div>
    );
}

export default App;
