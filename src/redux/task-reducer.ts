import { StarRate } from "@material-ui/icons"
import { Dispatch } from "redux"
import { TLSSocket } from "tls"
import { v1 } from "uuid"
import { todolistAPI, UpdateTasksType } from "../api/api-todolist"

import { RootReducerType } from "./store"
import { addTodolistACtype, getTodolistACtype, removeTodolistACtype } from "./todolist-reducer"




export type TasksType = {
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

export type TasksMainType = {
    [key: string]: TasksType[]
}

const initialState: TasksMainType = {

}

export const TaskReducer = (state: TasksMainType = initialState, action: MainActionTaskType): TasksMainType => {
    switch (action.type) {
        case 'TL/GET-TODOLIST': {
            const copySate = { ...state }
            action.todolist.forEach(tl => { copySate[tl.id] = [] })
            return copySate
        }
        case 'TASK/GET-TASK' : {
            return {...state, [action.todolistId] : action.tasks}
        }
        case 'TL/REMOVE-TODOLIST' : {
            const copySate = {...state}
            delete copySate[action.todolistId]
            return copySate
        }
        case 'TL/ADD-TODOLIST' : {
            return {...state, [action.todolist.id] : []}
        }
        case 'TASK/ADD-TASK' : {
            return {...state,[action.todolistId] : [action.task, ...state[action.todolistId]]}
        }
        case 'TASK/REMOVE-TASK' : {
           return {...state, [action.todolistId] : state[action.todolistId].filter(t => t.id !== action.id)}
        }
        case 'TASK/UPDATE-TASK' : {
            return {...state, [action.todolistId] 
                : state[action.todolistId].map(t => t.id === action.id ? {...t, ...action.updatedTask} : t)}
        }
    }
    return state
}

export type MainActionTaskType = getTodolistACtype | getTasksACtype | removeTodolistACtype | addTodolistACtype | addTasksACtype
| removeTasksACtype | updateTasksACtype

export type getTasksACtype = ReturnType<typeof getTasksAC>
export type addTasksACtype = ReturnType<typeof addTasksAC>
export type removeTasksACtype = ReturnType<typeof removeTasksAC>
export type updateTasksACtype = ReturnType<typeof updateTasksAC>

export const getTasksAC = (tasks: TasksType[], todolistId: string) => ({type: 'TASK/GET-TASK',  tasks,  todolistId} as const)
export const addTasksAC = (todolistId: string, task: TasksType, ) => ({type: 'TASK/ADD-TASK', todolistId, task  } as const)
export const removeTasksAC = (todolistId: string, id: string, ) => ({type: 'TASK/REMOVE-TASK', todolistId, id  } as const)
export const updateTasksAC = (todolistId: string, id: string, updatedTask: TasksType ) => ({type: 'TASK/UPDATE-TASK', todolistId, id, updatedTask } as const)

export const getTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(getTasksAC(res.data.items, todolistId)) 
        })
    }
}


export const addTaskTC = (todolistId: string, title: string ) => {
    return(dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId, title)
        .then((res)=> {
            dispatch(addTasksAC(todolistId, res.data.data.item))
        })
    }
}

export const removeTaskTC = (todolistId: string, id: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.removeTask(todolistId, id)
        .then((res) => {
            dispatch(removeTasksAC(todolistId, id))
        })
    }
}

export const updateTaskTC = (todolistId: string, id: string, data: {title?: string, status?: TaskStatuses}) => {
    return (dispatch: Dispatch, getState:() => RootReducerType) =>{
        const allState = getState()
        const tasks = allState.tasks
        const tasksTL = tasks[todolistId]
        const task = tasksTL.find(t => t.id === id)

        if(task){
            const model : UpdateTasksType = {
                ...task,
                ...data,
            }
            todolistAPI.updateTask(todolistId, id, model)
            .then((res) => {
                dispatch(updateTasksAC(todolistId, id, res.data.data.item))
            })

        }
    }
}