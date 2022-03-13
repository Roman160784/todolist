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
       case 'TODOLIST/CREATE-TODOLIST' : {
           return [{...action.todolist, filter: "all", entityStatus: "succeeded"}, ...state]
       }
       case 'TODOLIST/REMOVE-TODOLIST' : {
          return state.filter(tl => tl.id !== action.todolistId)
       }
   }
 return state
}


export type MainTodolistActionType = getTodolistACtype | createTodolistACtype | removeTodolistACtype

export type getTodolistACtype = ReturnType<typeof getTodolistAC>
export type createTodolistACtype = ReturnType<typeof createTodolistAC>
export type removeTodolistACtype = ReturnType<typeof removeTodolistAC>


export const getTodolistAC = (todolist: TodolistType[]) => {
    return{
        type: 'TODOLIST/GET-TODOLIST',
         todolist
    } as const
}

export const createTodolistAC = (todolist : TodolistType) => {
    return {
        type: 'TODOLIST/CREATE-TODOLIST',
        todolist,
    } as const
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'TODOLIST/REMOVE-TODOLIST',
        todolistId,
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

export const createTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(createTodolistAC(res.data.data.item))
        })
    }
}

export const removeTlTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.removeTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
    }
}