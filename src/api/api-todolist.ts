import axios from 'axios'
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
        return instance.get(`todo-lists/${todolistId}/tasks`)
    }
}

