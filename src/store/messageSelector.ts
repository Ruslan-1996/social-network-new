import {AppStateType} from "./store";

export const usersInMessage = (state:AppStateType) => state.messagePage.usersInMessage

export const messages = (state:AppStateType) => state.messagePage.messages

export const newMessageText = (state:AppStateType) => state.messagePage.newMessageText