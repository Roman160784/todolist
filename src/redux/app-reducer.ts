import { RequestStatusType } from "./todolist-reducer";

export type errorType = string | null 

const initialState = {
   status: 'succeeded' as RequestStatusType,
   error:  null as errorType
}

export type initialAppStateType = typeof initialState

export const appReducer = (state: initialAppStateType = initialState, action: MainActiomAppType): initialAppStateType => {
    switch(action.type){
        case 'APP/SET-STATUS': {
          return  {...state, status : action.status}
        }
        case 'APP/SET-ERROR' : {
            return  {...state, error : action.error}
        }
    }
    
return state
}

export type MainActiomAppType = appStatusACtype | appErrorACtype

export type appStatusACtype = ReturnType<typeof appStatusAC>
export type appErrorACtype = ReturnType<typeof appErrorAC>

export const appStatusAC = (status: RequestStatusType) => ({type:'APP/SET-STATUS', status} as const)
export const appErrorAC = (error: errorType) => ({type:'APP/SET-ERROR', error} as const)

