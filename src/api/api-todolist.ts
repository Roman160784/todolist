import axios, { AxiosResponse } from 'axios'
import { TasksType } from '../redux/task-reducer'
import { TodolistType } from '../redux/todolist-reducer'

const instance = axios.create({
    baseURL : 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY' : '97175220-c190-496e-865d-5113b6c78275'
    }
})

export const todolistAPI = {

    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists') 
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTodolist(title: string) {
        return instance.post<{title: string}, AxiosResponse<ResponseType<{item: TodolistType}>>>(`todo-lists`, {title})
    },
    removeTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    }
}


export type ResponseTasksType = {
    totalCount: number
    error: string | null
    items: TasksType[]
}

export type ResponseType <D={}> = {
    resultCode: number
    messages: string[]
    data: D 
}