import React from 'react';
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from './AddNewPost.module.css'

type propsType = {
  newPostText: string
  addPost: () => void
  updatePostText: (text: string) => void
}

const AddNewPost: React.FC<propsType> = (props) => {

  const onKeyDown = (e: any) => {
    if(e.keyCode === 13) {
      e.currentTarget.innerHTML = e.currentTarget.innerHTML + '\r\n';
    }
  }

  return (
    <div className={s.wrapper}>
            <textarea className={s.textarea} onKeyDown={onKeyDown} placeholder='input text post'
                      onChange={(e) => props.updatePostText(e.target.value)}
                      value={props.newPostText}/>
      <button className={s.button} disabled={!props.newPostText} onClick={props.addPost}>
        <FontAwesomeIcon icon={faShare}/>
      </button>
    </div>
  );
}

export default AddNewPost;
