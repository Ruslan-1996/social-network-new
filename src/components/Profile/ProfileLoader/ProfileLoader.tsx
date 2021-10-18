import React from 'react';
import s from './ProfileLoader.module.css'

const ProfileLoader = () => {

  return (
    <div className={s.wrapper}>
      <div className={s.description}>
        <div className={s.photoBlock}>
          <div className={s.userPhoto}></div>
        </div>
        <div className={s.bio}>
          <div className={s.item}></div>
          <div className={s.item}></div>
        </div>
        <div className={s.aboutUser}>
          <div className={s.item}></div>
          <div className={s.item}></div>
        </div>
      </div>
      <div className={s.addPost}>
        <div className={s.textarea}>
        </div>
        <div className={s.button}></div>
      </div>
      <div className={s.posts}>
        <div className={s.post}>
          <div className={s.wrapperItemPost}>
            <div className={s.photoBlockPost}>
            </div>
            <div>
              <div className={s.userNamePost}>
              </div>
              <div className={s.postText}>
              </div>
            </div>
          </div>
          <div className={s.likesBlock}>
          </div>
        </div>
        <div className={s.post}>
          <div className={s.wrapperItemPost}>
            <div className={s.photoBlockPost}>
            </div>
            <div>
              <div className={s.userNamePost}>
              </div>
              <div className={s.postText}>
              </div>
            </div>
          </div>
          <div className={s.likesBlock}>
          </div>
        </div>
        <div className={s.post}>
          <div className={s.wrapperItemPost}>
            <div className={s.photoBlockPost}>
            </div>
            <div>
              <div className={s.userNamePost}>
              </div>
              <div className={s.postText}>
              </div>
            </div>
          </div>
          <div className={s.likesBlock}>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileLoader
