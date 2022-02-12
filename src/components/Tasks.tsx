import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { TaskStatuses, TasksType } from '../redux/task/task-reducers';
import { Button } from './Button';
import { EditableSpan } from './EditableSpan';

type TsaksPropsType = {
tasks: TasksType
todolistID: string
remuveTask: (todolistID: string, id: string) => void 
changeStatus: (todolistID: string, status: TaskStatuses, id: string) => void
changeTitleInTask: (todolistID: string, newTitle: string, id: string) => void
}


export const Tasks = React.memo( (props: TsaksPropsType) => {

    const removeTaskHandler = useCallback((id: string) => { props.remuveTask(props.todolistID, id)}
    , [props.remuveTask, props.todolistID])
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsdone = e.currentTarget.checked
        props.changeStatus(props.todolistID, newIsdone? TaskStatuses.Completed : TaskStatuses.New, props.tasks.id)  
    }
    const changeTitleInTaskHandler = useCallback((newTitle: string, id: string) => {
        props.changeTitleInTask(props.todolistID, newTitle, id)
    },[props.changeTitleInTask,props.todolistID]) 

    return ( 
        <li key={props.tasks.id} className={props.tasks.status === TaskStatuses.Completed ? "isDone" : "isDoneFalse"}>
            <input type="checkbox" checked={props.tasks.status === TaskStatuses.Completed} onChange={onChangeHandler} />
            <EditableSpan title={props.tasks.title} 
            changeTitleinSpan={(newTitle: string) => changeTitleInTaskHandler(newTitle, props.tasks.id) } />
            <Button title='Remove' class={""} onclick={() => { removeTaskHandler(props.tasks.id) }} />
        </li>

    )
})
