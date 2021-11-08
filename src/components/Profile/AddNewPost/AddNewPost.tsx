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
  const {updatePostText, addPost, newPostText} = props

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.currentTarget.innerHTML = e.currentTarget.innerHTML + '\r\n';
    }
  }

  return (
    <div className={s.wrapper}>
            <textarea className={s.textarea} onKeyDown={onKeyDown} placeholder='input text post'
                      onChange={(e) => updatePostText(e.target.value)}
                      value={newPostText}/>
      <button className={s.button} disabled={!newPostText} onClick={addPost}>
        <FontAwesomeIcon icon={faShare}/>
      </button>
    </div>
  );
}

export default AddNewPost;
