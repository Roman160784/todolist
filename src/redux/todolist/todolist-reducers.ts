import { v1 } from "uuid"


type fiterValueType = "all" | "active" | "completed"

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
        return state
    }
    case "ADD-TODOLIST" : {
        return [{id: action.payload.todolistID, title: action.payload.title, filter: "all"}, ...state] 
    }
    default: return state
}
}

type MainActionType = removeTodolistACType | addTodolistACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>

export const removeTodolistAC = () => {
    return{
        type : "REMOVE-TODOLIST",
        payload: {

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