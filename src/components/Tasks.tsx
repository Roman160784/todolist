import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { TasksType } from '../redux/task/task-reducers';
import { Button } from './Button';
import { EditableSpan } from './EditableSpan';

type TsaksPropsType = {
tasks: TasksType
todolistID: string
remuveTask: (todolistID: string, id: string) => void 
changeStatus: (todolistID: string, isDone: boolean, id: string) => void
changeTitleInTask: (todolistID: string, newTitle: string, id: string) => void
}


export const Tasks = React.memo( (props: TsaksPropsType) => {

    const removeTaskHandler = useCallback((id: string) => { props.remuveTask(props.todolistID, id)}
    , [props.remuveTask, props.todolistID])
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsdone = e.currentTarget.checked
        props.changeStatus(props.todolistID, newIsdone, props.tasks.id)  
    }
    const changeTitleInTaskHandler = useCallback((newTitle: string, id: string) => {
        props.changeTitleInTask(props.todolistID, newTitle, id)
    },[props.changeTitleInTask,props.todolistID]) 

    return ( 
        <li key={props.tasks.id} className={props.tasks.isDone ? "isDone" : "isDoneFalse"}>
            <input type="checkbox" checked={props.tasks.isDone} onChange={onChangeHandler} />
            <EditableSpan title={props.tasks.title} 
            changeTitleinSpan={(newTitle: string) => changeTitleInTaskHandler(newTitle, props.tasks.id) } />
            <Button title='Remove' class={""} onclick={() => { removeTaskHandler(props.tasks.id) }} />
        </li>

    )
})
