import axios, { AxiosResponse } from 'axios'
import { TaskPriorities, TaskStatuses, TasksType } from '../redux/task-reducer'
import { RequestStatusType, TodolistType } from '../redux/todolist-reducer'



export type ResponseTasksType = {
    error: string | null
    totalCount: number
    items: TasksType[]
}

export type ResponseType <D={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
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

const instance = axios.create({
    baseURL : 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY' : '97175220-c190-496e-865d-5113b6c78275'
    }
})

 export const todiListAPI = {
    getTodolist() {
       return instance.get<TodolistType[]>('todo-lists')
    },
    getTask(todolistId: string) {
        return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    addTodolist(title: string) {
        return instance.post<{title: string}, AxiosResponse<ResponseType<{item:TodolistType}>>>('todo-lists', {title})
    },
    removeTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    createTask (todolistId: string, title: string){
        return instance.post<{title: string}, AxiosResponse<ResponseType<{item: TasksType}>>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    changeTlTitle(todolistId: string, title: string){
        return instance.put<{title: string}, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTasksType){
        return instance.put<{model: UpdateTasksType}, AxiosResponse<ResponseType<{item: TasksType}>>>(`todo-lists/${todolistId}/tasks/${taskId}`, {...model})
    },
    

}