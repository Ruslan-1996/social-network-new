import s from '../../Profile/Posts/Post/Post.module.css';
import React from 'react';

const SendMessageTime = (props:any) => {
  const {day, years, month, hour, minute} = props.dataTime

  const months= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const currentTime = new Date()

  return (
    <div className={s.date}>
      {(day === currentTime.getDate() && month === currentTime.getMonth() &&
        years === currentTime.getFullYear() && hour === currentTime.getHours() &&
        minute === currentTime.getMinutes())
        ? <>posted just now</> :
        (day === currentTime.getDate() && month === currentTime.getMonth() &&
          years === currentTime.getFullYear() && (hour === currentTime.getHours()
            || hour === currentTime.getHours() - 1))
          ?
          <>posted {((hour === currentTime.getHours() && currentTime.getMinutes() - minute))
          || ((hour === currentTime.getHours() - 1) && (60 - minute + currentTime.getMinutes()))} minutes
            ago</> :
          (day === currentTime.getDate() && month === currentTime.getMonth() &&
            years === currentTime.getFullYear())
            ? <>
              <span>today in </span>
              <span>{hour < 10 && "0"}{hour}:</span>
              <span>{minute < 10 && "0"}{minute}</span>
            </>
            : <>
              <span>{day} </span>
              <span>{months[month]} </span>
              <span>{years}</span>
            </>}
    </div>
  )
}

export default SendMessageTime