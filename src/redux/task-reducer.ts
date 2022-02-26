import { v1 } from "uuid"
import { todolistId1, todolistId2 } from "./todolist-reducer"

export type TasksType ={
id: string
title: string
isDone: boolean
}

export type TasksMainType ={
    [key: string] : TasksType[]
}

const initialState : TasksMainType  = {
    [todolistId1] :
    [{id: v1(), title: "JS", isDone: false},
    {id: v1(), title: "JS", isDone: false},],
    [todolistId2] :
    [{id: v1(), title: "milk", isDone: false},
    {id: v1(), title: "bread", isDone: false},]
}

export const TaskReducer = (state: TasksMainType = initialState, action:  MainTaskActionType) =>{
    return state
}

export type MainTaskActionType = ""