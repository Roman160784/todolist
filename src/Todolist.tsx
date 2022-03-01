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
    changeFilter: (value: FilterValueType) => void
    changeTitleInTask: (title: string) => void
}



export const Todolist = (props: TodolistPropsType) => {

    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getTasksTC(props.todolistId))
    },[])

    

    const changeFilterHandler = (value: FilterValueType) => {
        props.changeFilter(value)
    }

    const ChangeTitleInTaskHandler = (title: string) => {
        props.changeTitleInTask(title)
    }



    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={() => { }} />
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


