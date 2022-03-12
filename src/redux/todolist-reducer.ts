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

export const TodolistReducer = (state: TodolistDomainType[] = initialState, action: MainTodolistActionType ) => {
    switch(action.type) {
        case 'TODOLIST/GET-TODOLIST': {
            return action.payload.todoList.map(tl => ({...tl, filter: 'all', entityStatus: 'succeeded'}))
        }
        case 'TODOLIST/CREATE-TODOLIST' : {
            return [{...action.payload.todoList, filter: 'all', entityStatus: 'succeeded'}, ...state]
        }
    }
 return state
}


export type MainTodolistActionType = getTodolistACType | createTodolistACType | removeTodolistACType

export type getTodolistACType = ReturnType<typeof getTodolistAC>
export type createTodolistACType = ReturnType<typeof createTodolistAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const getTodolistAC = (todoList: TodolistType[]) => {
return {
    type: 'TODOLIST/GET-TODOLIST',
    payload: {
        todoList
    }
} as const
}

export const createTodolistAC = (todoList: TodolistType) => {
    return {
        type: 'TODOLIST/CREATE-TODOLIST',
        payload: {
            todoList,
        }
    } as const
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'TODOLIST/REMOVE-TODOLIST',
        payload: {
            todolistId, 
        }
    }as const
}

export const getTodolistTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolist()
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

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
    }
}