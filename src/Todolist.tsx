import React from 'react';
import { AddIteamForm } from './componetrs/AddIteamForm';
import { Button } from './componetrs/Button';
import { TasksType } from './redux/task-reducer';
import { FilterValueType, TodolistType } from './redux/todolist-reducer';

export type TodolistPropsType ={
    todolistId: string
    title:string
    filter: FilterValueType
    tasks: TasksType[]
    tasksForTL: TasksType[]
    changeFilter: (value: FilterValueType) => void
}



export const Todolist = (props: TodolistPropsType) => {

    const changeFilterHandler = (value: FilterValueType) => {
         props.changeFilter(value)
    }

    return (
        <div>
        <h3>{props.title}</h3>
        <div>
        <AddIteamForm title={''} addIteam={()=>{}}/>
        </div>
        <ul>
            {props.tasks.map(t => {
                return  <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span></li>
            })}
           
        
        </ul>
        <div>
            <Button title={'ALL'} class={''} onClick={() => {changeFilterHandler('all')} }/>
            <Button title={'ACTIVE'} class={''} onClick={ () => {changeFilterHandler('active')}}/>
            <Button title={'COMPLETED'} class={''} onClick={() => {changeFilterHandler('completed')} }/>
        </div>
    </div>
    )
}