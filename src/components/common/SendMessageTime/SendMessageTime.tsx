import s from '../../Profile/Posts/Post/Post.module.css';
import React, { FC } from 'react';

type PropsType = {
  dataTime: number
}

const SendMessageTime: FC<PropsType> = React.memo((props) => {
  const dataTime = new Date(props.dataTime)

  const months= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const currentTime = new Date()

  return (
    <div className={s.date}>
      {(dataTime.getDate() === currentTime.getDate() && dataTime.getMonth() === currentTime.getMonth() &&
        dataTime.getFullYear() === currentTime.getFullYear() && dataTime.getHours() === currentTime.getHours() &&
        dataTime.getMinutes() === currentTime.getMinutes())
        ? <>posted just now</> :
        (dataTime.getDate() === currentTime.getDate() && dataTime.getMonth() === currentTime.getMonth() &&
          dataTime.getFullYear() === currentTime.getFullYear() && (dataTime.getHours() === currentTime.getHours()
            || dataTime.getHours() === currentTime.getHours() - 1))
          ?
          <>posted {((dataTime.getHours() === currentTime.getHours() && currentTime.getMinutes() - dataTime.getMinutes()))
          || ((dataTime.getHours() === currentTime.getHours() - 1) && (60 - dataTime.getMinutes() + currentTime.getMinutes()))} minutes
            ago</> :
          (dataTime.getDate() === currentTime.getDate() && dataTime.getMonth() === currentTime.getMonth() &&
            dataTime.getFullYear() === currentTime.getFullYear())
            ? <>
              <span>today in </span>
              <span>{dataTime.getHours() < 10 && "0"}{dataTime.getHours()}:</span>
              <span>{dataTime.getMinutes() < 10 && "0"}{dataTime.getMinutes()}</span>
            </>
            : <>
              <span>{dataTime.getDate()} </span>
              <span>{months[dataTime.getMonth()]} </span>
              <span>{dataTime.getFullYear()}</span>
            </>}
    </div>
  )
})

export default SendMessageTime