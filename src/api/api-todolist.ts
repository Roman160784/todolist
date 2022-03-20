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
    baseURL : 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY' : '97175220-c190-496e-865d-5113b6c78275'
    }
})

const todilistAPI = {
    
}