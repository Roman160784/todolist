
import {  AxiosError } from "axios"
import { Dispatch } from "redux"
import { tasksAPI, UpdateTasksType } from "../api/api-todolist"
import { serverErrorHandler } from "../util/errorUtils"
import { setAppErrorAC, setAppStatusAC } from "./app-reducer"
import { RootReducerType } from "./store"
import { addTodolistACType, getTodolistACType, removeTodolistACType, ResultCode } from "./todolist-reducer"





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
   switch(action.type) {
       case 'TODOLIST/GET-TODOLIST': {
           const copyState = {...state}
           action.todolist.forEach( tl => {copyState[tl.id] = []})
           return copyState
       }
       case 'TASKS/GET-TASKS': {
           return {...state, [action.todolistId] : action.tasks}
       }
       case 'TODOLIST/ADD-TODOLIST' : {
           return {...state, [action.todolist.id] : []}
       }
       case 'TODOLIST/REMOVE-TODOLIST' : {
        const copyState = {...state} 
        delete copyState[action.todolistId]
        return copyState
       }
       case 'TASKS/ADD-TASK' : {
           return {...state, [action.todolistId] : [{...action.task}, ...state[action.todolistId]] }
       }
       case 'TASKS/REMOVE-TASK' : {
           return {...state, [action.todolistId] : state[action.todolistId].filter(t => t.id !== action.id)}
       }
       case 'TASKS/UPDATE-TASK' : {
           return {...state, [action.todolistId] : state[action.todolistId].map(t => t.id === action.id ? {...t = action.task} : t) }
       }

       default:
        return state
   } 
}

export type MainActionTaskType = getTodolistACType | getTasksACType | addTodolistACType | removeTodolistACType | addTaskACType 
| removeTaskACType | updateTaskACType

export type getTasksACType = ReturnType<typeof getTasksAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type updateTaskACType = ReturnType<typeof updateTaskAC>

export const getTasksAC = (tasks: TasksType[], todolistId: string) => ({type: 'TASKS/GET-TASKS', tasks, todolistId} as const)
export const addTaskAC = (task: TasksType, todolistId: string) => ({type: 'TASKS/ADD-TASK', task, todolistId} as const )
export const removeTaskAC = (todolistId: string, id: string) => ({type: 'TASKS/REMOVE-TASK', todolistId, id} as const )
export const updateTaskAC = (todolistId: string, id: string, task: TasksType) =>
 ({type: 'TASKS/UPDATE-TASK', todolistId, id, task} as const )


export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
         tasksAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(getTasksAC(res.data.items, todolistId))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded')) 
        })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
         tasksAPI.addTask(todolistId, title)
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(addTaskAC(res.data.data.item, todolistId))
            } else {
                serverErrorHandler(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded')) 
        })
    }
}

export const removeTaskTC = (todolistId: string, id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
         tasksAPI.removeTask(todolistId, id)
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(removeTaskAC(todolistId, id))
            }else {
                serverErrorHandler(dispatch, res.data) 
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC('Somthing bad'))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded')) 
        })
    }
}

export const updateTaskTC = (todolistId: string, id: string, data:{ status?: TaskStatuses, title? : string,}) => {
    return (dispatch: Dispatch, getState: () => RootReducerType) => {
        dispatch(setAppStatusAC('loading'))
        const allState = getState()
        const tasks = allState.tasks
        const tasksFromTL = tasks[todolistId]
        const currentTask = tasksFromTL.find(t => t.id === id)

        if(currentTask){
            const model: UpdateTasksType = {
                ...currentTask,
                ...data,
            }
            tasksAPI.updateTask(todolistId, id, model)
            .then((res) => {
                if(res.data.resultCode === ResultCode.succes){
                    dispatch(updateTaskAC(todolistId, id, res.data.data.item))
                }else {
                    serverErrorHandler(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                dispatch(setAppErrorAC('Somthing bad'))
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded')) 
            })
        }
    }
}