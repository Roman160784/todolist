
import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { authAPI, LoginType } from "../api/api-todolist"
import { serverErrorHandler } from "../util/errorUtils"
import { setAppErrorAC, setAppStatusAC } from "./app-reducer"
import { ResultCode } from "./todolist-reducer"

export type InitialStateType = {
    isLogin : boolean
}

export const initialState: InitialStateType = {
    isLogin: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch(action.type){
        case 'AUTH/LOG-IN': {
            return {...state, isLogin : action.isLogin}
        }
        default:
            return state
    }

}

export type AuthActionsType = logInACType

export type logInACType = ReturnType<typeof logInAC>

export const logInAC = (isLogin: boolean) => ({type: 'AUTH/LOG-IN', isLogin} as const)

export const setIsLoginTC = (logIn: LoginType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(logIn)
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(logInAC(true))
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC('Somthing bad'))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))  
        })
    }
}

export const logOutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logOut()
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(logInAC(false))
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC('Somthing bad'))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))  
        })
    }
}