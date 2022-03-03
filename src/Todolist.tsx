import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddIteamForm } from './componetrs/AddIteamForm';
import { Button } from './componetrs/Button';
import { EditableSpan } from './componetrs/edditableSpan';
import { Tasks } from './componetrs/Tasks';
import { getTasksTC, TasksMainType, TaskStatuses, TasksType } from './redux/task-reducer';
import { FilterValueType, TodolistDomainType, TodolistType } from './redux/todolist-reducer';

export type TodolistPropsType = {
    // todolistId: string
    // title: string
    // filter: FilterValueType
    todo: TodolistDomainType
    tasks: TasksType[]
    changeStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    changeTitleInTask: (title: string) => void
    removeTodolist: (todolistId: string) => void
}



export const Todolist = (props: TodolistPropsType) => {

    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getTasksTC(props.todo.id))
    },[])

    // const removeTodolistHandler = () => {
    //     props.removeTodolist
    // }

    const changeFilterHandler = (value: FilterValueType) => {
        props.changeFilter(props.todo.id, value)  
    }

    const ChangeTitleInTaskHandler = (title: string) => {
        props.changeTitleInTask(title)
    }

    let tasksForTL = props.tasks
    debugger            

    if (props.todo.filter === "active") {
        debugger
        tasksForTL = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    debugger
    if(props.todo.filter === "completed") {
        debugger
        tasksForTL = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    debugger


    return (
        <div>
            <h3>
                <EditableSpan title={props.todo.title} changeTitle={() => { }} />
                <Button title={"REMOVE"} class={''} onClick={() => {props.removeTodolist(props.todo.id)}}/>
            </h3>
            <div>
                <AddIteamForm title={''} addIteam={() => { }} />
            </div>
            <ul>
                {tasksForTL.map(t => {
                    return (
                        <Tasks key={t.id} tasks={t}
                            todolistId={props.todo.id}
                            changeStatus={props.changeStatus} />
                    )

                })}
            </ul>
            <div>
                <Button title={'ALL'} class={''} onClick={() => { changeFilterHandler('all') }} />
                <Button title={'ACTIVE'} class={''} onClick={() => { changeFilterHandler('active') }} />
                <Button title={'COMPLETED'} class={''} onClick={() => { changeFilterHandler('completed') }} />
            </div>
        </div>
    )
}


