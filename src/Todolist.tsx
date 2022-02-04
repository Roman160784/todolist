import React from 'react';
import { AddIteamForm } from './components/AddIteamForm';
import { Button } from './components/Button';
import { MainTasksType, TasksType } from './redux/task/task-reducers';

export type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    todolistID: string
    remuveTask : (todolistID: string, id: string) => void
    addTask: (todolistID: string,  title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

const removeTaskHandler = (id: string) => {props.remuveTask(props.todolistID, id)}
const addIteamHandler = ( title: string) => {props.addTask(props.todolistID,  title)}


    return(
        <div> 
        <h3>{props.title}</h3>
        
        <div>
            <AddIteamForm addIteam={(title: string)=> {addIteamHandler(title)}}/>
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