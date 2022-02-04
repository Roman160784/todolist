import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerTypes } from './redux/store';
import { TodolistsType } from './redux/todolist/todolist-reducers';
import { Todolist } from './Todolist';
import { addTaskAC, changeTaskStatusAC, MainTasksType, removeTaskAC } from './redux/task/task-reducers';

 
function App() {

    const tasks = useSelector <rootReducerTypes, MainTasksType>(state => state.task);
    const todolists = useSelector<rootReducerTypes, TodolistsType[]>(state =>state.todolist);
    const dispatch = useDispatch();

    const remuveTask = (todolistID: string, id: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }

    const addTask = (todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }

    const changeStatus = (todolistID: string, isDone: boolean, id: string) => {
        dispatch(changeTaskStatusAC(todolistID, isDone, id))
    }


    return (
        <div className="App">
            { todolists.map(tl => {
                return<Todolist 
                key={tl.id}
                title={tl.title}
                tasks={tasks[tl.id]}
                todolistID={tl.id}
                addTask={addTask}
                remuveTask={remuveTask}
                changeStatus={changeStatus}
                />
            })
            }
           
        </div>
    );
}

export default App;
