import { usersAPI } from "../api/api";

const FOLLOW = 'usersReducer/FOLLOW'
const UNFOLLOW = 'usersReducer/UNFOLLOW'
const GET_USERS = 'usersReducer/GET_USERS'
const GET_TOTAL_COUNT = 'usersReducer/GET_TOTAL_COUNT'
const GET_PAGE_NUMBER = 'usersReducer/GET_PAGE_NUMBER'
const SET_PRELOADER = 'usersReducer/SET_PRELOADER'
const TOGGLE_FOLLOW_IN_PROGRESS = 'usersReducer/TOGGLE_FOLLOW_IN_PROGRESS'

export type usersType = {
  name: string,
  id: number,
  photos: {
    small: null | string,
    large: null | string
  },
  status: null | string,
  followed: boolean
}

let initialState = {
  users: [] as Array<usersType>,
  totalCount: 0,
  pageNumber: 1,
  pageSize: 50,
  isPreloader: false,
  isFollowingInProgress: [] as Array<number>
}

type initialStateType = typeof initialState


const usersReducer = (state = initialState, action: actionType): initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user: usersType) => user.id === action.userId ? {
          ...user,
          followed: true
        } : {...user})
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user: usersType) => user.id === action.userId ? {
          ...user,
          followed: false
        } : {...user})
      }
    case GET_USERS:
      return {
        ...state,
        users: [...action.users]
      }
    case GET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.totalCount
      }
    case GET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.pageNumber
      }
    case SET_PRELOADER:
      return {
        ...state,
        isPreloader: action.preloader
      }
    case TOGGLE_FOLLOW_IN_PROGRESS:
      return {
        ...state,
        isFollowingInProgress: action.isFetching ? [...state.isFollowingInProgress, action.userID]
          : state.isFollowingInProgress.filter(userID => userID !== action.userID)
      }
    default:
      return state;
  }
}

type actionType =
  followACType
  | unfollowACType
  | getUsersACType
  | getTotalCountType
  | getPageNumberType
  | setPreloaderType
  | toggleFollowingInProgressType


type followACType = {
  type: typeof FOLLOW,
  userId: number
}

type unfollowACType = {
  type: typeof UNFOLLOW,
  userId: number
}

export const followAC = (userId: number): followACType => {
  return {
    type: FOLLOW,
    userId
  }
}

export const unfollowAC = (userId: number): unfollowACType => {
  return {
    type: UNFOLLOW,
    userId
  }
}

type getUsersACType = {
  type: typeof GET_USERS
  users: Array<usersType>
}

export const getUsersAC = (users: Array<usersType>): getUsersACType => {
  return {
    type: GET_USERS,
    users
  }
}

type getTotalCountType = {
  type: typeof GET_TOTAL_COUNT,
  totalCount: number
}

export const getTotalCountAC = (totalCount: number): getTotalCountType => {
  return {
    type: GET_TOTAL_COUNT,
    totalCount
  }
}

type getPageNumberType = {
  type: typeof GET_PAGE_NUMBER
  pageNumber: number
}

export const getPageNumberAC = (pageNumber: number): getPageNumberType => {
  return {
    type: GET_PAGE_NUMBER,
    pageNumber
  }
}

type setPreloaderType = {
  type: typeof SET_PRELOADER
  preloader: boolean
}

export const setPreloaderAC = (preloader: boolean): setPreloaderType => {
  return {
    type: SET_PRELOADER,
    preloader
  }
}

type toggleFollowingInProgressType = {
  type: typeof TOGGLE_FOLLOW_IN_PROGRESS,
  isFetching: boolean
  userID: number
}

export const toggleFollowingInProgressAC = (isFetching: boolean, userID: number): toggleFollowingInProgressType => {
  return {
    type: TOGGLE_FOLLOW_IN_PROGRESS,
    isFetching,
    userID
  }
}

export const getUsers = (pageSize: number, pageNumber: number) => {
  return (dispatch: any) => {
    dispatch(setPreloaderAC(false))
    usersAPI.getUsers(pageSize, pageNumber)
      .then(response => {
          dispatch(getUsersAC(response.data.items))
          dispatch(getTotalCountAC(response.data.totalCount))
          dispatch(setPreloaderAC(true))
        }
      )
  }
}

export const follow = (userId: number) => {
  return (dispatch: any) => {
    dispatch(toggleFollowingInProgressAC(true, userId))
    usersAPI.follow(userId).then(response => {
      if (response.data.resultCode === 0) {
        dispatch(followAC(userId))
      }
      dispatch(toggleFollowingInProgressAC(false, userId))
    })
  }
}

export const unfollow = (userId: number) => {
  return (dispatch: any) => {
    dispatch(toggleFollowingInProgressAC(true, userId))
    usersAPI.unfollow(userId).then(response => {
      if (response.data.resultCode === 0) {
        dispatch(unfollowAC(userId))
      }
      dispatch(toggleFollowingInProgressAC(false, userId))
    })
  }
}


export default usersReducer