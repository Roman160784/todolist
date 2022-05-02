import { authReducer, AuthReducerType, setIsloggedInAC } from "../auth-reducer";

let startState: AuthReducerType

beforeEach(() => {
    startState = {
        isLogin: false
    }
})

test('isLogin should changed', () => {

    const endState = authReducer(startState, setIsloggedInAC({isLogin: true}))

    expect(endState.isLogin).toBe(true)
})