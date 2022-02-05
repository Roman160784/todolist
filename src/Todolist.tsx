import React, { ChangeEvent } from 'react';
import { AddIteamForm } from './components/AddIteamForm';
import { Button } from './components/Button';
import { EditableSpan } from './components/EditableSpan';
import { MainTasksType, TasksType } from './redux/task/task-reducers';
import { fiterValueType } from './redux/todolist/todolist-reducers';

export type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    todolistID: string
    filter: fiterValueType
    removeTodolist: (todolistID: string) => void
    remuveTask: (todolistID: string, id: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTitleInTL: (todolistID: string, newTitle: string) => void
    changeFilter: (value: fiterValueType, todolistID: string) => void
    changeStatus: (todolistID: string, isDone: boolean, id: string) => void
    changeTitleInTask: (todolistID: string, newTitle: string, id: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const removeTodolistHandler = () => { props.removeTodolist(props.todolistID) }
    const removeTaskHandler = (id: string) => { props.remuveTask(props.todolistID, id) }
    const addIteamHandler = (title: string) => { props.addTask(props.todolistID, title) }
    const changeFilterHandler = (value: fiterValueType) => { props.changeFilter(value, props.todolistID,) }
    const changeTitleInTLHandler = (newTitle: string) => { props.changeTitleInTL(props.todolistID, newTitle) }
    const changeTitleInTaskHandler = (newTitle: string, id: string) => {
        props.changeTitleInTask(props.todolistID, newTitle, id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                    changeTitleinSpan={(newTitle: string) => { changeTitleInTLHandler(newTitle) }} />
                <Button title='Remove todolist' class={""}
                    onclick={removeTodolistHandler} />
            </h3>
            <div className='title'>double click for correct title</div>
            <div>
                <AddIteamForm addIteam={(title: string) => { addIteamHandler(title) }} />
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        {
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsdone = e.currentTarget.checked
                                props.changeStatus(props.todolistID, newIsdone, t.id)
                            }

                            return <li key={t.id} className={t.isDone ? "isDone" : "isDoneFalse"}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />
                                <EditableSpan title={t.title}
                                    changeTitleinSpan={(newTitle: string) => { changeTitleInTaskHandler(newTitle, t.id) }} />
                                <Button title='Remove' class={""}
                                    onclick={() => { removeTaskHandler(t.id) }} />
                            </li>
                        }
                    })
                }

            </ul>
            <div>
                <Button title='ALL' class={props.filter === "all" ? 'filter' : ""}
                    onclick={() => { changeFilterHandler("all") }} />
                <Button title='ACTIVE' class={props.filter === "active" ? 'filter' : ""}
                    onclick={() => { changeFilterHandler("active") }} />
                <Button title='COMPLETED' class={props.filter === "completed" ? 'filter' : ""}
                    onclick={() => { changeFilterHandler("completed") }} />
            </div>
        </div>
    )
}