import { TLSSocket } from "tls"
import { v1 } from "uuid"
import { getTodolistsACType, todolistId1, todolistId2 } from "./todolist-reducer"

export type TasksType ={
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TasksMainType ={
    [key: string] : TasksType[]
}

const initialState : TasksMainType  = {
    // [todolistId1] :
    // [{id: v1(), title: "JS", isDone: false},
    // {id: v1(), title: "REACT", isDone: false},],
    // [todolistId2] :
    // [{id: v1(), title: "milk", isDone: false},
    // {id: v1(), title: "bread", isDone: false},]
}

export const TaskReducer = (state: TasksMainType = initialState, action:  MainTaskActionType) =>{
    switch(action.type) {
        case 'TL/GET-TODOLIST': {
          const coppyState = {...state}
          action.payload.todolists.forEach(t => {coppyState[t.id] =[]})
          return coppyState
        }
     default: return state 
    }
}

export type MainTaskActionType = getTodolistsACType | getTasksACtype

export type getTasksACtype = ReturnType<typeof getTasksAC>


export const getTasksAC = (todolistId: string, tasks: TasksType ) => {
return {
    type: "TASK/GET-TASK" ,
    payload: {
        todolistId,
        tasks,
    }
} as const
}