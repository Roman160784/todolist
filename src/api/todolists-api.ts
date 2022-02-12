import axios, { AxiosResponse } from 'axios'
import { TasksType } from '../redux/task/task-reducers';
import { fiterValueType } from '../redux/todolist/todolist-reducers';

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
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistsType }>>>('todo-lists', {title}); 
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<{title: string}, AxiosResponse<ResponseType<{item: TasksType}>>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<{title: string}, AxiosResponse<ResponseType>>(`/todo-lists/${id}/`,{title})
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


export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}