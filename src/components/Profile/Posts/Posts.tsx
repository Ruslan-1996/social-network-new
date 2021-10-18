import React from 'react';
import { postType } from "../../../store/profileReducer";
import Post from "./Post/Post";
import s from './Posts.module.css'

type propsType = {
  posts: Array<postType>
  userPhoto: string | null
  userName: string
}

const Posts: React.FC<propsType> = (props) => {

  const posts = props.posts.map((post: postType) => <Post post={post.post} id={post.id} key={post.id} likes={post.likes}
                                                          dataTime={post.dataTime}
                                                          userName={props.userName} userPhoto={props.userPhoto}/>)

  return (
    <div className={s.wrapper}>
      {posts.reverse()}
    </div>
  );
}

export default Posts;
