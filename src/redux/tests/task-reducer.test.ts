import { addTaskAC, removeTaskAC, TaskPriorities, TaskReducer, TasksMainType, TaskStatuses } from "../task-reducer";

let statrtState: TasksMainType = {}

beforeEach(() => {
    statrtState = {
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

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('todolistId2', "2")

    const endState = TaskReducer(statrtState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()

})

test('correct task should be added in correct array', () => {

    const action = addTaskAC({
    description: '',
    title: 'RDUX', 
    completed: false, 
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: '',
    deadline: '',
    id: 'id exist',
    todoListId: 'todolistId1',
    order: 0,
    addedDate: '',
    }, 'todolistId1')

    const endState = TaskReducer(statrtState, action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    // expect(endState['todolistId1'].every(t => t.id === 'id exist' && t.title === 'RDUX')).toBeTruthy()

})