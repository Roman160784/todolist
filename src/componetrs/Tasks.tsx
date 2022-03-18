import { Checkbox } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton/IconButton"
import { Delete } from "@material-ui/icons"
import React from "react"
import { ChangeEvent } from "react"
import { TaskStatuses, TasksType } from "../redux/task-reducer"
import { Button } from "./Button"
import { EditableSpan } from "./edditableSpan"



type PropsTasksType = {
    tasks: TasksType
    todolistId: string
    removeTask: (todolistId: string, id: string) => void
    changeStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeTitleInTask: (todolistId: string, id: string, title: string) => void
}



export const Tasks = (props: PropsTasksType) => {

    const removeTaskHandler = (id: string) => {
        props.removeTask(props.todolistId, id)
    }

    const changeSatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDone = e.currentTarget.checked
        props.changeStatus(props.todolistId, props.tasks.id, newIsDone ? TaskStatuses.Completed : TaskStatuses.New)
    }

    const ChangeTitleInTaskHandler = (title: string) => {
        props.changeTitleInTask( props.todolistId, props.tasks.id, title)
    }

    return (
        <div key={props.tasks.id}>
            <Checkbox size={"small"} checked={props.tasks.status === TaskStatuses.Completed}
                onChange={changeSatusHandler} />
            <EditableSpan title={props.tasks.title} changeTitle={(title: string) => {ChangeTitleInTaskHandler(title)}} />
            <IconButton color={"primary"} aria-label="delete" size="small" onClick={() => {removeTaskHandler(props.tasks.id)}}>
                <Delete fontSize="small" />
            </IconButton>
        </div>
    )
}