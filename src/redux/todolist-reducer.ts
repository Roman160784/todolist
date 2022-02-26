import { v1 } from "uuid"

export type TodolistMainType ={
    
}

export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
id: string
title: string
filter: FilterValueType
}

export const todolistId1 = v1()
export const todolistId2 = v1()

let initialState : TodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to Buy", filter: "all"},
]

export const TodolistReducer = (state: TodolistType[] = initialState, action: MainTodolistActionType) => {
return state
}

export type MainTodolistActionType = ""