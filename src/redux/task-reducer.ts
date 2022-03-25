
import {  AxiosError } from "axios"
import { Dispatch } from "redux"
import { TLSSocket } from "tls"
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
   switch(action.type){
       case 'TL/GET-TODOLIST': {
           const coppyState = {...state}
           action.todolist.forEach(tl => {coppyState[tl.id] = []})
           return coppyState
       }
       case 'TASKS/DET-TASK' : {
           return {...state, [action.todolistId] : action.tasks}
       }
       case 'TL/ADD-TODOLIST' : {
          return {...state, [action.todolist.id] : []}
       }
       case 'TL/REMOVE-TODOLIST': {
        const coppyState = {...state}
        delete coppyState[action.todolistId]
        return coppyState
       }
   }

    return state
}

export type MainActionTaskType = getTodolistACtype | getTasksACtype | addTodolistACtype | removeTodolistACtype

export type getTasksACtype = ReturnType<typeof getTasksAC>

export const getTasksAC = (todolistId: string, tasks: TasksType[]) => ({type: 'TASKS/DET-TASK', todolistId, tasks} as const)

export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
    }
}