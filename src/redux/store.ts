
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "./auth-reducer";
import { TaskReducer } from "./task-reducer";
import { TodolistReducer } from "./todolist-reducer";


let rootReducer = combineReducers({
todolist: TodolistReducer,
tasks: TaskReducer,
app: appReducer,
auth: authReducer,
})

export type RootReducerType = ReturnType<typeof rootReducer>

//created store
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
          
})

//@ts-ignore
window.store = store;