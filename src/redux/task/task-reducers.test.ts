import { MainTasksType, taskReducers } from "./task-reducers";

const startState : MainTasksType = {
    "todolistID1" : [
        {id: "1", title: "react", isDone: false},
        {id: "2", title: "redux", isDone: false},
        {id: "3", title: "html", isDone: true},
    ],
    "todolistID2" : [
        {id: "4", title: "Bread", isDone: false},
        {id: "5", title: "Milk", isDone: false},
        {id: "6", title: "Water", isDone: true},
    ],
}

test  ('correct task should be deleted from correct array', () => {

    let tID = "4"
    let tlID = "todolistID2"

    const endState = taskReducers(startState, {type: "REMOVE-TASK", payload: {todolistID: tlID, id: tID}})
    
    expect(endState).toEqual({
        "todolistID1" : [
            {id: "1", title: "react", isDone: false},
            {id: "2", title: "redux", isDone: false},
            {id: "3", title: "html", isDone: true},
        ],
        "todolistID2" : [
            {id: "5", title: "Milk", isDone: false},
            {id: "6", title: "Water", isDone: true},
        ],
    })
    expect(endState["todolistID2"].length).toEqual(2)
})

test  ('correct task should be add in correct array', () => {

    let title = "Axios"
    let tlID = "todolistID1"

    const endState = taskReducers(startState, {type: "ADD-TASK", payload: {todolistID: tlID, title: title}})
    
   
    expect(endState["todolistID1"].length).toBe(4)
    expect(endState["todolistID1"][0].title).toBe("Axios")
    
})
test  ('correct task should change status', () => {
    let tID = "3"
    let isDone = false
    let tlID = "todolistID1"

    const endState = taskReducers(startState, {type: "CHANGE-TASK-STATUS", payload: {todolistID: tlID, isDone: isDone, id: tID}})
    
    expect(endState["todolistID1"].length).toBe(3)
    expect(endState["todolistID1"][2].isDone).toBe(false)
    
})