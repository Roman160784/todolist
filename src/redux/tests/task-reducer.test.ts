import { addTaskAC, getTasksAC, removeTaskAC, TaskPriorities, TaskReducer, TasksMainType, TaskStatuses, TasksType, updateTaskAC } from "../task-reducer";
import { addTodolistAC, getTodolistAC, removeTodolistAC, TodolistType } from "../todolist-reducer";

let startState: TasksMainType = {}

beforeEach(() => {
    startState = {
        'todolistId1' : [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
            startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, completed: true, addedDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
            startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, completed: false, addedDate: ''},
            {id: '3', title: 'REACT', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
            startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, completed: false, addedDate: ''},

        ],
        'todolistId2' : [
            {id: '1', title: 'BREAD', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
            startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, completed: true, addedDate: ''},
            {id: '2', title: 'MILK', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
            startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, completed: false, addedDate: ''},
            {id: '3', title: 'SUGAR', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
            startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, completed: false, addedDate: ''},
        ],
    }
})

let task: TasksType = {description: '',
title: 'RDUX', 
completed: false, 
status: TaskStatuses.New,
priority: TaskPriorities.Low,
startDate: '',
deadline: '',
id: 'id exist',
todoListId: 'todolistId1',
order: 0,
addedDate: '',}

let todolist: TodolistType = {
    id: '1111',
    addedDate: '',
    order: 0,
    title: 'TEST'
}

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC({todolistId:'todolistId2',id: "2"})

    const endState = TaskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()

})

test('correct task should be added in correct array', () => {

    const action = addTaskAC({ tasks: task, todolistId: 'todolistId1'})
    

    const endState = TaskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][0].title).toBe('RDUX')
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)

})

test('correct task should changed status', () => {

    const action = updateTaskAC({todolistId: 'todolistId2', id: '3', task: task})

    const endState = TaskReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][2].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
})

test('correct task should changed title', () => {

    const action = updateTaskAC({todolistId: 'todolistId1', id: '1', task: task})

    const endState = TaskReducer(startState, action)

    expect(endState['todolistId1'][0].title).toBe('RDUX')
    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
})

test('new empty array should be added, when new todolist created', () => {

    const action = addTodolistAC({todolist})

    const endState = TaskReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if(!newKey){
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('task should be deleted, when todolist deleled', () => {

    const action = removeTodolistAC({todolistId: 'todolistId1'})

    const endState = TaskReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId1']).not.toBeDefined()
})

test('empty array should be added when we add todolists', () => {
    const action = getTodolistAC({todolist: [
        {id: '888', addedDate: '', order: 0, title: 'TEST1'},
        {id: '555', addedDate: '', order: 0, title: 'TEST2'},
    ] } )

    const endState = TaskReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['888']).toBeDefined()
    expect(endState['555']).toBeDefined()
})

test('tasks should be added for todolist', () => {

    const action = getTasksAC({tasks: startState['todolistId1'], todolistId: 'todolistId1'})

    const endState = TaskReducer({
        'todolistId1' : [], 
        'todolistId2' : [] 
    }, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})