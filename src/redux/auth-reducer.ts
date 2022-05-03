
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { Dispatch } from "redux"
import { authAPI, LoginType } from "../api/api-todolist"
import { serverErrorHandler } from "../util/errorUtils"
import { setAppErrorAC, setAppStatusAC } from "./app-reducer"
import { ResultCode } from "./todolist-reducer"

export type AuthReducerType = {
    isLogin: boolean
}

export const initialState: AuthReducerType = {
    isLogin: false
}

export const setIsLoginTC = createAsyncThunk('auth/logIn', async (param: { logIn: LoginType }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    try {
        const res = await authAPI.login(param.logIn)
        if (res.data.resultCode === ResultCode.succes) {
            return { isLogin: true }
        } else {
            serverErrorHandler(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue({ isLogin: false })
        }
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            thunkAPI.dispatch(setAppErrorAC({ error: err.message }))
            return thunkAPI.rejectWithValue({ isLogin: false })
        }
    }
    finally {
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))

    }
})

export const logOutTC = createAsyncThunk('auth/logOut', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    try{
        const res = await authAPI.logOut()
        if (res.data.resultCode === ResultCode.succes) {
            thunkAPI.dispatch(setIsloggedInAC({ isLogin: false }))
        } else {
            serverErrorHandler(thunkAPI.dispatch, res.data)
        }
    }
    catch(err){
        if (axios.isAxiosError(err)) {
            thunkAPI.dispatch(setAppErrorAC({ error: err.message }))
        }
        return thunkAPI.rejectWithValue({})
    }
    finally{
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
    }
})

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsloggedInAC(state, action: PayloadAction<{ isLogin: boolean }>) {
            state.isLogin = action.payload.isLogin
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setIsLoginTC.fulfilled, (state, action) => {
            state.isLogin = action.payload!.isLogin
        })
        builder.addCase(logOutTC.fulfilled, (state) => {
            state.isLogin = false
        })
    }
})

export const authReducer = slice.reducer
export const { setIsloggedInAC } = slice.actions

