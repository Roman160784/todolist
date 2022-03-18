import Button from '@material-ui/core/Button/Button';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddIteamForm } from './componetrs/AddIteamForm';
// import { Button } from './componetrs/Button';
import { EditableSpan } from './componetrs/edditableSpan';
import { Tasks } from './componetrs/Tasks';
import {   getTaskTC, TaskStatuses, TasksType } from './redux/task-reducer';
import { FilterValueType, TodolistDomainType } from './redux/todolist-reducer';


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

  useEffect(() => {
    dispatch(getTaskTC(props.todo.id))
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
 


    return (
        <div>
            <h3>
                <EditableSpan title={props.todo.title} changeTitle={(title: string) => {changeTitleInTLHandler(title)}} />
                <IconButton aria-label="delete" color={'primary'} size={'medium'} onClick={() => {props.removeTodolist(props.todo.id)}}>
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
            <Button variant={props.todo.filter === 'all'? 'contained' : 'text'} size={'small'} 
            color={'primary'} onClick={() => { changeFilterHandler('all') }}>ALL
            </Button>
            <Button variant={props.todo.filter === 'active' ? 'contained' : 'text'} size={'small'}
             color={'primary'} onClick={() => { changeFilterHandler('active') }}>ACTIVE
             </Button>
            <Button  variant={props.todo.filter ===  'completed' ? 'contained' : 'text'} size={'small'}
             color={'primary'} onClick={() => { changeFilterHandler('completed') }}>COMPLETED
             </Button>
               
            </div>
        </div>
    )
}


