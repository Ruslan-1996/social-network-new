import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import s from './App.module.css'
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import MessagesContainer from "./components/Message/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import { Provider, useDispatch, useSelector } from "react-redux";
import PreloaderLogo from "./components/common/PreloaderLogo/PreloaderLogo";
import Login from "./components/Login/Login";
import { selectIsInitialized } from "./store/appSelector";
import { appInitialized } from "./store/appReducer";
import Music from './components/Music/Music';
import store from './store/store';
import Setting from './components/Setting/Setting';
import NotFound from './components/NotFound/NotFound';


const App = () => {

  const [editModeLogout, setEditModeLogout] = useState(false)

  const isInitialized = useSelector(selectIsInitialized)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(appInitialized())
  }, [dispatch])

  if (!isInitialized) {
    return <PreloaderLogo/>
  }

  return (
    <div className={s.wrapper} onClick={() => setEditModeLogout(false)}>
      <Header ediModeLogout={editModeLogout} setEditModeLogout={setEditModeLogout}/>
      <div className={s.container}>
        <nav className={s.sideBar}>
          <NavBar/>
        </nav>
        <div className={s.content}>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/profile'/>}/>
            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
            <Route path='/message' render={() => <MessagesContainer/>}/>
            <Route path='/music' render={() => <Music/>}/>
            <Route path='/setting' render={() => <Setting/>}/>
            <Route path='/users' render={() => <UsersContainer/>}/>
            <Route path='/login' render={() => <Login/>}/>
            <Route path='*' render={() => <NotFound/>}/>
          </Switch>
        </div>
      </div>
    </div>
  );
}


const AppContainer = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  )
}

export default AppContainer;