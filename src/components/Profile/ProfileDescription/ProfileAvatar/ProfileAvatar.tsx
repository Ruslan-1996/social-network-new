import React from 'react';
import s from './ProfileAvatar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faExchangeAlt, faUser } from '@fortawesome/free-solid-svg-icons';

type propsType = {
  photo: string | null
  isMeProfile: boolean
  setEditMode: (editMode: boolean) => void
}

const ProfileAvatar: React.FC<propsType> = (props) => {
  const {photo, isMeProfile, setEditMode} = props

  return (
    <div className={s.wrapper}>
      <div className={s.photoBlock}>
        {photo ? <img className={s.photo} src={photo} alt='userPhoto'/>
          : <div className={s.photoNull}>
            <FontAwesomeIcon icon={faUser} color={'white'}/>
          </div>}
        {isMeProfile && <>
          <div onClick={() => setEditMode(true)} className={s.changeProfileBlock}>
            <div className={s.changePhoto}>
              <div className={s.changePhotoTitle}>Change photo</div>
              <div className={s.changePhotoIcon}>
                <div className={s.changePhotoChangeIcon}>
                  <FontAwesomeIcon icon={faExchangeAlt}/>
                </div>
                <FontAwesomeIcon icon={faCamera}/>
              </div>
            </div>
          </div>
        </>}
      </div>
    </div>

  );
}

export default ProfileAvatar;
