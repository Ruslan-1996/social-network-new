import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './UserInMessage.module.css';
import PhotoNUll from '../../common/PhotoNull/PhotoNull';

type propsType = {
    user: string,
    avatar: string | null,
    id: number
}

const UserInMessage: React.FC<propsType> = (props) => {
    return (
        <NavLink to={`/message/${props.id}`} className={s.user} activeClassName={s.active}>
            <div className={s.userPhotoBlock}>
                {props.avatar ?
                    <img src={props.avatar} alt="userPhoto" className={s.userPhoto}/>
                    :
                    <PhotoNUll size={'lg'} isCirlce={true}/>
                }
            </div>
            <div>{props.user}</div>
        </NavLink>
    );
}

export default UserInMessage;
