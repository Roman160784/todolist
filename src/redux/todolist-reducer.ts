import { SportsTennis } from "@material-ui/icons"
import { type } from "os"
import { rawListeners, title } from "process"
import { Dispatch } from "redux"
import { v1 } from "uuid"
import { todolistAPI } from "../api/api-todolist"
import { setErrorAC, setStatusAC } from "./app-reducer"


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
  switch(action.type) {
      case 'TL/GET-TODOLIST' : {
          return action.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'succeeded'} ))
      }
      case 'TL/REMOVE-TODOLIST': {
          return state.filter(tl => tl.id !== action.todolistId)
      }
      case 'TL/ADD-TODOLIST': {
        return  [{...action.todolist, filter: 'all', entityStatus: 'succeeded'}, ...state]
      }
      case 'TL/UPDATE-TODOLIST': {
          return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
      }
      case 'TL/CHANGE-FILTER': {
          return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
      }
  }
 return state
}


export type MainTodolistActionType = getTodolistACtype | removeTodolistACtype | addTodolistACtype | updateTodolistACtype
|changeFiltertACtype

export type getTodolistACtype = ReturnType<typeof getTodolistAC>
export type removeTodolistACtype = ReturnType<typeof removeTodolistAC>
export type addTodolistACtype = ReturnType<typeof addTodolistAC>
export type updateTodolistACtype = ReturnType<typeof updateTodolistAC>
export type changeFiltertACtype = ReturnType<typeof changeFiltertAC>


export const getTodolistAC = (todolist: TodolistType[]) => ({type: 'TL/GET-TODOLIST', todolist} as const)
export const removeTodolistAC = (todolistId: string) => ({type: 'TL/REMOVE-TODOLIST', todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'TL/ADD-TODOLIST', todolist} as const)
export const updateTodolistAC = (todolistId: string, title: string) => ({type: 'TL/UPDATE-TODOLIST', todolistId, title} as const)
export const changeFiltertAC = (todolistId: string, filter: FilterValueType) => ({type: 'TL/CHANGE-FILTER', todolistId, filter} as const)

export const getTodolistTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.getTodolist()
        .then((res) => {
            dispatch(getTodolistAC(res.data))
        })
        .finally(() => {
            dispatch(setStatusAC('succeeded')) 
        })
    }
}

export const removeTlTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.removeTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
        .finally(() => {
            dispatch(setStatusAC('succeeded')) 
        })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.addTodolist(title)
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(addTodolistAC(res.data.data.item))
            } else {
                dispatch(setErrorAC(res.data.messages[0]))
            }
        })
        .finally(() => {
            dispatch(setStatusAC('succeeded')) 
        })
    }
}

export const updateTlTC = (todolistId: string, title: string) => {
    return(dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.updateTodlist(todolistId, title)
        .then((res) => {
            dispatch(updateTodolistAC(todolistId, title))
        })
        .finally(() => {
            dispatch(setStatusAC('succeeded')) 
        })
    }
}