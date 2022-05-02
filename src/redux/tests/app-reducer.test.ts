import { appReducer, AppReducerType, setAppErrorAC, setAppStatusAC, setIsLoginInAC } from "../app-reducer"

let startState: AppReducerType

beforeEach(() => {
    startState ={
        error: null,
        appStatus: 'idle',
        autorise: false,
    }
})

test('correct error messge should be set', () => {

    const endState = appReducer(startState, setAppErrorAC({error: 'test error'}))

    expect(endState.error).toBe('test error')
})

test('correct appStatus should be set', () => {

    const endState = appReducer(startState, setAppStatusAC({status: 'succeeded'}))

    expect(endState.appStatus).toBe('succeeded')
})

test('changing autorise', () => {

    const endState = appReducer(startState, setIsLoginInAC({autorise: true}))

    expect(endState.autorise).toBe(true)
})