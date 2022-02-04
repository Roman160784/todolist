import { todolistReducers, TodolistsType } from "./todolist-reducers";

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