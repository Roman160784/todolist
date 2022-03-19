
import {  AxiosError } from "axios"
import { Dispatch } from "redux"
import { todolistAPI, UpdateTasksType } from "../api/api-todolist"
import { setErrorAC, setStatusAC } from "./app-reducer"
import { RootReducerType } from "./store"
import { addTodolistACtype, disableRemoveButtonAC, getTodolistACtype, removeTodolistACtype, ResultCode } from "./todolist-reducer"



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
        dispatch(setStatusAC('loading'))
        todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(getTasksAC(res.data.items, todolistId)) 
        })
        .catch((err: AxiosError) => {
            dispatch(setErrorAC(err.message))
        })
        .finally(() => {
            dispatch(setStatusAC('succeeded')) 
        })
    }
}


export const addTaskTC = (todolistId: string, title: string ) => {
    return(dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        dispatch(disableRemoveButtonAC(todolistId, 'loading'))
        todolistAPI.createTask(todolistId, title)
        .then((res)=> {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(addTasksAC(todolistId, res.data.data.item))
            } else {
                if(res.data.messages.length){
                    dispatch(setErrorAC(res.data.messages[0]))
                }else {
                    dispatch(setErrorAC("ERRROOOOR!!!"))
                }
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setErrorAC(err.message))
        })
        .finally(() => {
            dispatch(setStatusAC('succeeded')) 
        })
    }
}

export const removeTaskTC = (todolistId: string, id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.removeTask(todolistId, id)
        .then((res) => {
            dispatch(removeTasksAC(todolistId, id))
        })
        .catch((err: AxiosError) => {
            dispatch(setErrorAC(err.message))
        })
        .finally(() => {
            dispatch(setStatusAC('succeeded')) 
        })
    }
}

export const updateTaskTC = (todolistId: string, id: string, data: {title?: string, status?: TaskStatuses}) => {
    return (dispatch: Dispatch, getState:() => RootReducerType) =>{
        dispatch(setStatusAC('loading'))
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
            .catch((err: AxiosError) => {
                dispatch(setErrorAC(err.message))
            })
            .finally(() => {
                dispatch(setStatusAC('succeeded')) 
            })
        }
    }
}