import { Dispatch } from "redux"
import { v1 } from "uuid"
import { todolistAPI } from "../api/api-todolist"


export type FilterValueType = "all" | "active" | "completed"
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export type TodolistType = {
id: string
title: string
addedDate: string
order: number
}

export type TodolistDomainType = TodolistType &{
filter: FilterValueType
entityStatus: RequestStatusType
}

export const todolistId1 = v1()
export const todolistId2 = v1()

let initialState : TodolistDomainType[] = [
    // {id: todolistId1, title: "What to learn", addedDate: "11.11.2011"},
    // {id: todolistId2, title: "What to Buy", },
]

export const TodolistReducer = (state: TodolistDomainType[] = initialState, action: MainTodolistActionType):TodolistDomainType[] => {
switch(action.type) {
    case "TL/GET-TODOLIST" : {
        return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "succeeded"}))
    }
    case "TL/ADD-TODOLIST" : {
        return [{ ...action.payload.item, filter: 'all', entityStatus: 'succeeded'}, ...state]
    }
    case "TL/REMOVE-TODOLIST" : {
        return state.filter(tl => tl.id !== action.payload.todolistId )
    }

    case "TL/CHANFE-FILTER" : {
        return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.value} : tl)
    }
    default: return state
}
}

export type MainTodolistActionType = getTodolistsACType | addTodolistACType | removeTodolistACType | changeFilterACType

export type getTodolistsACType = ReturnType<typeof getTodolistsAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type changeFilterACType = ReturnType<typeof changeFilterAC>


 export const changeFilterAC = (todolistId: string, value: FilterValueType) => {
     return {
        type : "TL/CHANFE-FILTER",
        payload: {
            todolistId,
            value,
        }
     } as const
 }


 export const getTodolistsAC = (todolists : TodolistType[]) => {
     return {
         type : "TL/GET-TODOLIST",
         payload: {
            todolists
         }
     } as const
 }

 export const addTodolistAC = (item: TodolistType) => {
    return {
        type: "TL/ADD-TODOLIST",
        payload: {
            item,
        }
    } as const
 }

 export const removeTodolistAC = (todolistId: string) => {
  return {
      type : "TL/REMOVE-TODOLIST",
      payload: {
        todolistId 
      }
  } as const
 }


 export const getTodolistsTC = () => {
     return (dispatch: Dispatch) => {
        todolistAPI.getTodolist()
        .then((res) => {
            dispatch(getTodolistsAC(res.data))
        })
     }
 }

 export const addTodolistTC = (title: string) => {
     return(dispatch: Dispatch) => {
         todolistAPI.createTodolist(title)
         .then((res) => {
             dispatch(addTodolistAC(res.data.data.item))
         })
     }
 }

 export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.removeTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        }) 
    }
 }
 