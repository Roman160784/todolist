import { PropTypes } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddIteamForm } from './componetrs/AddIteamForm';
// import { Button } from './componetrs/Button';
import { EditableSpan } from './componetrs/edditableSpan';
import { Tasks } from './componetrs/Tasks';
import { selectStatus } from './redux/selectors/app-selectors';
import { RootReducerType } from './redux/store';
import {  getTasksTC, TaskStatuses, TasksType } from './redux/task-reducer';
import { FilterValueType, RequestStatusType, TodolistDomainType } from './redux/todolist-reducer';


export type TodolistPropsType = {
    // todolistId: string
    // title: string
    // filter: FilterValueType
    todo: TodolistDomainType
    tasks: TasksType[]
    addTask: (todolistId: string, title: string) => void
    changeTitleInTL: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    removeTask: (todolistId: string, id: string) => void
    changeTitleInTask: (todolistId: string, id: string, title: string) => void
    removeTodolist: (todolistId: string) => void
}



export const Todolist = (props: TodolistPropsType) => {

    const dispatch = useDispatch()
    const appStatus = useSelector(selectStatus)

  useEffect(() => {
    dispatch(getTasksTC(props.todo.id))
  }, [])

  
    const changeFilterHandler = (value: FilterValueType) => {
        props.changeFilter(props.todo.id, value)  
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todo.id, title)
    }

    const changeTitleInTLHandler = (title: string) => {
        props.changeTitleInTL(props.todo.id, title)
    }

    let tasksForTL = props.tasks       

    if (props.todo.filter === "active") {
        tasksForTL = props.tasks.filter(t => t.status === TaskStatuses.New)
    }

    if(props.todo.filter === "completed") {
        tasksForTL = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
 
    const renderFilterButton = (buttonFirler: FilterValueType, 
    color: PropTypes.Color, text: string) => {
        return (
            <Button variant={props.todo.filter === buttonFirler ? 'contained' : 'text'} size={'small'} 
            color={'primary'} onClick={() => { changeFilterHandler(buttonFirler) }}>{text}
            </Button>
        )
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.todo.title} changeTitle={(title: string) => {changeTitleInTLHandler(title)}} />
                <IconButton aria-label="delete" color={'primary'} 
                size={'medium'} 
                disabled={appStatus === "loading"}
                onClick={() => {props.removeTodolist(props.todo.id)}}>
                    <Delete fontSize="inherit" />
                </IconButton>
            </h3>
            <div>
                <AddIteamForm title={""} addIteam={addTaskHandler} />
            </div>
            <ul>
                {tasksForTL.map(t => {
                    return (
                        <Tasks key={t.id} tasks={t}
                            todolistId={props.todo.id}
                            changeStatus={props.changeStatus}
                            removeTask={props.removeTask}
                            changeTitleInTask={props.changeTitleInTask}
                            />
                    )

                })}
            </ul>
            <div>
                {renderFilterButton('all','primary', 'ALL')}
                {renderFilterButton('active','primary', 'ACTIVE')}
                {renderFilterButton('completed','primary', 'COMPLETED')}
            </div>
        </div>
    )
}



