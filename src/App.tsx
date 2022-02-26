import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { RootReducerType } from './redux/store';
import { TasksMainType } from './redux/task-reducer';
import { TodolistType } from './redux/todolist-reducer';
import { Todolist } from './Todolist';

function App() {

    const todolist = useSelector <RootReducerType,TodolistType[]>(state => state.todolist)
    const tasks = useSelector <RootReducerType,TasksMainType>(state => state.tasks)
    const dispatch = useDispatch()

    
    
    return (
        <div className="App">
            {todolist.map(tl => {
                let allTasks = tasks[tl.id]



                return <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    filter={tl.filter} 
                    tasks={allTasks}               
                />
                    
                
            }
            )
            
            }
           
        </div>
    );
}

export default App;
