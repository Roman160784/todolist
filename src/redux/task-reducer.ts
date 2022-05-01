
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { tasksAPI, UpdateTasksType } from "../api/api-todolist"
import { serverErrorHandler } from "../util/errorUtils"
import { setAppErrorAC, setAppStatusAC } from "./app-reducer"
import { RootReducerType } from "./store"
import { addTodolistAC, getTodolistAC, removeTodolistAC, ResultCode } from "./todolist-reducer"


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

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        getTasksAC(state, action: PayloadAction<{ tasks: TasksType[], todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
        addTaskAC(state, action: PayloadAction<{ tasks: TasksType, todolistId: string }>) {
            state[action.payload.todolistId].unshift(action.payload.tasks)
        },
        removeTaskAC(state, action: PayloadAction<{ todolistId: string, id: string }>) {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, id: string, task: TasksType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                tasks[index] = { ...tasks[index], ...action.payload.task }
            }
        }
    },
    //for reducers from other reducer
    extraReducers: (builder) => {
        builder.addCase(getTodolistAC, (state, action) => {
            action.payload.todolist.forEach(tl => { state[tl.id] = [] })
        })
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
    }
})

export const TaskReducer = slice.reducer
export const { getTasksAC, addTaskAC, removeTaskAC, updateTaskAC } = slice.actions




export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({ status: 'loading' }))
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(getTasksAC({ tasks: res.data.items, todolistId: todolistId }))
            })
            .finally(() => {
                dispatch(setAppStatusAC({ status: 'succeeded' }))
            })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({ status: 'loading' }))
        tasksAPI.addTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === ResultCode.succes) {
                    dispatch(addTaskAC({ tasks: res.data.data.item, todolistId: todolistId }))
                } else {
                    serverErrorHandler(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                dispatch(setAppErrorAC({ error: err.message }))
            })
            .finally(() => {
                dispatch(setAppStatusAC({ status: 'succeeded' }))
            })
    }
}

export const removeTaskTC = (todolistId: string, id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({ status: 'loading' }))
        tasksAPI.removeTask(todolistId, id)
            .then((res) => {
                if (res.data.resultCode === ResultCode.succes) {
                    dispatch(removeTaskAC({ todolistId, id }))
                } else {
                    serverErrorHandler(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                dispatch(setAppErrorAC({ error: err.message }))
            })
            .finally(() => {
                dispatch(setAppStatusAC({ status: 'succeeded' }))
            })
    }
}

export const updateTaskTC = (todolistId: string, id: string, data: { status?: TaskStatuses, title?: string, }) => {
    return (dispatch: Dispatch, getState: () => RootReducerType) => {
        dispatch(setAppStatusAC({ status: 'loading' }))
        const allState = getState()
        const tasks = allState.tasks
        const tasksFromTL = tasks[todolistId]
        const currentTask = tasksFromTL.find(t => t.id === id)

        if (currentTask) {
            const model: UpdateTasksType = {
                ...currentTask,
                ...data,
            }
            tasksAPI.updateTask(todolistId, id, model)
                .then((res) => {
                    if (res.data.resultCode === ResultCode.succes) {
                        dispatch(updateTaskAC({ todolistId: todolistId, id: id, task: res.data.data.item }))
                    } else {
                        serverErrorHandler(dispatch, res.data)
                    }
                })
                .catch((err: AxiosError) => {
                    dispatch(setAppErrorAC({ error: err.message }))
                })
                .finally(() => {
                    dispatch(setAppStatusAC({ status: 'succeeded' }))
                })
        }
    }
}