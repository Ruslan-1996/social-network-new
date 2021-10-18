import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import s from './PhotoNull.module.css'

type PropsType = {
  size: SizeProp | undefined
  isCirlce?: boolean
}

const PhotoNUll: React.FC<PropsType> = ({size, isCirlce = false}) => {
  return (
    <div className={s.wrapper} style={{borderRadius: `${isCirlce ? '100px' : 0}`}}>
      <FontAwesomeIcon icon={faUser} size={size} color={'white'}/>
    </div>
  )
}

export default PhotoNUll
