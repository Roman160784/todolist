import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { authAPI } from "../api/api-todolist";
import { serverErrorHandler } from "../util/errorUtils";
import { logInAC } from "./auth-reducer";
import { RequestStatusType, ResultCode } from "./todolist-reducer";

export type errorType = string | null 


const initialState = {
  appStatus: "succeeded" as RequestStatusType,
  error: null as errorType,
  autorise: false,
}

export type initialAppStateType = typeof initialState

export const appReducer = (state: initialAppStateType = initialState, action: MainActiomAppType): initialAppStateType => {
    switch(action.type) {
        case 'APP/SET-STATUS': {
            return {...state, appStatus: action.status}
        }
        case 'APP/SET-ERROR' : {
            return {...state, error: action.error}
        }
        case 'APP/GET-AUTORISE' : {
            return {...state, autorise: action.autorise}
        }
        default:
             return state
    }
}

export type MainActiomAppType = setAppStatusACtype | setAppErrorACtype | setIsLoggedInACtype

export type setAppStatusACtype = ReturnType<typeof setAppStatusAC>
export type setAppErrorACtype = ReturnType<typeof setAppErrorAC>
export type setIsLoggedInACtype = ReturnType<typeof setIsLoggedInAC>

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS',status } as const)
export const setAppErrorAC = (error: errorType) => ({type: 'APP/SET-ERROR',error } as const)
export const setIsLoggedInAC = (autorise: boolean) => ({type: 'APP/GET-AUTORISE', autorise} as const)

export const initializeAppTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
        .then((res) => {
            if(res.data.resultCode === ResultCode.succes){
                dispatch(logInAC(true))
            }else {
                serverErrorHandler(dispatch, res.data) 
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC('Somthing bad'))
        })
        .finally(() => {
            dispatch(setIsLoggedInAC(true)) 
        })
        
    }
}
