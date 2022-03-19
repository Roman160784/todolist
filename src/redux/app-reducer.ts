import { RequestStatusType } from "./todolist-reducer";


const initialState = {
    entityStatus: 'loading' as RequestStatusType
}

export type initialAppStateType = typeof initialState

export const appReducer = (state: initialAppStateType = initialState, action: MainActiomAppType): initialAppStateType => {
    switch(action.type) {
        case 'APP/SET-STATUS' :{
            return {...state, entityStatus: action.status}
        }
    }
return state
}

export type MainActiomAppType = setStatusACtype

export type setStatusACtype = ReturnType <typeof setStatusAC>

export const setStatusAC = (status : RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)