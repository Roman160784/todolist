import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { AddIteamForm } from './componetrs/AddIteamForm';
import { RootReducerType } from './redux/store';
import { TasksMainType, TaskStatuses } from './redux/task-reducer';
import { FilterValueType, getTodolistsTC, TodolistDomainType, TodolistType } from './redux/todolist-reducer';
import { Todolist } from './Todolist';

function App() {

    const todolist = useSelector <RootReducerType,TodolistDomainType[]>(state => state.todolist)
    const tasks = useSelector <RootReducerType,TasksMainType>(state => state.tasks)
    const dispatch = useDispatch() 

    const changeFilter = (value: FilterValueType) => {
     
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
            <AddIteamForm title={''} addIteam={()=>{}}/>
            
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
