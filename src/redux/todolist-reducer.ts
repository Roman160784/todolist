import { type } from "os"
import { rawListeners, title } from "process"
import { Dispatch } from "redux"
import { v1 } from "uuid"
import { todolistAPI } from "../api/api-todolist"




export type FilterValueType = "all" | "active" | "completed"
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

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
   switch(action.type){
       case 'TODOLIST/GET-TODOLIST' : {
           return action.todolist.map(tl => ({...tl, filter: "all", entityStatus: "succeeded"}))
       }
   }
 return state
}


export type MainTodolistActionType = getTodolistACtype

export type getTodolistACtype = ReturnType<typeof getTodolistAC>


export const getTodolistAC = (todolist: TodolistType[]) => {
    return{
        type: 'TODOLIST/GET-TODOLIST',
         todolist
    } as const
}

export const getTodolistTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodoList()
        .then((res) => {
            dispatch(getTodolistAC(res.data))
        })
    }
}