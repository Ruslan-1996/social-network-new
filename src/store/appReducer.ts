import {getAuthUser} from "./authReducer";

const APP_INITIALIZED = 'appReducer/APP_INITIALIZED'

let initialState = {
    isInitialized: false
}

type initialStateType = typeof initialState

const appReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case APP_INITIALIZED:
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        default:
            return state;
    }
}

type actionType = appInitializedType

type appInitializedType = {
    type: typeof APP_INITIALIZED
    isInitialized: boolean
}

const appInitializedSuccess = (isInitialized: boolean): appInitializedType => {
    return {
        type: APP_INITIALIZED,
        isInitialized
    }
}

export const appInitialized = () => {
    return (dispatch: any) => {
        const PromiseGetAuthUser = dispatch(getAuthUser())
        Promise.all([PromiseGetAuthUser]).then(() => {
                dispatch(appInitializedSuccess(true))
            }
        )
    }
}

export default appReducer