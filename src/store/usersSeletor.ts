import {AppStateType} from "./store";

export const selectUsers = (state:AppStateType) => state.usersPage.users

export const selectTotalCount = (state:AppStateType) => state.usersPage.totalCount

export const selectPageNumber = (state:AppStateType) => state.usersPage.pageNumber

export const selectPageSize = (state:AppStateType) => state.usersPage.pageSize

export const selectIsPreloaderUsers = (state:AppStateType) => state.usersPage.isPreloader

export const selectIsFollowInProgress = (state:AppStateType) => state.usersPage.isFollowingInProgress