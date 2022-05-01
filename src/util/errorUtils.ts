import { Dispatch } from "redux"
import { setAppErrorAC } from "../redux/app-reducer"
import {ResponseType} from "../api/api-todolist"


export const serverErrorHandler = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    }else{
        dispatch(setAppErrorAC({error: 'Somthing bad'}))
    }
}