import { Dispatch } from "redux"
import { TLSSocket } from "tls"
import { v1 } from "uuid"
import {  todolistAPI, UpdateTasksType } from "../api/api-todolist"
import { RootReducerType } from "./store"
import { createTodolistACType, getTodolistACType, removeTodolistACType } from "./todolist-reducer"


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
    [key: string] : TasksType[]
}

const initialState: TasksMainType = {
   
}

export const TaskReducer = (state: TasksMainType = initialState, action: MainActionTaskType) => {
    switch(action.type) {
       case 'TODOLIST/GET-TODOLIST' : {
          const coppyState = {...state}
          action.payload.todoList.forEach(tl => {coppyState[tl.id] = [] } )
          return coppyState
       }
       case 'TASK/GET-TASK' : {
           return {...state, [action.payload.todolistId] : action.payload.tasks}
       }
       case 'TODOLIST/CREATE-TODOLIST': {
           return {...state, [action.payload.todoList.id] : []}
       }
       case 'TODOLIST/REMOVE-TODOLIST': {
          const coppyState = {...state}
          delete coppyState[action.payload.todolistId]
          return coppyState
       }
    }
    return state
}

export type MainActionTaskType = getTodolistACType | getTaskACType | createTodolistACType 
| removeTodolistACType | createTaskACType

export type getTaskACType = ReturnType<typeof getTaskAC>
export type createTaskACType = ReturnType<typeof createTaskAC>

export const getTaskAC = (  tasks: TasksType[], todolistId: string,) => {
    return {
        type: 'TASK/GET-TASK',
        payload: {
            todolistId,
            tasks,
        }
    } as const
} 

export const createTaskAC = (todolistId: string, title: string) => {
    return{
        type: 'TASK/CREATE-TASK',
        payload: {
            todolistId,
            title,
        }
    } as const
}


export const getTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(getTaskAC(res.data.items, todolistId,))
            }
        )
    }
}

export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(createTaskAC(todolistId, res.data.data.item.title)) 
        })
    }
}

// export const changeTaskInfoTC = (todolistId: string, id: string, data: UpdateTasksType) => {

//     return (dispatch: Dispatch, getState: () => RootReducerType) => {

//         const allAppState = getState()
//         const tasks = allAppState.tasks
//         const taskForCurrentTL = tasks[todolistId]
//         const currentTask = taskForCurrentTL.find(t => t.id === id)

//         if (currentTask) {
//             const model: UpdateTasksType = {
//                 description: currentTask.description,
//                 title: currentTask.title,
//                 status: currentTask.status,
//                 priority: currentTask.priority,
//                 startDate: currentTask.startDate,
//                 deadline: currentTask.deadline,
//                 completed: currentTask.completed,
//                 ...data
//             }

//             todolistAPI.updateTaskTitleStatus(todolistId, id, model)
//                 .then((res) => {
//                     dispatch(channgeTaskStatusAC(todolistId, id, res.data.data.item.status))
//                 })
//         }
//     }
// }