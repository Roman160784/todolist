
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
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

export const store = createStore(rootReducer,applyMiddleware(thunk))

//@ts-ignore
window.store = store;