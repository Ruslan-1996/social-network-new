import React from 'react';
import s from './Post.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import PhotoNUll from '../../../common/PhotoNull/PhotoNull';
import SendMessageTime from '../../../common/SendMessageTime/SendMessageTime';

type propsType = {
  post: string
  id: number
  userPhoto: string | null
  userName: string
  likes: number
  dataTime: number
}

const Post: React.FC<propsType> = (props) => {
  const {userPhoto, userName, post, likes, dataTime} = props

  return (
    <div className={s.item}>
      <div className={s.wrapperItem}>
        <div className={s.photoBlock}>
          {userPhoto ?
            <img src={userPhoto} className={s.photo} alt='userPhoto'/>
            : <PhotoNUll size='2x' isCirlce={true}/>}
        </div>
        <div className={s.post}>
          <div className={s.bio}>
            <div className={s.userName}>
              {userName}
            </div>
            <div className={s.date}>
             <SendMessageTime dataTime={dataTime}/>
            </div>
          </div>
          <pre className={s.postText}>
            {post}
          </pre>
        </div>
      </div>
      <div className={s.likesBlock}>
        <FontAwesomeIcon icon={faHeartRegular}/>
        <span className={s.countLikes}>{likes}</span>
      </div>
    </div>
  );
}

export default Post;
