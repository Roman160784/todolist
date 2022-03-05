import { Dispatch } from "redux"
import { TLSSocket } from "tls"
import { v1 } from "uuid"
import { todolistAPI } from "../api/api-todolist"
import { addTodolistACType, getTodolistsACType, removeTodolistACType, todolistId1, todolistId2 } from "./todolist-reducer"

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
        case 'TASK/GET-TASK' : {
            return {...state, [action.payload.todolistId] : action.payload.tasks}
        }

        case 'TL/ADD-TODOLIST' : {
            return {...state, [action.payload.item.id] : []}
        }

        case 'TL/REMOVE-TODOLIST' : {
            let coppy = {...state}
            delete coppy[action.payload.todolistId]
            return coppy
        }

        case 'TASK/ADD-TASK' : {
         const newTask = action.payload.item
         return {...state, [action.payload.todolistId]
        : [newTask, ...state[action.payload.todolistId]]
    }
            
        }

     default: return state 
    }
}

export type MainTaskActionType = getTodolistsACType | getTasksACtype | addTodolistACType | removeTodolistACType 
| addTaskACtype

export type getTasksACtype = ReturnType<typeof getTasksAC>
export type addTaskACtype = ReturnType<typeof addTaskAC>


export const getTasksAC = ( tasks: TasksType[], todolistId: string ) => {
return {
    type: "TASK/GET-TASK" ,
    payload: {
        tasks,
        todolistId,
    }
} as const
}

export const addTaskAC = (todolistId: string, item: TasksType) => {
    return {
        type: "TASK/ADD-TASK",
        payload: {
            todolistId,
            item,
        }    
    } as const
}

export const getTasksTC = (todolistId: string) => {
   return (dispatch : Dispatch) =>{
    todolistAPI.getTasks(todolistId)
    .then((res) => {
        dispatch(getTasksAC(res.data.items , todolistId))
    })} 
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch : Dispatch) => {
        todolistAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(todolistId, res.data.data.item))
        })
    }
}