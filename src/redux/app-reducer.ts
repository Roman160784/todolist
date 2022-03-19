import { RequestStatusType } from "./todolist-reducer";

export type AppErrorType = string | null

const initialState = {
    entityStatus: 'loading' as RequestStatusType,
    error: "Error" as AppErrorType
}

export type initialAppStateType = typeof initialState

export const appReducer = (state: initialAppStateType = initialState, action: MainActiomAppType): initialAppStateType => {
    switch(action.type) {
        case 'APP/SET-STATUS' :{
            return {...state, entityStatus: action.status}
        }
        case 'APP/SET-ERROR' : {
            return {...state, error: action.error}
        }
    }
return state
}

export type MainActiomAppType = setStatusACtype | setErrorACtype

export type setStatusACtype = ReturnType <typeof setStatusAC>
export type setErrorACtype = ReturnType <typeof setErrorAC>

export const setStatusAC = (status : RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setErrorAC = (error : string | null) => ({type: 'APP/SET-ERROR', error} as const)