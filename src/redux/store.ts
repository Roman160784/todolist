
import { combineReducers, createStore } from "redux";
import { TaskReducer } from "./task-reducer";
import { TodolistReducer } from "./todolist-reducer";


let rootReducer = combineReducers({
todolist: TodolistReducer,
tasks: TaskReducer,
})

export type RootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
