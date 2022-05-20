
import { BuildRounded } from "@material-ui/icons"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { Dispatch } from "redux"
import { TLSSocket } from "tls"
import { todolistAPI } from "../api/api-todolist"
import { serverErrorHandler } from "../util/errorUtils"

import { setAppErrorAC, setAppStatusAC } from "./app-reducer"



export type FilterValueType = "all" | "active" | "completed"
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export enum ResultCode {
    succes = 0,
    fail = 1,
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}


let initialState: TodolistDomainType[] = [

]

export const getTodolistsTC = createAsyncThunk('todolist/getTodolist', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    try {
        const res = await todolistAPI.getTodolists();
        return { todolist: res.data }
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

export const addTodolistTC = createAsyncThunk('todolist/addTodolist', async (param: { title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    try {
        const res = await todolistAPI.addTodolist(param.title);
        if (res.data.resultCode === ResultCode.succes) {
        return { todolist: res.data.data.item }
        }
        else {
            serverErrorHandler(thunkAPI.dispatch, res.data)
            thunkAPI.rejectWithValue(null)
        }
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            thunkAPI.dispatch(setAppErrorAC({ error: err.message }))
            thunkAPI.rejectWithValue(null)
        }
    }
    finally {
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
    }
})

export const removeTodolistTC = createAsyncThunk('todolist/removeTodolist', async (param: { todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    try {
        const res = await todolistAPI.removeTodolist(param.todolistId);
        if (res.data.resultCode === ResultCode.succes) {
            return { todolistId: param.todolistId }
        }
        else {
            serverErrorHandler(thunkAPI.dispatch, res.data)
            thunkAPI.rejectWithValue(null)
        }
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            thunkAPI.dispatch(setAppErrorAC({ error: err.message }))
            thunkAPI.rejectWithValue(null)
        }
    }
    finally {
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
    }
})

export const changeTodolistTitleTC = createAsyncThunk('todolist/chengeTodolistTitle', async (param: { todolistId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    try {
        const res = await todolistAPI.changeTodolistTitle(param.todolistId, param.title);
        if (res.data.resultCode === ResultCode.succes) {
        return { todolistId: param.todolistId, title: param.title }
        } else {
            serverErrorHandler(thunkAPI.dispatch, res.data)
            thunkAPI.rejectWithValue(null)
        }   
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            thunkAPI.dispatch(setAppErrorAC({ error: err.message }))
            thunkAPI.rejectWithValue(null)
        }
    }
    finally {
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
    }
})

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {

        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, value: FilterValueType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.value
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getTodolistsTC.fulfilled, (state, action) => {
            if(action.payload) {
                return action.payload.todolist.map(tl => ({ ...tl, filter: 'all', entityStatus: 'succeeded' }))
            }
              
        })
       .addCase(addTodolistTC.fulfilled, (state, action) => {
            action.payload && state.unshift({ ...action.payload!.todolist, filter: 'all', entityStatus: 'succeeded' })
        })
        .addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload!.todolistId)
            if (index > -1) {
                //remove with the index 1 element
                state.splice(index, 1)
            }
        })
        .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload!.todolistId)
            state[index].title = action.payload!.title
        })
    }
})

export const TodolistReducer = slice.reducer
export const { changeTodolistFilterAC } = slice.actions



