import { combineReducers, createStore } from "redux";
import { taskReducers } from "./task/task-reducers";
import { todolistReducers } from "./todolist/todolist-reducers";

let rootReducer = combineReducers ({
    task: taskReducers,
    todolist: todolistReducers
})

export type rootReducerTypes = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer)
