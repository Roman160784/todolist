import { v1 } from "uuid";
import { addTodolistTC, changeTodolistFilterAC, changeTodolistTitleTC, getTodolistsTC, removeTodolistTC, TodolistDomainType, TodolistReducer, TodolistType } from "../todolist-reducer";


let startState: TodolistDomainType[] = []
let todo: TodolistType = { id: '7', addedDate: '', order: 0, title: 'test' }

beforeEach(() => {
    // let todolistId1 = v1()
    // let todolistId2 = v1()
    startState = [
        { id: '1', addedDate: '', order: 0, title: 'What to learn', filter: 'all', entityStatus: "idle" },
        { id: '2', addedDate: '', order: 0, title: 'What to buy', filter: 'all', entityStatus: "idle" },
    ]
})

test('correctn todolist should be removed', () => {

    const endState = TodolistReducer(startState, removeTodolistTC.fulfilled({ todolistId: '2' }, "requestId", { todolistId: '2' }))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe('1')

})

test('correct todolist should be added', () => {

    const endState = TodolistReducer(startState, addTodolistTC.fulfilled({ todolist: todo }, 'requestId', { title: 'test' }))

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe('7')
    expect(endState[0].title).toBe(todo.title)

})

test('correct todolist sould change title', () => {

    const endState = TodolistReducer(startState, changeTodolistTitleTC.fulfilled
        ({ todolistId: '1', title: 'SUPER TEST' }, 'requestId', { todolistId: '1', title: 'SUPER TEST' }))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('SUPER TEST')
    expect(endState[0].id).toBe('1')
})

test('correct todolist sould change filter', () => {

    const endState = TodolistReducer(startState, changeTodolistFilterAC({ todolistId: '2', value: 'completed' }))

    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe('completed')
    expect(endState[0].filter).toBe('all')
    expect(endState[1].id).toBe('2')
})

test('todolist should be added', () => {

    const action = getTodolistsTC.fulfilled({ todolist: startState }, 'requestId')
    const endState = TodolistReducer([], action)

    expect(endState.length).toBe(2)
})