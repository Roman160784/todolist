
import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { todolistAPI } from "../api/api-todolist"
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
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodolist()
        .then((res) => {
            dispatch(getTodolistAC(res.data))
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
            } else if (res.data.messages.length){
                dispatch(setAppErrorAC(res.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('Somthing bad'))
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
            dispatch(removeTodolistAC(todolistId))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))  
        })
    }
}

export const updateTlTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTlTitle(todolistId, title)
        .then((res) => {
            dispatch(updateTlTitleAC(todolistId, title))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))  
        })
    }
} 

