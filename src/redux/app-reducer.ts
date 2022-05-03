import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import { authAPI } from "../api/api-todolist";
import { serverErrorHandler } from "../util/errorUtils";
import { setIsloggedInAC } from "./auth-reducer";
import { RequestStatusType, ResultCode } from "./todolist-reducer";

export type errorType = string | null 

export type AppReducerType = {
    appStatus: RequestStatusType
    error: errorType
    autorise: boolean
}

const initialState: AppReducerType = {
  appStatus: "succeeded" as RequestStatusType,
  error: null as errorType,
  autorise: false,
}

export const initializeAppTC = createAsyncThunk('APP/initializeApp', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try{
        const res = await authAPI.me()
        if(res.data.resultCode === ResultCode.succes){
            thunkAPI.dispatch(setIsloggedInAC({isLogin: true}))
        }else {
            serverErrorHandler(thunkAPI.dispatch, res.data) 
        }
    }
    catch(err) {
        if (axios.isAxiosError(err)) {
            thunkAPI.dispatch(setAppErrorAC({error: err.message}))
        }}
    finally{
        thunkAPI.dispatch(setIsLoginInAC({autorise: true}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>){
            state.appStatus = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: errorType}>){
            state.error = action.payload.error
        },
        setIsLoginInAC(state, action: PayloadAction<{autorise: boolean}>){
            state.autorise = action.payload.autorise
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.autorise = true
        })
    }
})

export const appReducer = slice.reducer

export const {setAppStatusAC, setAppErrorAC, setIsLoginInAC} = slice.actions




