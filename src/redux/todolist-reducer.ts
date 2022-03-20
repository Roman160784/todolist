import { SportsTennis } from "@material-ui/icons"
import { AxiosError } from "axios"
import { type } from "os"
import { rawListeners, title } from "process"
import { Dispatch } from "redux"

import { textSpanContainsTextSpan } from "typescript"
import { v1 } from "uuid"
import { todiListAPI } from "../api/api-todolist"
import { appErrorAC, appStatusAC } from "./app-reducer"




export type FilterValueType = "all" | "active" | "completed"
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export enum ResultCode  {
    succes = 0,
    fail = 1,
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type TodolistDomainType = TodolistType &{
filter : FilterValueType
entityStatus: RequestStatusType
}



let initialState : TodolistDomainType[] = [
    // {id: todolistId1, title: "What to learn", addedDate: "11.11.2011"},
    // {id: todolistId2, title: "What to Buy", },
]

export const TodolistReducer = (state: TodolistDomainType[] = initialState, action: MainTodolistActionType ): TodolistDomainType[] => {
    switch (action.type) {
        case 'TL/GET-TODOLIST' : {
            return action.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'succeeded'}))
        }
        case 'TL/ADD-TODOLIST' : {
            return [{...action.todolist, filter: 'all', entityStatus: 'succeeded'}, ...state]
        }
        case 'TL/REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'TL/CHANGE-FILTER' : {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        }
        case 'TL/CHANGE-TITLE' : {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
             
        }
    }

 return state
}

export type MainTodolistActionType = getTodolistACtype | addTodolistACtype | removeTodolistACtype | changeFilterACtype | changeTitleACtype

export type getTodolistACtype = ReturnType<typeof getTodolistAC>
export type addTodolistACtype = ReturnType<typeof addTodolistAC>
export type removeTodolistACtype = ReturnType<typeof removeTodolistAC>
export type changeFilterACtype = ReturnType<typeof changeFilterAC>
export type changeTitleACtype = ReturnType<typeof changeTitleAC>

export const getTodolistAC = (todolist: TodolistType[]) => ({type: 'TL/GET-TODOLIST', todolist } as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'TL/ADD-TODOLIST', todolist} as const)
export const removeTodolistAC = (todolistId: string) => ({type: 'TL/REMOVE-TODOLIST', todolistId} as const)
export const changeFilterAC = (todolistId: string, filter: FilterValueType) => ({type: 'TL/CHANGE-FILTER', todolistId, filter} as const)
export const changeTitleAC = (todolistId: string, title: string) => ({type: 'TL/CHANGE-TITLE', todolistId, title} as const)

export const getTodolistTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(appStatusAC('loading'))
        todiListAPI.getTodolist()
        .then((res) => {
            dispatch(getTodolistAC(res.data))
        })
        .finally(() =>{
            dispatch(appStatusAC('succeeded'))
        })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appStatusAC('loading'))
        todiListAPI.addTodolist(title)
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(addTodolistAC(res.data.data.item))
            } else {
                if (res.data.messages.length){
                dispatch(appErrorAC(res.data.messages[0]))
                } else {
                    dispatch(appErrorAC('Error'))
                }  
            }
        })
        .catch((res: AxiosError)=> {
            dispatch(appErrorAC(res.message))
        })
        .finally(() =>{
            dispatch(appStatusAC('succeeded'))
        })
    }
}

export const removeTlTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appStatusAC('loading'))
        todiListAPI.removeTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
        .finally(() =>{
            dispatch(appStatusAC('succeeded'))
        })
    }
}

export const changeTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appStatusAC('loading'))
        todiListAPI.changeTlTitle(todolistId, title)
        .then((res) => {
            dispatch(changeTitleAC(todolistId, title))
        })
        .finally(() =>{
            dispatch(appStatusAC('succeeded'))
        })
    }
}