import React, { ChangeEvent } from 'react';
import { AddIteamForm } from './components/AddIteamForm';
import { Button } from './components/Button';
import { MainTasksType, TasksType } from './redux/task/task-reducers';
import { fiterValueType } from './redux/todolist/todolist-reducers';

export type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    todolistID: string
    filter: fiterValueType
    remuveTask : (todolistID: string, id: string) => void
    addTask: (todolistID: string,  title: string) => void
    changeFilter: (value: fiterValueType, todolistID: string) => void
    changeStatus: (todolistID: string, isDone: boolean, id: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

const removeTaskHandler = (id: string) => {props.remuveTask(props.todolistID, id)}
const addIteamHandler = ( title: string) => {props.addTask(props.todolistID,  title)}

const changeFilterHandler = (value: fiterValueType) => {props.changeFilter(value, props.todolistID,)}

    

    return(
        <div> 
        <h3>{props.title}</h3>
        
        <div>
            <AddIteamForm addIteam={(title: string)=> {addIteamHandler(title)}}/>
        </div>
        <ul>
            {
               props.tasks.map(t => {
                {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsdone = e.currentTarget.checked
                        props.changeStatus(props.todolistID, newIsdone, t.id)
                    }
                

                   return <li key={t.id}>
                       
                       <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/> 
                       <span>{t.title}</span>
                       
                       </li>    
              } })
            }
            
        </ul>
        <div>
        <Button title='ALL' class={props.filter === "all" ? 'filter' : ""} 
        onclick={()=>{changeFilterHandler("all")}}/>
        <Button title='ACTIVE' class={props.filter === "active" ? 'filter' : ""} 
        onclick={()=>{changeFilterHandler("active")}}/>
        <Button title='COMPLETED' class={props.filter === "completed" ? 'filter' : ""} 
        onclick={()=>{changeFilterHandler("completed")}}/>
        </div>
    </div>
    )
}