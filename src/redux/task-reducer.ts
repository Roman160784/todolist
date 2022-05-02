
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios, { Axios, AxiosError } from "axios"
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

export const getTasksTC = createAsyncThunk('tasks/getTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    try{
        const res = await tasksAPI.getTasks(todolistId);
         // thunkAPI.dispatch(getTasksAC({ tasks: res.data.items, todolistId: todolistId }))
    return { tasks: res.data.items, todolistId: todolistId };
    }
    finally{
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
    }
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { todolistId: string, id: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    try {
        const res = await tasksAPI.removeTask(param.todolistId, param.id)
        if (res.data.resultCode === ResultCode.succes) {
            return { todolistId: param.todolistId, id: param.id }
        } else {
            serverErrorHandler(thunkAPI.dispatch, res.data)
        }
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            thunkAPI.dispatch(setAppErrorAC({ error: err.message }))
        }
    }
    finally {
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
    }
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { todolistId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    try{
        const res = await tasksAPI.addTask(param.todolistId, param.title)
        if (res.data.resultCode === ResultCode.succes) {
            return { tasks: res.data.data.item, todolistId: param.todolistId }
        } else {
            serverErrorHandler(thunkAPI.dispatch, res.data)
        }
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            thunkAPI.dispatch(setAppErrorAC({ error: err.message }))
        }
    } 
    finally {
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
    }        
     
})

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        //for reducers which use in different componets

        updateTaskAC(state, action: PayloadAction<{ todolistId: string, id: string, task: TasksType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                tasks[index] = { ...tasks[index], ...action.payload.task }
            }
        }
    },
    //for reducers from other reducer and actions which we use once
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
        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const task = state[action.payload!.todolistId]
            const index = task.findIndex(t => t.id === action.payload!.id)
            if (index > -1) {
                task.splice(index, 1)
            }
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload!.todolistId].unshift(action.payload!.tasks)
            
        })
    }
})

export const TaskReducer = slice.reducer
export const { updateTaskAC } = slice.actions


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