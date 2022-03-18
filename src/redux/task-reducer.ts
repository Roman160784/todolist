import { Dispatch } from "redux"
import { TLSSocket } from "tls"
import { v1 } from "uuid"

import { RootReducerType } from "./store"




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
    [key: string] : TasksType[]
}

const initialState: TasksMainType = {
   
}

export const TaskReducer = (state: TasksMainType = initialState, action: MainActionTaskType): TasksMainType  => {
    
    return state
}

export type MainActionTaskType = ''

