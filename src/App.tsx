import React, { useCallback, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerTypes } from './redux/store';
import {  changeFilterAC, changeTitltInTlTC, createTodolistsTC, deleteTodolistTC, fiterValueType, getTodolistsTC,  TodolistsDomainType, } from './redux/todolist/todolist-reducers';
import { Todolist } from './Todolist';
import {  addTaskTC, MainTasksType, removeTaskAC, removeTaskTC, TaskStatuses, updateTaskTC } from './redux/task/task-reducers';
import { AddIteamForm } from './components/AddIteamForm';
import { Preloader } from './components/preloader/Preloader';
import {  RequestStatusType } from './redux/app/app-reducer';



function App() {

    const tasks = useSelector<rootReducerTypes, MainTasksType>(state => state.task);
    const todolists = useSelector<rootReducerTypes, TodolistsDomainType[]>(state => state.todolist);
    const status = useSelector<rootReducerTypes, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch();


    const remuveTask = useCallback((todolistID: string, id: string) => {
        dispatch(removeTaskTC(todolistID, id))
    }, [dispatch])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskTC(todolistID, title))
    }, [dispatch])

    const changeStatus = useCallback((todolistID: string, status: TaskStatuses, id: string) => {
        dispatch(updateTaskTC(todolistID, {status}, id))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistsTC(title))
    }, [dispatch])

    const changeFilter = useCallback((value: fiterValueType, todolistID: string) => {
        dispatch(changeFilterAC(value, todolistID))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(deleteTodolistTC(todolistID))
    }, [dispatch])

    const changeTitleInTL = useCallback((todolistID: string, newTitle: string) => {
        dispatch(changeTitltInTlTC(todolistID, newTitle))
    }, [dispatch])

    const changeTitleInTask = useCallback((todolistID: string, newTitle: string, id: string) => {
        dispatch(updateTaskTC(todolistID, {title: newTitle}, id))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTodolistsTC())
    },[])

    return (
        <div className="App">
            <div>
                {status === "loading" && <Preloader/>}
            </div>
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
