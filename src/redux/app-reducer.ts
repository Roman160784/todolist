import { RequestStatusType } from "./todolist-reducer";

export type errorType = string | null 


const initialState = {
  appStatus: "succeeded" as RequestStatusType
}

export type initialAppStateType = typeof initialState

export const appReducer = (state: initialAppStateType = initialState, action: MainActiomAppType): initialAppStateType => {
    switch(action.type) {
        case 'APP/SET-STATUS': {
            return {...state, appStatus: action.status}
        }
    }
    
return state
}

export type MainActiomAppType = setAppStatusACtype

export type setAppStatusACtype = ReturnType<typeof setAppStatusAC>

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS',status } as const)
