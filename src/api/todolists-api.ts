import axios, { AxiosResponse } from 'axios'
import { TasksType } from '../redux/task/task-reducers';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '97175220-c190-496e-865d-5113b6c78275'
    }
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistsType[]>('todo-lists');
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    }
}

export type TodolistsType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TasksType[]
}