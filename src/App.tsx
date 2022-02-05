import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerTypes } from './redux/store';
import { addTodolistAC, changeFilterAC, fiterValueType, TodolistsType } from './redux/todolist/todolist-reducers';
import { Todolist } from './Todolist';
import { addTaskAC, changeTaskStatusAC, MainTasksType, removeTaskAC } from './redux/task/task-reducers';
import { AddIteamForm } from './components/AddIteamForm';


 
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

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const changeFilter = (value: fiterValueType, todolistID: string) => {
        dispatch(changeFilterAC(value, todolistID))
    }

    const removeTodolist = (todolistID: string) => {
        
    }


    return (
        <div className="App">
            <AddIteamForm addIteam={addTodolist}/>
            { todolists.map(tl => {
                let tasksForTL = tasks[tl.id]
                if (tl.filter === "active") {
                    tasksForTL = tasks[tl.id].filter(t => t.isDone === false) 
                }
                if (tl.filter === "completed") {
                    tasksForTL = tasks[tl.id].filter(t => t.isDone === true) 
                }
                return<Todolist 
                key={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasksForTL}
                todolistID={tl.id}
                addTask={addTask}
                remuveTask={remuveTask}
                changeFilter={changeFilter}
                changeStatus={changeStatus}
                />
            })
            }
           
        </div>
    );
}

export default App;
