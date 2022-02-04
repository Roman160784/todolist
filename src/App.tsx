import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerTypes } from './redux/store';
import { TodolistsType } from './redux/todolist/todolist-reducers';
import { Todolist } from './Todolist';
import { MainTasksType, removeTaskAC } from './redux/task/task-reducers';

 
function App() {

    const tasks = useSelector <rootReducerTypes, MainTasksType>(state => state.task);
    const todolists = useSelector<rootReducerTypes, TodolistsType[]>(state =>state.todolist);
    const dispatch = useDispatch();

    const remuveTask = (todolistID: string, id: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }



    return (
        <div className="App">
            { todolists.map(tl => {
                return<Todolist 
                key={tl.id}
                title={tl.title}
                tasks={tasks[tl.id]}
                todolistID={tl.id}
                remuveTask={remuveTask}
                />
            })
            }
           
        </div>
    );
}

export default App;
