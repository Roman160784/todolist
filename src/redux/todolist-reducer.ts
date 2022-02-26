import { v1 } from "uuid"

export type TodolistMainType ={
    
}

export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
id: string
title: string
filter?: FilterValueType
addedDate?: string
order?: number
}

export const todolistId1 = v1()
export const todolistId2 = v1()

let initialState : TodolistType[] = [
    {id: todolistId1, title: "What to learn", addedDate: "11.11.2011"},
    {id: todolistId2, title: "What to Buy", },
]

export const TodolistReducer = (state: TodolistType[] = initialState, action: MainTodolistActionType) => {
return state
}

export type MainTodolistActionType = ""

 export const changeFilterAC = () => {}