import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import messageReducer from "./messageReducer";
import usersReducer from "./usersReducer";
import profileReducer from "./profileReducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import appReducer from "./appReducer";

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>

let rootReducers = combineReducers({
  messagePage: messageReducer,
  usersPage: usersReducer,
  profilePage: profileReducer,
  auth: authReducer,
  app: appReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;