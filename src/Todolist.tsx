import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddIteamForm } from './componetrs/AddIteamForm';
import { Button } from './componetrs/Button';
import { EditableSpan } from './componetrs/edditableSpan';
import { Tasks } from './componetrs/Tasks';
import { getTasksTC, TasksMainType, TaskStatuses, TasksType } from './redux/task-reducer';
import { FilterValueType, TodolistType } from './redux/todolist-reducer';

export type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterValueType
    tasks: TasksType[]
    tasksForTL: TasksType[]
    changeStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    changeTitleInTask: (title: string) => void
    removeTodolist: (todolistId: string) => void
}



export const Todolist = (props: TodolistPropsType) => {

    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getTasksTC(props.todolistId))
    },[])

    // const removeTodolistHandler = () => {
    //     props.removeTodolist
    // }

    const changeFilterHandler = (value: FilterValueType) => {
        props.changeFilter(props.todolistId, value)
    }

    const ChangeTitleInTaskHandler = (title: string) => {
        props.changeTitleInTask(title)
    }



    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={() => { }} />
                <Button title={"REMOVE"} class={''} onClick={() => {props.removeTodolist(props.todolistId)}}/>
            </h3>
            <div>
                <AddIteamForm title={''} addIteam={() => { }} />
            </div>
            <ul>
                {props.tasks.map(t => {
                    return (
                        <Tasks key={t.id} tasks={t}
                            todolistId={props.todolistId}
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


