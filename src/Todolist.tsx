import React from 'react';
import { AddIteamForm } from './componetrs/AddIteamForm';
import { Button } from './componetrs/Button';
import { EditableSpan } from './componetrs/edditableSpan';
import { TasksType } from './redux/task-reducer';
import { FilterValueType, TodolistType } from './redux/todolist-reducer';

export type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterValueType
    tasks: TasksType[]
    tasksForTL: TasksType[]
    changeFilter: (value: FilterValueType) => void
    ChangeTitleInTask: (title: string) => void
}



export const Todolist = (props: TodolistPropsType) => {

    const changeFilterHandler = (value: FilterValueType) => {
        props.changeFilter(value)
    }

    const ChangeTitleInTaskHandler = (title: string) => {
        props.ChangeTitleInTask(title)
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
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} />
                        <EditableSpan title={t.title} changeTitle={() => { }} />
                    </li>
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