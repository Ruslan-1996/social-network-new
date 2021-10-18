import {AppStateType} from "./store";

export const selectAuthId = (state: AppStateType) => state.auth.id

export const selectIsAuth = (state: AppStateType) => state.auth.isAuth

export const selectErrorMessage = (state: AppStateType) => state.auth.errorMessage

export const selectCaptcha = (state: AppStateType) => state.auth.captcha
