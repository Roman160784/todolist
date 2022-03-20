import { RequestStatusType } from "./todolist-reducer";



const initialState = {
   status: 'succeeded' as RequestStatusType
}

export type initialAppStateType = typeof initialState

export const appReducer = (state: initialAppStateType = initialState, action: MainActiomAppType): initialAppStateType => {
    switch(action.type){
        case 'APP/STATUS-AC': {
          return  {...state, status : action.status}
        }
    }
    
return state
}

export type MainActiomAppType = appStatusACtype

export type appStatusACtype = ReturnType<typeof appStatusAC>

export const appStatusAC = (status: RequestStatusType) => ({type:'APP/STATUS-AC', status} as const)

