import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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
    }
})

export const appReducer = slice.reducer

export const {setAppStatusAC, setAppErrorAC, setIsLoginInAC} = slice.actions



export const initializeAppTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        authAPI.me()
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(setIsloggedInAC({isLogin: true}))
            }else {
                serverErrorHandler(dispatch, res.data) 
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC({error: err.message}))
        })
        .finally(() => {
            dispatch(setIsLoginInAC({autorise: true}))
            dispatch(setAppStatusAC({status: 'succeeded'}))  
        })
        
    }
}
