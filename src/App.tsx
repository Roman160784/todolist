import React, { useCallback, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerTypes } from './redux/store';
import { addTodolistAC, changeFilterAC, changeTitleInTLAC, fiterValueType, getTodolistsTC, removeTodolistAC, TodolistsDomainType,  } from './redux/todolist/todolist-reducers';
import { Todolist } from './Todolist';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, MainTasksType, removeTaskAC, TaskStatuses } from './redux/task/task-reducers';
import { AddIteamForm } from './components/AddIteamForm';



function App() {

    const tasks = useSelector<rootReducerTypes, MainTasksType>(state => state.task);
    const todolists = useSelector<rootReducerTypes, TodolistsDomainType[]>(state => state.todolist);
    const dispatch = useDispatch();


    const remuveTask = useCallback((todolistID: string, id: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }, [])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }, [])

    const changeStatus = useCallback((todolistID: string, status: TaskStatuses, id: string) => {
        dispatch(changeTaskStatusAC(todolistID, status, id))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])

    const changeFilter = useCallback((value: fiterValueType, todolistID: string) => {
        dispatch(changeFilterAC(value, todolistID))
    }, [])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }, [])

    const changeTitleInTL = useCallback((todolistID: string, newTitle: string) => {
        dispatch(changeTitleInTLAC(todolistID, newTitle))
    }, [])

    const changeTitleInTask = useCallback((todolistID: string, newTitle: string, id: string) => {
        dispatch(changeTaskTitleAC(todolistID, newTitle, id))
    }, [])

    useEffect(() => {
        dispatch(getTodolistsTC())
    },[])

    return (
        <div className="App">
            <AddIteamForm addIteam={addTodolist} />
            {todolists.map(tl => {
                let tasksForTL = tasks[tl.id]
                if (tl.filter === "active") {
                    tasksForTL = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                }
                if (tl.filter === "completed") {
                    tasksForTL = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
                }
                
                
                return <Todolist
                    key={tl.id}
                    filter={tl.filter}
                    title={tl.title}
                    tasks={tasksForTL}
                    todolistID={tl.id}
                    addTask={addTask}
                    remuveTask={remuveTask}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    removeTodolist={removeTodolist}
                    changeTitleInTL={changeTitleInTL}
                    changeTitleInTask={changeTitleInTask}

                />
            })
            }

        </div>
    );
}

export default App;
