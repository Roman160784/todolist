import axios, { AxiosResponse } from 'axios'
import { TaskPriorities, TaskStatuses, TasksType } from '../redux/task-reducer'
import { TodolistType } from '../redux/todolist-reducer'



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