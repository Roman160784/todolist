import { v1 } from "uuid"


export type fiterValueType = "all" | "active" | "completed"

export type TodolistsType = {
id: string
title: string
filter: fiterValueType

}

export const todolistID1 = v1()
export const todolistID2 = v1()

const intitiolState : TodolistsType[] = [
    {id: todolistID1, title: "What to learn", filter: "all"},
    {id: todolistID2, title: "What to Buy", filter: "all"},
]

export const todolistReducers = (state : TodolistsType[] = intitiolState, action: MainActionType) :TodolistsType[]   => {
switch (action.type) {
    case "REMOVE-TODOLIST" : {
        return state.filter(tl => tl.id !== action.payload.todolistID)
    }
    case "ADD-TODOLIST" : {
        return [{id: action.payload.todolistID, title: action.payload.title, filter: "all"}, ...state] 
    }
    case "CHANGE-FILTER" : {
        return state.map(tl => tl.id === action.payload.todolistID 
            ? {...tl, filter: action.payload.value} : tl)
    }
    case "CHANGE-TITLE-IN-TL" : {
        return state.map(tl => tl.id === action.payload.todolistID 
            ? {...tl, title: action.payload.newTitle} : tl)
    }

    default: return state
}
}

type MainActionType = removeTodolistACType | addTodolistACType | changeFilterACType | changeTitleInTLACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type changeFilterACType = ReturnType<typeof changeFilterAC>
export type changeTitleInTLACType = ReturnType<typeof changeTitleInTLAC>

export const removeTodolistAC = (todolistID: string) => {
    return{
        type : "REMOVE-TODOLIST",
        payload: {
            todolistID,
        }
    }as const
    } 

export const addTodolistAC = (title: string) => {
    return{
        type : "ADD-TODOLIST",
        payload: {
            title,
            todolistID : v1(), 
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

