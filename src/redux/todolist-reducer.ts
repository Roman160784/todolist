import { SportsTennis } from "@material-ui/icons"
import { AxiosError } from "axios"
import { type } from "os"
import { rawListeners, title } from "process"
import { Dispatch } from "redux"

import { textSpanContainsTextSpan } from "typescript"
import { v1 } from "uuid"
import { todolistAPI } from "../api/api-todolist"






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
    // {id: todolistId1, title: "What to learn", addedDate: "11.11.2011"},
    // {id: todolistId2, title: "What to Buy", },
]

export const TodolistReducer = (state: TodolistDomainType[] = initialState, action: MainTodolistActionType): TodolistDomainType[] => {
    switch(action.type){
        case 'TL/GET-TODOLIST': {
            return action.todolist.map(tl => ({...tl, filter: 'all',  entityStatus: 'succeeded'} ) )
        }
        case 'TL/ADD-TODOLIST' : {
            return [{...action.todolist, filter: 'all',  entityStatus: 'succeeded'}, ...state]
        }
        case 'TL/REMOVE-TODOLIST' : {
            return state.filter( tl => tl.id !== action.todolistId)
        }
        case'TL/CHANGE-FILTER' : {
            return state.map(t => t.id === action.todolistId ? {...t, filter: action.value} : t)
        }
        case 'TL/UPDATE-TL-TITLE' : {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl )
        }
    }

    return state
}

export type MainTodolistActionType = getTodolistACtype | addTodolistACtype | removeTodolistACtype | changeFilterACtype
| updateTlTitleACtype

export type getTodolistACtype = ReturnType<typeof getTodolistAC>
export type addTodolistACtype = ReturnType<typeof addTodolistAC>
export type removeTodolistACtype = ReturnType<typeof removeTodolistAC>
export type changeFilterACtype = ReturnType<typeof changeFilterAC>
export type updateTlTitleACtype = ReturnType<typeof updateTlTitleAC>

export const getTodolistAC = (todolist: TodolistType[]) => ({type: 'TL/GET-TODOLIST', todolist} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'TL/ADD-TODOLIST', todolist} as const)
export const removeTodolistAC = (todolistId: string) => ({type: 'TL/REMOVE-TODOLIST', todolistId} as const)
export const changeFilterAC = (todolistId: string, value: FilterValueType) => ({type: 'TL/CHANGE-FILTER', todolistId, value} as const)
export const updateTlTitleAC = (todolistId: string, title: string) => ({type:'TL/UPDATE-TL-TITLE', todolistId, title} as const)

export const getTodolistTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolist()
        .then((res) => {
            dispatch(getTodolistAC(res.data))
        })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.addTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.removeTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
    }
}

export const updateTlTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTlTitle(todolistId, title)
        .then((res) => {
            dispatch(updateTlTitleAC(todolistId, title))
        })
    }
} 