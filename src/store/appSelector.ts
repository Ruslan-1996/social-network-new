import {AppStateType} from "./store";

export const selectIsInitialized = (state: AppStateType) => state.app.isInitialized