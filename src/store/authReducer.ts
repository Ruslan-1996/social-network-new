import {authAPI, profileAPI, userLoginDataType} from "../api/api";

const GET_AUTH_USER = 'authReducer/GET_AUTH_USER'
const GET_PHOTO_AUTH_USER = 'authReducer/GET_PHOTO_AUTH_USER'
const GET_ERROR_MESSAGE = 'authReducer/GET_ERROR_MESSAGE'
const GET_CAPTCHA = 'authReducer/GET_CAPTCHA'

export type authUserType = {
    id: number,
    login: string,
    email: string
}

let initialState = {
    id: null as number | null,
    login: '',
    email: '',
    captcha: '',
    isAuth: false,
    photo: null as string | null,
    errorMessage: ''
}

type initialStateType = typeof initialState

const authReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case GET_AUTH_USER:
            return {
                ...state,
                id: action.user.id,
                login: action.user.login,
                email: action.user.email,
                isAuth: !state.isAuth
            }
        case GET_PHOTO_AUTH_USER:
            return {
                ...state,
                photo: action.photo
            }
        case GET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.message
            }
        case GET_CAPTCHA:
            return {
                ...state,
                captcha: action.captcha
            }
        default:
            return state;
    }
}

type actionType = getAuthUserType | getPhotoAuthUserType | getErrorMessageType | getCaptchaType

export type getAuthUserType = {
    type: typeof GET_AUTH_USER,
    user: authUserType
}

export const getAuthUserSuccess = (user: authUserType): getAuthUserType => {
    return {
        type: GET_AUTH_USER,
        user
    }
}

type getPhotoAuthUserType = {
    type: typeof GET_PHOTO_AUTH_USER
    photo: string | null
}

export const getPhotoAuthUser = (photo: string | null): getPhotoAuthUserType => {
    return {
        type: GET_PHOTO_AUTH_USER,
        photo
    }
}

type getErrorMessageType = {
    type: typeof GET_ERROR_MESSAGE
    message: string
}

const getErrorMessage = (message: string): getErrorMessageType => {
    return {
        type: GET_ERROR_MESSAGE,
        message
    }
}

type getCaptchaType = {
    type: typeof GET_CAPTCHA
    captcha: string
}

const getCaptcha = (captcha: string): getCaptchaType => {
    return {
        type: GET_CAPTCHA,
        captcha
    }
}

export const getAuthUser = () => {
    return (dispatch: any) => {
        return authAPI.getAuthUser().then(response => {
            if (response.resultCode === 0) {
                dispatch(getAuthUserSuccess(response.data))
                const userId = response.data.id
                profileAPI.getProfile(userId).then(response => {
                    dispatch((getPhotoAuthUser(response.data.photos.large)))
                })
            }
        })
    }
}

export const userLogin = (userLoginData: userLoginDataType) => {
    return (dispatch: any) => {
        authAPI.userLogin(userLoginData).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUser())
                dispatch(getCaptcha(''))
                dispatch(getErrorMessage(''))
            } else if (response.data.resultCode === 1) {
                dispatch(getErrorMessage(response.data.messages[0]))
            } else if (response.data.resultCode === 10) {
                dispatch(getErrorMessage(response.data.messages[0]))
                authAPI.getCaptcha().then(response => {
                    dispatch(getCaptcha(response.url))
                })
            }
        })
    }
}

export const userLogOut = () => {
    return (dispatch: any) => {
        authAPI.userLogOut().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserSuccess({id: NaN, email: '', login: ''}))
                dispatch(getPhotoAuthUser(''))
            }
        })
    }
}

export default authReducer