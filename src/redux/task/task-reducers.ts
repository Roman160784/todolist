import { Dispatch } from "redux"
import { v1 } from "uuid"
import { todolistsAPI } from "../../api/todolists-api"
import { addTodolistACType, getTodolistsACType, removeTodolistACType, todolistID1, todolistID2 } from "../todolist/todolist-reducers"

export type TasksType = {
    // id: string
    // title: string
    // isDone: boolean
description: string
title: string
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

export type MainTasksType = {
    [key: string] : TasksType[]
}

const intitiolState : MainTasksType = {
    // [todolistID1] : [
    //     {id: v1(), title: "react", isDone: false},
    //     {id: v1(), title: "redux", isDone: false},
    //     {id: v1(), title: "html", isDone: true},
    // ],
    // [todolistID2] : [
    //     {id: v1(), title: "Bread", isDone: false},
    //     {id: v1(), title: "Milk", isDone: false},
    //     {id: v1(), title: "Water", isDone: true},
    // ],
}

export const taskReducers = (state: MainTasksType = intitiolState, action: MainActionsTupe) : MainTasksType => {
switch (action.type) {
    case "REMOVE-TASK" : {
        return {...state,[action.payload.todolistID] 
            : state[action.payload.todolistID]
            .filter(t => t.id !== action.payload.id)}
    }
    case "ADD-TASK" : {
        const newTask = action.payload.item
        return {...state,[action.payload.item.todoListId] 
            :[newTask, ...state[action.payload.item.todoListId]]}
    }
    case "CHANGE-TASK-STATUS" : {
        return {...state, [action.payload.todolistID] 
            : state[action.payload.todolistID].map(t => t.id === action.payload.id
                 ? {...t, status : action.payload.status} : t)}
    }
    case "ADD-TODOLIST" : { 
        return {...state,[action.payload.item.id]: []}
    }
    
    case "REMOVE-TODOLIST" : { 
        let copyStae = {...state}
        delete copyStae[action.payload.id]
        return copyStae
    }
    case "CHANGE-TASK-TITLE" : { 
        return {...state,[action.payload.todolistID] 
        : state[action.payload.todolistID].map(t => t.id === action.payload.id 
        ? {...t, title : action.payload.newTitle} : t)}
    }
    case "GET-TODOLISTS" : {
        const copyStae = {...state}
        action.payload.todolists.forEach(tl => {copyStae[tl.id] = []})
        return copyStae
    }
    case "GET-TASKS" : {
        const copyStae = {...state, [action.payload.todolistID] : action.payload.tasks}
        return copyStae
    }

    default: return state
}
}

type MainActionsTupe = removeTaskACtype | addTaskACtype | changeTaskStatusACtype 
| addTodolistACType | removeTodolistACType | changeTaskTitleACtype | getTodolistsACType | getTasksACtype

export type removeTaskACtype = ReturnType<typeof removeTaskAC>
export type addTaskACtype = ReturnType<typeof addTaskAC>
export type changeTaskStatusACtype = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACtype = ReturnType<typeof changeTaskTitleAC>
export type getTasksACtype = ReturnType<typeof getTasksAC>

export const removeTaskAC = (todolistID: string, id: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistID, id,
        }
    }as const
}
export const addTaskAC = (item: TasksType) => {
    return {
        type: "ADD-TASK",
        payload: {
            item
        }
    }as const
}
export const changeTaskStatusAC = (todolistID: string, status: TaskStatuses, id: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistID, status, id,
        }
    }as const
}

export const changeTaskTitleAC = (todolistID: string, newTitle: string, id: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todolistID, newTitle, id,
        }
    }as const
}
export const getTasksAC = (tasks : TasksType[], todolistID: string,) => {
    return {
        type: "GET-TASKS",
        payload: {
            tasks,
            todolistID,
            
        }
    }as const
}

export const getTasksTC = (todoListID: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todoListID)
        .then((res) => {
            dispatch(getTasksAC(res.data.items, todoListID))
        })
    }
}

export const addTaskTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistID, title)
        .then ((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
    }
}

export const removeTaskTC = (todolistID: string, id: string) => {
    return (dispatch : Dispatch) => {
        todolistsAPI.deleteTasks(todolistID, id)
        .then (() => {
            dispatch(removeTaskAC(todolistID, id))
        })
    }
}