export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null

const initialState = {
    status: 'loading' as RequestStatusType,
    error: "error" as ErrorType
}

export type initialStateType = typeof initialState
export type changeAppStatusType = ReturnType<typeof changeAppStatusAC>
export type setErrorACType = ReturnType<typeof setErrorAC>

type ActionsType = changeAppStatusType | setErrorACType

export const appReducer = (state: initialStateType = initialState, action: ActionsType):initialStateType => {
switch(action.type) {
    case "APP/CHANGE-STATUS" : {
      return  {...state, status: action.payload.status}
    }
    case "APP/SET-ERROR" : {
      return  {...state, error: action.payload.error}
    }

    default: return state
}
}

export const changeAppStatusAC = (status: RequestStatusType) => {
    return{
        type: "APP/CHANGE-STATUS",
        payload: {
            status
        }
    }as const
}
export const setErrorAC = (error: string | null) => {
    return{
        type: "APP/SET-ERROR",
        payload: {
            error
        }
    }as const
}




