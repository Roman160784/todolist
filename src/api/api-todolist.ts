import axios, { AxiosResponse } from 'axios'
import { TaskPriorities, TaskStatuses, TasksType } from '../redux/task-reducer'
import { RequestStatusType, TodolistType } from '../redux/todolist-reducer'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY' : '7936c1b0-9aab-4143-9419-ddfa4fe244df'
    }
})

export const todolistAPI = {
    getTodolists(){
        return instance.get<TodolistType[]>('todo-lists')
    },
    addTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title})
    },
    removeTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    changeTodolistTitle(todolistId: string, title: string){
        return instance.put<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>(`todo-lists/${todolistId}`, {title})
    },
}

export const tasksAPI = {
    getTasks(todolistId: string){
        return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string){
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TasksType }>>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTasksType){
        return instance.put<{ model: UpdateTasksType }, AxiosResponse<ResponseType<{ item: TasksType }>>>
        (`todo-lists/${todolistId}/tasks/${taskId}`, {...model})
    }
}

export const authAPI = {
    login(logIn: LoginType){
       return instance.post<LoginType, AxiosResponse<ResponseType>>('auth/login', logIn)
    },
    logOut(){
        return instance.delete<ResponseType>('auth/login')
    },
    me(){
        return instance.get<ResponseType<MeResponseType>>('auth/me')
    },
}

export type MeResponseType = {
    id: number
    email: string
    login: string
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}

export type LoginResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
      userId: string
    }
}


export type ResponseTasksType = {
    error: string | null
    totalCount: number
    items: TasksType[]
}



export type ResponseType <D={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<string>
    data: D
}

export type UpdateTasksType ={
title: string
description: string
completed: boolean
status: TaskStatuses
priority: TaskPriorities
startDate: string
deadline: string
}
