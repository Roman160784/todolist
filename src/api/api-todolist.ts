import axios, { AxiosResponse } from 'axios'
import { TaskPriorities, TaskStatuses, TasksType } from '../redux/task-reducer'
import { TodolistType } from '../redux/todolist-reducer'


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY" : '97175220-c190-496e-865d-5113b6c78275'
    }
})


export const todolistAPI = {
    getTodoList(){
        return instance.get<TodolistType[]>('todo-lists')
    },
    getTasks(todolistId: string){
        return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTodolist(title: string){
        return instance.post<{title : string}, AxiosResponse <ResponseType<{item : TodolistType}>>>(`todo-lists`, {title})
    },
    removeTodolist(todolistId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<{title : string}, AxiosResponse <ResponseType<{item : TasksType}>>>(`todo-lists/${todolistId}/tasks`, {title})
    }, 
    deleteTasks(todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTL(todolistId: string, title: string){
        return instance.put<{title: string}, AxiosResponse <ResponseType>>(`todo-lists/${todolistId}`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTasksType) {
        return instance.put<{model: UpdateTasksType}, AxiosResponse<ResponseType<{ item: TasksType }>>>
        (`todo-lists/${todolistId}/tasks/${taskId}`, {...model})
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