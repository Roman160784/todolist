import { Dispatch } from "redux"
import { TLSSocket } from "tls"
import { v1 } from "uuid"
import { todolistAPI } from "../api/api-todolist"
import { RootReducerType } from "./store"
import { createTodolistACtype, getTodolistACtype, removeTodolistACtype } from "./todolist-reducer"



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
    switch(action.type){
        case 'TODOLIST/GET-TODOLIST': {
            const coppy = {...state};
            action.todolist.forEach(tl => { coppy[tl.id] = [] } )
            return coppy
        }
        case 'TASK/GET-TASK' : {
            return {...state, [action.todolistId] : action.task }
        }
        case 'TODOLIST/CREATE-TODOLIST' : {
            return {...state, [action.todolist.id] : []}
        }
        case 'TODOLIST/REMOVE-TODOLIST' : {
            const coppyState = {...state}
            delete coppyState[action.todolistId]
            return coppyState
        }
        case 'TASK/ADD-TASK' :{
            const newTask = action.task
            return {...state, [action.todolistId] 
            : [newTask, ...state[action.todolistId]]}
        }
    }
    return state
}

export type MainActionTaskType = getTodolistACtype | getTaskACtype | createTodolistACtype | removeTodolistACtype | addTaskACtype

export type getTaskACtype = ReturnType<typeof getTaskAC>
export type addTaskACtype = ReturnType<typeof addTaskAC>

export const getTaskAC = (todolistId: string, task: TasksType[]) => {
    return {
        type: 'TASK/GET-TASK',
        todolistId,
        task,
    }as const
}

export const addTaskAC = (todolistId: string, task: TasksType) => {
    return {
        type: 'TASK/ADD-TASK',
        todolistId,
        task,
    }as const
}

export const getTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(getTaskAC( todolistId, res.data.items))
        })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId, title)
        .then((res) => {
           dispatch(addTaskAC(todolistId, res.data.data.item)) 
        })
    }
}