import React from 'react';
import s from './User.module.css'
import { NavLink } from 'react-router-dom';
import PreloaderForButton from "../../common/PreloaderForButton/PreloaderForButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

type propsType = {
  follow: (userId: number) => void,
  unfollow: (userId: number) => void,
  name: string,
  id: number,
  authId: number | null
  photo: null | string,
  status: null | string,
  followed: boolean,
  isFollowInProgress: Array<number>,
}

const User: React.FC<propsType> = (props) => {

  const follow = () => {
    props.follow(props.id)
  }

  const unfollow = () => {
    props.unfollow(props.id)
  }

  return (
    <div className={s.wrapper}>
      <NavLink to={`profile/${props.id}`} className={s.photoBlock}>
        {props.photo ? <img className={s.photo} src={props.photo}/>
          : <div className={s.photoNull} style={{borderRadius: '100px'}}>
            <FontAwesomeIcon icon={faUser} color={'white'}/>
          </div>}
      </NavLink>
      {(props.authId !== props.id && props.authId) && (props.followed ?
        <button disabled={props.isFollowInProgress.some(userID => userID === props.id)} className={s.button}
                onClick={unfollow}>
          {props.isFollowInProgress.some(userID => userID === props.id) ?
            <PreloaderForButton/> : 'unfollow'}
        </button>
        :
        <button disabled={props.isFollowInProgress.some(userID => userID === props.id)} className={s.button}
                onClick={follow}>
          {props.isFollowInProgress.some(userID => userID === props.id) ?
            <PreloaderForButton/> : 'follow'}
        </button>)}
      <div className={s.bio}>
        <div>{props.name}</div>
        <div>{props.status ? props.status : 'Don\'t have a status'}</div>
      </div>
    </div>
  );
}

export default User;
