import { RootReducerType } from "../store";

export const selectIsLogin = (state: RootReducerType) => state.auth.isLogin