import { fiterValueType, todolistReducers, TodolistsType } from "./todolist-reducers";

const startState : TodolistsType[] = [
    {id: "todolistID1", title: "What to learn", filter: "all"},
    {id: "todolistID2", title: "What to Buy", filter: "all"},
]

test  ('correct todolist should be added', () => {

    let tID = "WWW"
    let tlID = "3"

    const endState = todolistReducers(startState, {type: "ADD-TODOLIST", payload: {todolistID: tlID, title: tID}})
    
    expect(endState).toEqual([
    {id: "3", title: "WWW", filter: "all"},
    {id: "todolistID1", title: "What to learn", filter: "all"},
    {id: "todolistID2", title: "What to Buy", filter: "all"},
    ])

    expect(endState.length).toEqual(3)
    expect(endState[0].title).toEqual("WWW")
    expect(endState[0].id).toEqual("3")
})

test  ('correct todolist should change filter', () => {

    let tlID = "todolistID1"
    let value: fiterValueType = "completed"

    const endState = todolistReducers(startState, {type: "CHANGE-FILTER", payload: {todolistID: tlID, value: value}})
    
    expect(endState[0].filter).toEqual("completed")
    
})
test  ('correct todolist should deleted', () => {

    let tlID = "todolistID1"
    
    const endState = todolistReducers(startState, {type: "REMOVE-TODOLIST", payload: {todolistID: tlID}})
    
    expect(endState.length).toEqual(1)
    expect(endState[0].id).toBe("todolistID2")
    
})
test  ('correct todolist should change title', () => {

    let tlID = "todolistID2"
    let newTitle = "I Know"
    
    const endState = todolistReducers(startState, {type: "CHANGE-TITLE-IN-TL", payload: {todolistID: tlID, newTitle: newTitle}})
    
    expect(endState.length).toEqual(2)
    expect(endState[1].title).toBe("I Know")
    
})