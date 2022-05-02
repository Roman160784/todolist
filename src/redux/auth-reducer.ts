
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
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

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsloggedInAC(state, action: PayloadAction<{isLogin: boolean}>){
            state.isLogin = action.payload.isLogin
        }
    }
})

export const authReducer = slice.reducer
export const {setIsloggedInAC} = slice.actions



export const setIsLoginTC = (logIn: LoginType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        authAPI.login(logIn)
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(setIsloggedInAC({isLogin: true}))
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

export const logOutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        authAPI.logOut()
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(setIsloggedInAC({isLogin: false}))
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