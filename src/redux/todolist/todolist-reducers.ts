import { v1 } from "uuid"


type fiterValueType = "all" | "active" | "completed"

type TodolistsType = {
id: string
title: string
filter: fiterValueType

}

export const todolistID1 = v1()
export const todolistID2 = v1()

const intitiolState : TodolistsType[] = [
    {id: todolistID1, title: "What to learn", filter: "all"},
    {id: todolistID2, title: "What to learn", filter: "all"},
]

export const todolistReducers = (state : TodolistsType[] = intitiolState, action: MainActionType)  => {
switch (action.type) {
    case "REMOVE-TODOLIST" : {
        return state
    }
    default: return state
}
}

type MainActionType = removeTodolistACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = () => {
    return{
        type : "REMOVE-TODOLIST",
        payload: {

        }
    }as const
    } 