import React from 'react';
import s from './Header.module.css'
import nullPhoto from '../../static/clipart1128911.png'
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../store/store";
import { NavLink} from 'react-router-dom';
import { userLogOut } from "../../store/authReducer";
import cn from "classnames"

type propsType = {
  ediModeLogout: boolean
  setEditModeLogout: (editMode: boolean) => void
}

const Header: React.FC<propsType> = (props) => {

  const userName = useSelector((state: AppStateType) => state.auth.login)
  const userPhoto = useSelector((state: AppStateType) => state.auth.photo)
  const isAuthUser = useSelector((state: AppStateType) => state.auth.isAuth)
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(userLogOut())
  }

  const toggleEditMode = (e: any) => {
    e.stopPropagation()
    props.setEditModeLogout(!props.ediModeLogout)
  }

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>VR</div>
        <div className={s.user}>
          {isAuthUser ?
            <div className={cn(s.rightSection, {[s.active]: props.ediModeLogout})} onClick={toggleEditMode}>
              <div className={s.userData}>
                <div className={s.userPhoto}>
                  <img className={userPhoto ? s.photo : s.nullPhoto}
                       src={userPhoto ? userPhoto : nullPhoto}
                       alt="myPhoto"/>
                </div>
                <div>{userName}</div>
              </div>
              <div className={cn(s.profileMenu, {[s.active]: props.ediModeLogout})}>
                <NavLink to={'/profile'} className={s.profileMenuItem}>go to page {userName}</NavLink>
                <div onClick={logOut} className={s.profileMenuItem}>log out</div>
              </div>
            </div>
            : <div className={s.rightSection}>
              <NavLink to={'/login'} className={s.navLink}>Log in</NavLink>
            </div>}
        </div>
      </div>
    </header>
  );
}

export default Header;
