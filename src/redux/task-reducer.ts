
import {  AxiosError } from "axios"
import { Dispatch } from "redux"
import { todolistAPI, UpdateTasksType } from "../api/api-todolist"
import { setAppStatusAC } from "./app-reducer"
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
   switch(action.type){
       case 'TL/GET-TODOLIST': {
           const coppyState = {...state}
           action.todolist.forEach(tl => {coppyState[tl.id] = []})
           return coppyState
       }
       case 'TASKS/GET-TASK' : {
           return {...state, [action.todolistId] : action.tasks}
       }
       case 'TL/ADD-TODOLIST' : {
          return {...state, [action.todolist.id] : []}
       }
       case 'TL/REMOVE-TODOLIST': {
        const coppyState = {...state}
        delete coppyState[action.todolistId]
        return coppyState
       }
       case 'TASKS/ADD-TASK' : {
           return {...state, [action.todolistId] : [{...action.task}, ...state[action.todolistId]]}
       }
       case 'TASKS/REMOVE-TASK': {
           return{...state, [action.todolistId] 
            : state[action.todolistId].filter(t => t.id !== action.id)}
       }
       case 'TASKS/UPDATE-TASK' : {
           return {...state, [action.todolistId] 
            : state[action.todolistId].map(t => t.id === action.id ? {...t, ...action.model} : t)}
       }
   }

    return state
}

export type MainActionTaskType = getTodolistACtype | getTasksACtype | addTodolistACtype | removeTodolistACtype | addTaskACtype
| removeTaskACtype | updateTaskACtype

export type getTasksACtype = ReturnType<typeof getTasksAC>
export type addTaskACtype = ReturnType<typeof addTaskAC>
export type removeTaskACtype = ReturnType<typeof removeTaskAC>
export type updateTaskACtype = ReturnType<typeof updateTaskAC>

export const getTasksAC = (todolistId: string, tasks: TasksType[]) => ({type: 'TASKS/GET-TASK', todolistId, tasks} as const)
export const addTaskAC = (todolistId: string, task: TasksType) => ({type: 'TASKS/ADD-TASK', todolistId, task} as const)
export const removeTaskAC = (todolistId: string, id: string) => ({type: 'TASKS/REMOVE-TASK', todolistId, id} as const)
export const updateTaskAC = (todolistId: string, id: string, model: UpdateTasksType) => 
({type: 'TASKS/UPDATE-TASK', todolistId, id, model} as const)

export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))  
        })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.addTask(todolistId, title)
            .then((res) => {
                dispatch(addTaskAC(todolistId, res.data.data.item)) 
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))  
            })
    }
}

export const removeTaskTC = (todolistId: string, id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.removeTask(todolistId, id)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, id))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))  
        })
    }
}

export const updateTaskTC = (todolistId: string, id: string, data: {status?: TaskStatuses, title?: string}) => {
    return (dispatch: Dispatch, getState: () => RootReducerType) => {
        dispatch(setAppStatusAC('loading'))
        const state = getState()
        const allTasks = state.tasks
        const currentTask = allTasks[todolistId]
        const task = currentTask.find(t => t.id === id)

        if(task) {
            const model: UpdateTasksType = {
                ...task,
                ...data,
            }
            todolistAPI.updateTask(todolistId, id, model)
            .then((res) => {
               dispatch(updateTaskAC(todolistId, id, res.data.data.item)) 
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))  
            })
        }
    }
}