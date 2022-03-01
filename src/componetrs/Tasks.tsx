import React from "react"
import { ChangeEvent } from "react"
import { TaskStatuses, TasksType } from "../redux/task-reducer"
import { Button } from "./Button"
import { EditableSpan } from "./edditableSpan"



type PropsTasksType = {
    tasks: TasksType
    todolistId: string
    changeStatus: (todolistId: string, id: string, status: TaskStatuses) => void
}



export const Tasks = (props: PropsTasksType) => {

    const changeSatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDone = e.currentTarget.checked
        props.changeStatus(props.todolistId, props.tasks.id, newIsDone ? TaskStatuses.Completed : TaskStatuses.New)
    }

    return (
        <li key={props.tasks.id}>
            <input type="checkbox" checked={props.tasks.status === TaskStatuses.Completed}
                onChange={changeSatusHandler} />
            <EditableSpan title={props.tasks.title} changeTitle={() => { }} />
            <Button title={"Remuve"} class={''} onClick={() => { }} />
        </li>
    )
}