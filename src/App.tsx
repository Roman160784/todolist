import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { AddIteamForm } from './componetrs/AddIteamForm';
import { RootReducerType } from './redux/store';
import { TasksMainType } from './redux/task-reducer';
import { FilterValueType, TodolistType } from './redux/todolist-reducer';
import { Todolist } from './Todolist';

function App() {

    const todolist = useSelector <RootReducerType,TodolistType[]>(state => state.todolist)
    const tasks = useSelector <RootReducerType,TasksMainType>(state => state.tasks)
    const dispatch = useDispatch()

    const changeFilter = (value: FilterValueType) => {
     
    }
    
    return (
        <div className="App">
            <AddIteamForm title={''} addIteam={()=>{}}/>
            {todolist.map(tl => {
                let allTasks = tasks[tl.id]
                let tasksForTL = allTasks

                if(tl.filter = "all") {
                    tasksForTL = allTasks.filter(t => t.isDone === false)
                }
                if(tl.filter = "completed") {
                    tasksForTL = allTasks.filter(t => t.isDone === false)
                }
              

                return <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    filter={tl.filter} 
                    tasks={allTasks}
                    tasksForTL={tasksForTL} 
                    changeFilter={changeFilter}              
                />
                    
                
            }
            )
            
            }
           
        </div>
    );
}

export default App;
