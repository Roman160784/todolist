
import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { TLSSocket } from "tls"
import { todolistAPI } from "../api/api-todolist"
import { serverErrorHandler } from "../util/errorUtils"

import { setAppErrorAC, setAppStatusAC } from "./app-reducer"



export type FilterValueType = "all" | "active" | "completed"
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export enum ResultCode {
    succes = 0,
    fail = 1,
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}



let initialState: TodolistDomainType[] = [
  
]

export const TodolistReducer = (state: TodolistDomainType[] = initialState, action: MainTodolistActionType): TodolistDomainType[] => {
    switch (action.type)  {
        case 'TODOLIST/GET-TODOLIST': {
            return action.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'succeeded'}))
        }
        case 'TODOLIST/ADD-TODOLIST' : {
            return [{ ...action.todolist, filter: 'all', entityStatus: 'succeeded'}, ...state]
        }
        case 'TODOLIST/REMOVE-TODOLIST' : {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'TODOLIST/CHANGR-TODOLIST-TITLE' : {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        case 'TODOLIST/CHANGE-FILTER' : {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.value} : tl)
        }
        default: 
            return state
    }   
}

export type MainTodolistActionType = getTodolistACType | addTodolistACType | removeTodolistACType | changeTodolistTitleACType
 | changeTodolistFilterACType

export type getTodolistACType = ReturnType<typeof getTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const getTodolistAC = (todolist: TodolistType[]) => ({type: 'TODOLIST/GET-TODOLIST', todolist} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'TODOLIST/ADD-TODOLIST', todolist} as const)
export const removeTodolistAC = (todolistId: string) => ({type: 'TODOLIST/REMOVE-TODOLIST', todolistId} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
 ({type: 'TODOLIST/CHANGR-TODOLIST-TITLE', todolistId, title} as const)
export const changeTodolistFilterAC = (todolistId: string, value: FilterValueType) => 
({type: 'TODOLIST/CHANGE-FILTER', todolistId, value} as const)

export const getTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        return todolistAPI.getTodolists()
        .then((res) => { 
            dispatch(getTodolistAC(res.data))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded')) 
        })
    }   
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
         todolistAPI.addTodolist(title)
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(addTodolistAC(res.data.data.item)) 
            }else {
                serverErrorHandler(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded')) 
        })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
         todolistAPI.removeTodolist(todolistId)
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(removeTodolistAC(todolistId))
            }else {
                serverErrorHandler(dispatch, res.data)   
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded')) 
        })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
         todolistAPI.changeTodolistTitle(todolistId, title)
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(changeTodolistTitleAC(todolistId, title))
            }else {
                serverErrorHandler(dispatch, res.data)   
            }    
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded')) 
        })
    }
}