import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { AddIteamForm } from './componetrs/AddIteamForm';
import { RootReducerType } from './redux/store';
import { TasksMainType, TaskStatuses } from './redux/task-reducer';
import { addTodolistTC, changeFilterAC, FilterValueType, getTodolistsTC, removeTodolistTC, TodolistDomainType, TodolistType } from './redux/todolist-reducer';
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

    const changeTitleInTask = (title: string) => {

    }

    const changeStatus = (todolistId: string, id: string, status: TaskStatuses) => {

    }

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])
    
    return (
        <div className="App">
            <AddIteamForm title={''} addIteam={addTodolist}/>
            
            {todolist.map(tl => {
                
                let tasksForTL = tasks[tl.id]

                if(tl.filter = "all") {
                    tasksForTL = tasks[tl.id].filter(t => t.completed === false)
                }
                if(tl.filter = "completed") {
                    tasksForTL = tasks[tl.id].filter(t => t.completed === false)
                }
              

                return <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    filter={tl.filter} 
                    tasks={tasks[tl.id]}
                    tasksForTL={tasksForTL} 
                    changeFilter={changeFilter}
                    removeTodolist={removeTodolist}
                    changeTitleInTask={changeTitleInTask}
                    changeStatus={changeStatus}             
                />
            }
            )
            }
           
        </div>
    );
}

export default App;
