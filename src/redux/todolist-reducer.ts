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
        return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
    }
    default: return state
}
}

export type MainTodolistActionType = getTodolistsACType
export type getTodolistsACType = ReturnType<typeof getTodolistsAC>


 export const changeFilterAC = () => {}


 export const getTodolistsAC = (todolists : TodolistType[]) => {
     return {
         type : "TL/GET-TODOLIST",
         payload: {
            todolists
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