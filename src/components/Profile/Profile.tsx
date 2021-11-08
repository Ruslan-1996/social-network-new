import React from 'react';
import s from './Profile.module.css'
import {postType, userType} from "../../store/profileReducer";
import ProfileDescription from "./ProfileDescription/ProfileDescription";
import AddNewPost from "./AddNewPost/AddNewPost";
import Posts from "./Posts/Posts";

type propsType = {
    user: userType
    posts: Array<postType>
    newPostText: string
    addPost: () => void
    updatePostText: (text: string) => void
    isMeProfile: boolean
    status: string
    updateStatus: (status: string) => void
}

const Profile: React.FC<propsType> = (props) => {
    return (
        <div className={s.wrapper}>
            <ProfileDescription {...props}/>
            <AddNewPost newPostText={props.newPostText} addPost={props.addPost} updatePostText={props.updatePostText}/>
            <Posts posts={props.posts} userName={props.user.fullName} userPhoto={props.user.photos.small}/>
        </div>
    );
}

export default Profile;
