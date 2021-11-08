import React, { useEffect } from 'react';
import { AppStateType } from "../../store/store";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import {
  postType,
  updatePostText,
  userType,
  addPost,
  updateUser,
  togglePreloaderProfile, getProfile, getStatus, updateStatus
} from "../../store/profileReducer";
import Profile from "./Profile";
import ProfileLoader from "./ProfileLoader/ProfileLoader";
import { compose } from "redux";


type propsType = mapStateToPropsType & mapDispatchToProps & otherPropsType

type otherPropsType = {
  match: any
  history: any
}

const ProfileContainer: React.FC<propsType> = (props) => {
  const {getProfile, getStatus, user, isPreloader} = props

  let userId = props.match.params.userId
  if (!userId) {
    userId = props.authUserID
    if (!userId) {
      props.history.push('/login')
    }
  }

  const isMeProfile = (Number(userId) === props.authUserID)

  useEffect(() => {
    getProfile(userId)
    getStatus(userId)
  }, [userId, getProfile, getStatus])

  useEffect(() => {
    function changeDocumentTitle(title : string) {
      document.title = title
    }
    changeDocumentTitle(user.fullName)
    return () => changeDocumentTitle('Social Network')
  }, [user.fullName])

  if (!isPreloader) {
    return <ProfileLoader/>
  }

  return <Profile isMeProfile={isMeProfile} {...props}/>
}

type mapStateToPropsType = {
  user: userType
  posts: Array<postType>
  newPostText: string
  isPreloader: boolean
  authUserID: number | null
  status: string
}

type mapDispatchToProps = {
  addPost: () => void
  updatePostText: (text: string) => void
  updateUser: (user: userType) => void
  togglePreloaderProfile: (isPreloader: boolean) => void
  getProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
  return {
    user: state.profilePage.user,
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
    isPreloader: state.profilePage.isPreloader,
    authUserID: state.auth.id,
    status: state.profilePage.status
  }
}

export default compose<React.ComponentType>(
  withRouter,
  connect<mapStateToPropsType, mapDispatchToProps, {}, AppStateType>(mapStateToProps, {
    addPost,
    updatePostText,
    updateUser,
    togglePreloaderProfile,
    getProfile,
    getStatus,
    updateStatus
  }))
(ProfileContainer);
