import React from 'react';
import { TasksType } from './redux/task-reducer';
import { FilterValueType, TodolistType } from './redux/todolist-reducer';

export type TodolistPropsType ={
    todolistId: string
    title:string
    filter: FilterValueType
    tasks: TasksType[]
}



export const Todolist = (props: TodolistPropsType) => {


    return (
        <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(t => {
                return  <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span></li>
            })}
           
        
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
    )
}