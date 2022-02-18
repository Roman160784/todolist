import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddIteamForm } from './components/AddIteamForm';
import { Button } from './components/Button';
import { EditableSpan } from './components/EditableSpan';
import { Tasks } from './components/Tasks';
import { RequestStatusType } from './redux/app/app-reducer';

import { getTasksTC, MainTasksType, TaskStatuses, TasksType } from './redux/task/task-reducers';
import { fiterValueType } from './redux/todolist/todolist-reducers';

export type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    todolistID: string
    filter: fiterValueType
    entityStatus: RequestStatusType
    removeTodolist: (todolistID: string) => void
    remuveTask: (todolistID: string, id: string) => void  //
    addTask: (todolistID: string, title: string) => void
    changeTitleInTL: (todolistID: string, newTitle: string) => void
    changeFilter: (value: fiterValueType, todolistID: string) => void
    changeStatus: (todolistID: string, status: TaskStatuses, id: string) => void  //
    changeTitleInTask: (todolistID: string, newTitle: string, id: string) => void  //
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const dispatch = useDispatch()

    const removeTodolistHandler = useCallback(() => { props.removeTodolist(props.todolistID) }
    ,[props.removeTodolist, props.todolistID])
    const addIteamHandler = useCallback((title: string) => { props.addTask(props.todolistID, title) }, [props.todolistID])
    const changeFilterHandler = useCallback((value: fiterValueType) => { props.changeFilter(value, props.todolistID,)}
    ,[props.changeFilter, props.todolistID])
    const changeTitleInTLHandler = useCallback((newTitle: string) => { props.changeTitleInTL(props.todolistID, newTitle) }
    ,[props.changeTitleInTL, props.todolistID])
   
    useEffect(() => {
        dispatch((getTasksTC(props.todolistID)))
    },[])
    
    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                    changeTitleinSpan={(newTitle: string) => { changeTitleInTLHandler(newTitle) }} />
                <Button title='Remove todolist' class={""}
                    onclick={removeTodolistHandler} 
                    disabled={props.entityStatus === 'loading' ? true : false}/>
            </h3>
            <div className='title'>double click for correct title</div>
            <div>
                <AddIteamForm addIteam={(title: string) => { addIteamHandler(title) }} />
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        return (
                            <Tasks key={t.id} tasks={t} todolistID={props.todolistID} remuveTask={props.remuveTask} changeStatus={props.changeStatus} changeTitleInTask={props.changeTitleInTask}/>
                        )
                    })
                }             
            </ul>
            
            <div>
                <Button title='ALL' class={props.filter === "all" ? 'filter' : ""}
                onclick={() => { changeFilterHandler("all"); } } disabled={false} />
                <Button title='ACTIVE' class={props.filter === "active" ? 'filter' : ""}
                onclick={() => { changeFilterHandler("active"); } } disabled={false} />
                <Button title='COMPLETED' class={props.filter === "completed" ? 'filter' : ""}
                onclick={() => { changeFilterHandler("completed"); } } disabled={false} />
            </div>
        </div>
    )
})