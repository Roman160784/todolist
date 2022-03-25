import { SportsTennis } from "@material-ui/icons"
import { AxiosError } from "axios"
import { type } from "os"
import { rawListeners, title } from "process"
import { Dispatch } from "redux"

import { textSpanContainsTextSpan } from "typescript"
import { v1 } from "uuid"






export type FilterValueType = "all" | "active" | "completed"
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export enum ResultCode {
    succes = 0,
    fail = 1,
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}



let initialState: TodolistDomainType[] = [
    // {id: todolistId1, title: "What to learn", addedDate: "11.11.2011"},
    // {id: todolistId2, title: "What to Buy", },
]

export const TodolistReducer = (state: TodolistDomainType[] = initialState, action: MainTodolistActionType): TodolistDomainType[] => {
    

    return state
}

export type MainTodolistActionType = ''
