import { Dispatch } from "redux"
import { TLSSocket } from "tls"
import { v1 } from "uuid"
import { todolistAPI } from "../api/api-todolist"

import { RootReducerType } from "./store"
import { addTodolistACtype, getTodolistACtype, removeTodolistACtype } from "./todolist-reducer"




export type TasksType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TasksMainType = {
    [key: string]: TasksType[]
}

const initialState: TasksMainType = {

}

export const TaskReducer = (state: TasksMainType = initialState, action: MainActionTaskType): TasksMainType => {
    switch (action.type) {
        case 'TL/GET-TODOLIST': {
            const copySate = { ...state }
            action.todolist.forEach(tl => { copySate[tl.id] = [] })
            return copySate
        }
        case 'TASK/GET-TASK' : {
            return {...state, [action.todolistId] : action.tasks}
        }
        case 'TL/REMOVE-TODOLIST' : {
            const copySate = {...state}
            delete copySate[action.todolistId]
            return copySate
        }
        case 'TL/ADD-TODOLIST' : {
            return {...state, [action.todolist.id] : []}
        }
    }
    return state
}

export type MainActionTaskType = getTodolistACtype | getTasksACtype | removeTodolistACtype | addTodolistACtype

export type getTasksACtype = ReturnType<typeof getTasksAC>

export const getTasksAC = (tasks: TasksType[], todolistId: string) => ({type: 'TASK/GET-TASK',  tasks,  todolistId} as const)

export const getTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
        .then((res) => {
           dispatch(getTasksAC(res.data.items, todolistId)) 
        })
    }
}
