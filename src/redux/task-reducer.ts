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

export const TaskReducer = (state: TasksMainType = initialState, action: MainActionTaskType): TasksMainType  => {
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
       case 'TASK/CREATE-TASK' : {
           return {...state, [action.payload.tasks.todoListId] 
            : [action.payload.tasks, ...state[action.payload.tasks.todoListId]] }
       }
       case 'TASK/REMOVE-TASK' : {
           return {...state, [action.payload.todolistId] 
            : state[action.payload.todolistId].filter(t => t.id !== action.payload.id)}
       }
       case 'TASK/UPDATE-TASK' : {
            return {...state, [action.payload.newTask.todoListId] 
                : state[action.payload.newTask.todoListId].map(t => t.id === action.payload.newTask.id 
                    ? action.payload.newTask : t)}
       }
    }
    return state
}

export type MainActionTaskType = getTodolistACType | getTaskACType | createTodolistACType 
| removeTodolistACType | createTaskACType | removeTaskACType | updateTaskACType

export type getTaskACType = ReturnType<typeof getTaskAC>
export type createTaskACType = ReturnType<typeof createTaskAC>
export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type updateTaskACType = ReturnType<typeof updateTaskAC>

export const getTaskAC = (  tasks: TasksType[], todolistId: string,) => {
    return {
        type: 'TASK/GET-TASK',
        payload: {
            todolistId,
            tasks,
        }
    } as const
} 

export const createTaskAC = (tasks: TasksType) => {
    return{
        type: 'TASK/CREATE-TASK',
        payload: {
            tasks,
        }
    } as const
}
 
export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: 'TASK/REMOVE-TASK',
        payload: {
            todolistId,
            id,
        }
    }as const
}

export const updateTaskAC = (newTask: TasksType) => {
    return {
        type : 'TASK/UPDATE-TASK',
        payload: {
            newTask
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
            dispatch(createTaskAC(res.data.data.item)) 
        })
    }
}

export const removeTaskTC = (todolistId: string, id: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTasks(todolistId, id)
        .then(() => {
            dispatch(removeTaskAC(todolistId, id))
        })
    }
}


export const updateTaskTC = (todolistId: string, id: string, data: {title?: string , status?: TaskStatuses}) => {
    return (dispatch: Dispatch, getState: () => RootReducerType) => {
        
        const AllAppState = getState()
        const task = AllAppState.tasks
        const taskForCurrentTL = task[todolistId]
        const correntTask = taskForCurrentTL.find(t => t.id === id)

        // type UpdateTasksTitleAndStausType ={
        //     title?: string
        //     description?: string
        //     completed?: boolean
        //     status?: TaskStatuses
        //     priority?: TaskPriorities
        //     startDate?: string
        //     deadline?: string
        //     }

        if(correntTask) {
           const model: UpdateTasksType ={
            ...correntTask,
            ...data,
           } 

           todolistAPI.updateTask(todolistId, id, model)
           .then((res) => {
               dispatch(updateTaskAC(res.data.data.item))
           })
        }
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