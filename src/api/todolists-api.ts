import axios, { AxiosResponse } from 'axios'

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
    }
}

export type TodolistsType = {
    id: string
    title: string
    addedDate: string
    order: number
}