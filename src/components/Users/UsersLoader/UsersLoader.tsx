import React from 'react';
import s from './UsersLoader.module.css'

type PropsType = {
}

const UsersLoader: React.FC<PropsType> = ({children}) => {

  const arrayPages = []

  for (let i = 0; i < 5; i++) {
    arrayPages.push(i)
  }

  return (
    <div>
      {arrayPages.map((n, i) => (
        <div className={s.wrapper} key={i}>
          <div className={s.leftSection}>
            <div className={s.photoBlock}></div>
            <button className={s.button}>
            </button>

          </div>
          <div className={s.rightSection}>
            <div>
              <div className={s.name}></div>
              <div className={s.status}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


export default UsersLoader
