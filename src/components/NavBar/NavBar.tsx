import { faUserCircle, faComments } from '@fortawesome/free-regular-svg-icons';
import { faCog, faMusic, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css'

type propsType = {}

const NavBar: React.FC<propsType> = (props) => {
  return (
    <div className={s.wrapper}>
      <NavLink to='/profile' className={s.navLink} activeClassName={s.active}>
        <div className={s.navIcon}>
          <FontAwesomeIcon icon={faUserCircle}/>
        </div>
        <div className={s.nameLink}>Profile</div>
      </NavLink>
      <NavLink to='/message' className={s.navLink} activeClassName={s.active}>
        <div className={s.navIcon}>
          <FontAwesomeIcon icon={faComments}/>
        </div>
        <div className={s.nameLink}>Message</div>
      </NavLink>
      <NavLink to='/music' className={s.navLink} activeClassName={s.active}>
        <div className={s.navIcon}>
          <FontAwesomeIcon icon={faMusic}/>
        </div>
        <div className={s.nameLink}>Music</div>
      </NavLink>
      <NavLink to='/setting' className={s.navLink} activeClassName={s.active}>
        <div className={s.navIcon}>
          <FontAwesomeIcon icon={faCog}/>
        </div>
        <div className={s.nameLink}>Setting</div>
      </NavLink>
      <NavLink to='/users' className={s.navLink} activeClassName={s.active}>
        <div className={s.navIcon}>
          <FontAwesomeIcon icon={faUsers}/>
        </div>
        <div className={s.nameLink}>Users</div>
      </NavLink>
    </div>
  );
}

export default NavBar;
