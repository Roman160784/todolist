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
    addTask: (todolistId: string, title: string) => void
    changeTitleInTL: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    removeTask: (todolistId: string, id: string) => void
    changeTitleInTask: (title: string) => void
    removeTodolist: (todolistId: string) => void
}



export const Todolist = (props: TodolistPropsType) => {

    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getTasksTC(props.todo.id))
    },[])

    const changeFilterHandler = (value: FilterValueType) => {
        props.changeFilter(props.todo.id, value)  
    }

    const ChangeTitleInTaskHandler = (title: string) => {
        props.changeTitleInTask(title)
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
                <Button title={"REMOVE"} class={''} onClick={() => {props.removeTodolist(props.todo.id)}}/>
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
                            />
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


