import { Dispatch } from "redux"
import { v1 } from "uuid"
import { todolistsAPI, TodolistsType } from "../../api/todolists-api"
import { changeAppStatusAC, RequestStatusType } from "../app/app-reducer"


export type fiterValueType = "all" | "active" | "completed"
export type TodolistsDomainType = TodolistsType & {
    filter: fiterValueType
    entityStatus: RequestStatusType
}
// export type TodolistsType = {
// id: string
// title: string
// filter: fiterValueType
// }



export const todolistID1 = v1()
export const todolistID2 = v1()

const intitiolState : TodolistsDomainType[] = [
    // {id: todolistID1, title: "What to learn", filter: "all"},
    // {id: todolistID2, title: "What to Buy", filter: "all"},
]

export const todolistReducers = (state : TodolistsDomainType[] = intitiolState, action: MainActionType) :TodolistsDomainType[]   => {
switch (action.type) {
    case "GET-TODOLISTS" : {
        return action.payload.todolists.map(tl => ({...tl, filter : "all", entityStatus: "succeeded" })) //
    }

    case "REMOVE-TODOLIST" : {
        return state.filter(tl => tl.id !== action.payload.id)
    }
    case "ADD-TODOLIST" : {
        return [{...action.payload.item, filter: "all", entityStatus: "succeeded"}, ...state]
    }
    case "CHANGE-FILTER" : {
        return state.map(tl => tl.id === action.payload.todolistID 
            ? {...tl, filter: action.payload.value} : tl)
    }
    case "CHANGE-TITLE-IN-TL" : {
        return state.map(tl => tl.id === action.payload.todolistID 
            ? {...tl, title: action.payload.newTitle} : tl)
    }
    case "CHANGE-TODOLIST-ENTITY-STATUS" : {
        return state.map(tl => tl.id === action.payload.todolistID 
            ? {...tl, entityStatus: action.payload.entityStatus} : tl)
    }

    default: return state
}
}

type MainActionType = removeTodolistACType | addTodolistACType | changeFilterACType | changeTitleInTLACType 
| getTodolistsACType | changeTodolistEntityStatusACType


export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type changeFilterACType = ReturnType<typeof changeFilterAC>
export type changeTitleInTLACType = ReturnType<typeof changeTitleInTLAC>
export type getTodolistsACType = ReturnType<typeof getTodolistsAC>
export type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>

export const removeTodolistAC = (id: string) => {
    return{
        type : "REMOVE-TODOLIST",
        payload: {
            id,
        }
    }as const
    } 

export const addTodolistAC = (item: TodolistsType) => {
    return{
        type : "ADD-TODOLIST",
        payload: {
            item,
        }
    }as const
    } 

export const changeFilterAC = (value: fiterValueType, todolistID: string) => {
    return{
        type : "CHANGE-FILTER",
        payload: {
            value,
            todolistID, 
        }
    }as const
    } 
export const changeTitleInTLAC = (todolistID: string, newTitle: string) => {
    return{
        type : "CHANGE-TITLE-IN-TL",
        payload: {
            newTitle,
            todolistID, 
        }
    }as const
    } 

    export const getTodolistsAC = (todolists: TodolistsType[]) => {
        return {
            type: "GET-TODOLISTS",
            payload: {
                todolists
            }
        }as const
    }
    export const changeTodolistEntityStatusAC  = (todolistID: string, entityStatus: RequestStatusType) => {
        return {
            type: "CHANGE-TODOLIST-ENTITY-STATUS",
            payload: {
                todolistID,
                entityStatus
            }
        }as const
    }

    export const getTodolistsTC = () => {
        return (dispatch: Dispatch) => {
            dispatch(changeAppStatusAC("loading"))
            todolistsAPI.getTodolists()
            .then((res) => { 
                dispatch(getTodolistsAC(res.data))
            })
            .finally(() => {
                dispatch(changeAppStatusAC("idle"))
            })
        }
    }
    export const createTodolistsTC = (title: string) => {
        return (dispatch: Dispatch) => {
            todolistsAPI.createTodolist(title)
            .then((res) => { 
                dispatch(addTodolistAC(res.data.data.item))
            })
        }
    }
    export const deleteTodolistTC = (id: string) => { 
        return (dispatch: Dispatch) => {
            dispatch(changeTodolistEntityStatusAC(id, "loading"))
            todolistsAPI.deleteTodolist(id)
            .then(() => { 
                dispatch(removeTodolistAC(id))
            })
        }
    }

    export const changeTitltInTlTC = (todolistID: string, newTitle: string) => {
        return(dispatch: Dispatch) => {
            todolistsAPI.updateTodolist(todolistID, newTitle)
            .then(() => {
                dispatch(changeTitleInTLAC(todolistID, newTitle)) 
            })
        }
    }