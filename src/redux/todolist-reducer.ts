
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
    try{
        const res = await  todolistAPI.getTodolists();
       return {todolist: res.data}
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            thunkAPI.dispatch(setAppErrorAC({ error: err.message }))
        }
    }
    finally{
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
    }
})

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>){
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'succeeded'})
        },
        removeTodolistAC(state, action: PayloadAction<{todolistId: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if(index > -1){
                //remove with the index 1 element
                state.splice(index, 1)
            }
        },
        changeTodolistTitleAC(state, action: PayloadAction<{todolistId: string, title: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
                state[index].title = action.payload.title   
        },
        changeTodolistFilterAC(state, action: PayloadAction<{todolistId: string, value: FilterValueType}>){
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTodolistsTC.fulfilled, (state, action) => {
            return action.payload!.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'succeeded'})) 
    })

} 
})

export const TodolistReducer = slice.reducer
export const { addTodolistAC, removeTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC} = slice.actions



export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
         todolistAPI.addTodolist(title)
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(addTodolistAC({todolist: res.data.data.item})) 
            }else {
                serverErrorHandler(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC({error: err.message}))
        })
        .finally(() => {
            dispatch(setAppStatusAC({status: 'succeeded'})) 
        })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
         todolistAPI.removeTodolist(todolistId)
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(removeTodolistAC({todolistId}))
            }else {
                serverErrorHandler(dispatch, res.data)   
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC({error: err.message}))
        })
        .finally(() => {
            dispatch(setAppStatusAC({status: 'succeeded'})) 
        })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
         todolistAPI.changeTodolistTitle(todolistId, title)
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(changeTodolistTitleAC({todolistId, title}))
            }else {
                serverErrorHandler(dispatch, res.data)   
            }    
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC({error: err.message}))
        })
        .finally(() => {
            dispatch(setAppStatusAC({status: 'succeeded'})) 
        })
    }
}