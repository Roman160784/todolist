import React from 'react';
import { Button } from './components/Button';
import { MainTasksType, TasksType } from './redux/task/task-reducers';

export type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    todolistID: string
    remuveTask : (todolistID: string, id: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

const removeTaskHandler = (id: string) => {props.remuveTask(props.todolistID, id)}



    return(
        <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {
               props.tasks.map(t => {
                   return <li key={t.id}>
                       <input type="checkbox" checked={t.isDone}/> 
                       <span>{t.title}</span>
                       <Button title='remove' class={''} onclick={()=>{removeTaskHandler(t.id)}}/>
                       </li>    
               })
            }
            
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
    )
}