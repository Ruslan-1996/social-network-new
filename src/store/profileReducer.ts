import { profileAPI, usersAPI } from "../api/api";
import { getPhotoAuthUser } from './authReducer';

const ADD_POST = 'profileReducer/ADD_POST'
const UPDATE_POST_TEXT = 'profileReducer/UPDATE_POST_TEXT'
const UPDATE_USER = 'profileReducer/UPDATE_USER'
const TOGGLE_PRELOADER = 'profileReducer/TOGGLE_PRELOADER'
const GET_STATUS = 'profileReducer/GET_STATUS'
const CHANGE_USER_PHOTO = 'profileReducer/CHANGE_USER_PHOTO'

export type dataTimeType = {
  years: number,
  month: number,
  day: number,
  hour: number,
  minute: number
}

export type postType = {
  post: string,
  id: number,
  likes: number
  dataTime: dataTimeType
}

type userPhotosType = {
  small: string | null,
  large: string | null
}

export type userType = {
  aboutMe: string | null,
  contacts: {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null
  },
  lookingForAJob: boolean,
  lookingForAJobDescription: string | null,
  fullName: string,
  userId: number,
  photos: userPhotosType

}

let initialState = {
  user: {} as userType,
  status: '',
  posts: [{post: 'Hi', id: 1, likes: 2, dataTime: {years: 2020, month: 0, day: 8, hour: 17, minute: 45}},
    {post: 'Boy', id: 2, likes: 5, dataTime: {years: 2020, month: 11, day: 25, hour: 17, minute: 45}},
    {
      post: 'Well',
      id: 3,
      likes: 1,
      dataTime: {years: 2021, month: 9, day: 9, hour: 14, minute:52}
    },] as Array<postType>,
  newPostText: '',
  isPreloader: false
}

type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: actionType): initialStateType => {
  switch (action.type) {
    case UPDATE_POST_TEXT:
      return {...state, newPostText: action.text};
    case ADD_POST:
      const currentData = new Date()
      let post = {
        post: state.newPostText,
        id: state.posts[state.posts.length - 1].id + 1,
        likes: 0,
        dataTime: {
          years: currentData.getFullYear(),
          month: currentData.getMonth(),
          day: currentData.getDate(),
          hour: currentData.getHours(),
          minute: currentData.getMinutes()
        }
      }
      state.newPostText = ''
      return {...state, posts: [...state.posts, post]};
    case UPDATE_USER:
      return {
        ...state,
        user: {...action.user}
      }
    case TOGGLE_PRELOADER:
      return {
        ...state,
        isPreloader: action.isPreloader
      }
    case GET_STATUS:
      return {
        ...state,
        status: action.status
      }
    case CHANGE_USER_PHOTO:
      return {
        ...state,
        user: {...state.user, photos: action.photo}
      }
    default:
      return state;
  }
}

type actionType =
  addPostType
  | updatePostTextType
  | updateUserType
  | togglePreloaderProfileType
  | getStatusSuccessType
  | changeUserPhotoSuccessType

export type updatePostTextType = {
  type: typeof UPDATE_POST_TEXT,
  text: string
}

export const updatePostText = (text: string): updatePostTextType => {
  return {
    type: UPDATE_POST_TEXT,
    text
  }
}

export type addPostType = {
  type: typeof ADD_POST,
}

export const addPost = (): addPostType => {
  return {
    type: ADD_POST,
  }
}

type updateUserType = {
  type: typeof UPDATE_USER
  user: userType
}

export const updateUser = (user: userType): updateUserType => {
  return {
    type: UPDATE_USER,
    user
  }
}

type togglePreloaderProfileType = {
  type: typeof TOGGLE_PRELOADER
  isPreloader: boolean
}

export const togglePreloaderProfile = (isPreloader: boolean): togglePreloaderProfileType => {
  return {
    type: TOGGLE_PRELOADER,
    isPreloader
  }
}

export const getProfile = (userId: number) => {
  return (dispatch: any) => {
    dispatch(togglePreloaderProfile(false))
    profileAPI.getProfile(userId)
      .then(response => {
        dispatch(updateUser(response.data))
        dispatch(togglePreloaderProfile(true))
      })
  }
}

type getStatusSuccessType = {
  type: typeof GET_STATUS
  status: string
}

const getStatusSuccess = (status: string): getStatusSuccessType => {
  return {
    type: GET_STATUS,
    status
  }
}

export const getStatus = (userId: number) => {
  return (dispatch: any) => {
    usersAPI.getStatus(userId).then(response => {
        return dispatch(getStatusSuccess(response.data))
      }
    )
  }
}

export const updateStatus = (status: string) => {
  return (dispatch: any) => {
    usersAPI.updateStatus(status).then(response => {
      if (response.data.resultCode === 0) {
        dispatch(getStatusSuccess(status))
      }
    })
  }
}

type changeUserPhotoSuccessType = {
  type: typeof CHANGE_USER_PHOTO
  photo: userPhotosType
}

const changeUserPhotoSuccessType = (photo: userPhotosType): changeUserPhotoSuccessType => {
  return {
    type: CHANGE_USER_PHOTO,
    photo
  }
}

export const changeUserPhoto = (file: File) => async (dispatch: any) => {
  const response = await profileAPI.changeUserPhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(changeUserPhotoSuccessType(response.data.data.photos))
    dispatch(getPhotoAuthUser(response.data.data.photos.small))
  }
}

export default profileReducer
