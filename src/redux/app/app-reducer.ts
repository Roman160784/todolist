export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType
}

export type initialStateType = typeof initialState
export type changeAppStatusType = ReturnType<typeof changeAppStatusAC>
type ActionsType = changeAppStatusType

export const appReducer = (state: initialStateType = initialState, action: ActionsType):initialStateType => {
switch(action.type) {
    case "APP/CHANGE-STATUS" : {
      return  {...state, status: action.payload.status}
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




