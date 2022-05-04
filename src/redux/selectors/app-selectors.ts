import { RootReducerType } from "../store"

export const selectAutorised = (state: RootReducerType) => state.app.autorise
export const selectStatus = (state: RootReducerType) => state.app.appStatus