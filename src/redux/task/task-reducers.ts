import { v1 } from "uuid"
import { todolistID1, todolistID2 } from "../todolist/todolist-reducers"

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type MainTasksType = {
    [key: string] : TasksType[]
}

const intitiolState : MainTasksType = {
    [todolistID1] : [
        {id: v1(), title: "react", isDone: false},
        {id: v1(), title: "redux", isDone: false},
        {id: v1(), title: "html", isDone: true},
    ],
    [todolistID2] : [
        {id: v1(), title: "Bread", isDone: false},
        {id: v1(), title: "Milk", isDone: false},
        {id: v1(), title: "Water", isDone: true},
    ],
}

export const taskReducers = (state: MainTasksType = intitiolState, action: MainActionsTupe) => {
switch (action.type) {
    case "REMOVE-TASK" : {
        return state
    }
    default: return state
}
}

type MainActionsTupe = removeTaskACtype

export type removeTaskACtype = ReturnType<typeof removeTaskAC>

export const removeTaskAC = () => {
    return {
        type: "REMOVE-TASK",
        payload: {

        }
    }as const
}