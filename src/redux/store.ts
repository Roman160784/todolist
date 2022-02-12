import { applyMiddleware, combineReducers, createStore } from "redux";
import { taskReducers } from "./task/task-reducers";
import { todolistReducers } from "./todolist/todolist-reducers";
import thunk from 'redux-thunk';

let rootReducer = combineReducers ({
    task: taskReducers,
    todolist: todolistReducers
})

export type rootReducerTypes = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer,applyMiddleware(thunk))


