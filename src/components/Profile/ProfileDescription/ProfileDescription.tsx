import React, { useState } from 'react';
import s from './ProfileDescription.module.css'
import { userType } from "../../../store/profileReducer";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileAvatar from './ProfileAvatar/ProfileAvatar';
import CropeImage from '../../common/CropImage/CropeImage';
import { useDispatch } from 'react-redux';

type propsType = {
  user: userType
  isMeProfile: boolean
  status: string
  updateStatus: (status: string) => void
}

const ProfileDescription: React.FC<propsType> = (props) => {

  const [editMode, setEditMode] = useState(false)

  const dispatch = useDispatch()

  return (<>
      {editMode ?
        <div className={s.wrapperCrop}>
          <CropeImage dispatch={dispatch} setEditMode={setEditMode}/>
        </div>
        :
        <div className={s.wrapper}>
          <div className={s.avatar}>
            <ProfileAvatar isMeProfile={props.isMeProfile} photo={props.user.photos.large} setEditMode={setEditMode}/>
          </div>
          <div className={s.bio}>
            <div className={`${s.aboutUserItem} ${s.name}`}>
              {props.user.fullName}
            </div>
            <ProfileStatus isMeProfile={props.isMeProfile} status={props.status} updateStatus={props.updateStatus}/>
          </div>
          <div className={s.aboutUser}>
            <div className={s.aboutUserItem}>
              {props.user.aboutMe && props.user.aboutMe}
            </div>
            <div className={s.aboutUserItem}>
              Looking for a job: {props.user.lookingForAJob ? 'Yes' : 'No'}
            </div>
            <div className={s.aboutUserItem}>
              {props.user.lookingForAJob && 'Job description: '} {props.user.lookingForAJob && props.user.lookingForAJobDescription}
            </div>
          </div>
        </div>
      }
    </>
  );
}


export default ProfileDescription;
