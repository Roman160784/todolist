import { RequestStatusType } from "./todolist-reducer";

export type errorType = string | null 


const initialState = {
  appStatus: "succeeded" as RequestStatusType,
  error: null as errorType,
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
    }
    
return state
}

export type MainActiomAppType = setAppStatusACtype | setAppErrorACtype

export type setAppStatusACtype = ReturnType<typeof setAppStatusAC>
export type setAppErrorACtype = ReturnType<typeof setAppErrorAC>

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS',status } as const)
export const setAppErrorAC = (error: errorType) => ({type: 'APP/SET-ERROR',error } as const)
