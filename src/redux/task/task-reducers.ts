import { v1 } from "uuid"
import { addTodolistACType, removeTodolistACType, todolistID1, todolistID2 } from "../todolist/todolist-reducers"

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type MainTasksType = {
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

export const taskReducers = (state: MainTasksType = intitiolState, action: MainActionsTupe) : MainTasksType => {
switch (action.type) {
    case "REMOVE-TASK" : {
        return {...state,[action.payload.todolistID] 
            : state[action.payload.todolistID]
            .filter(t => t.id !== action.payload.id)}
    }
    case "ADD-TASK" : {
        return {...state, [action.payload.todolistID] 
            : [{id: v1(), title: action.payload.title, isDone: false}, 
                ...state[action.payload.todolistID]]}
    }
    case "CHANGE-TASK-STATUS" : {
        return {...state, [action.payload.todolistID] 
            : state[action.payload.todolistID].map(t => t.id === action.payload.id
                 ? {...t, isDone : action.payload.isDone} : t)}
    }
    case "ADD-TODOLIST" : { 
        return {...state,[action.payload.todolistID]: []}
    }
    case "ADD-TODOLIST" : { 
        return {...state,[action.payload.todolistID]: []}
    }
    
    case "REMOVE-TODOLIST" : { 
        let copyStae = {...state}
        delete copyStae[action.payload.todolistID]
        return copyStae
    }

    default: return state
}
}

type MainActionsTupe = removeTaskACtype | addTaskACtype | changeTaskStatusACtype | addTodolistACType | removeTodolistACType

export type removeTaskACtype = ReturnType<typeof removeTaskAC>
export type addTaskACtype = ReturnType<typeof addTaskAC>
export type changeTaskStatusACtype = ReturnType<typeof changeTaskStatusAC>

export const removeTaskAC = (todolistID: string, id: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistID, id,
        }
    }as const
}
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistID, title,
        }
    }as const
}
export const changeTaskStatusAC = (todolistID: string, isDone: boolean, id: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistID, isDone, id,
        }
    }as const
}