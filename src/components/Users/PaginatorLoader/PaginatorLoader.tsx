import React from 'react';
import s from './PaginatorLoader.module.css'

type PropsType = {
  sizePaginator: number
}

const PaginatorLoader: React.FC<PropsType> = ({sizePaginator, children}) => {

  const arrayPages = []

  for (let i = 0; i < sizePaginator; i++) {
    arrayPages.push(i)
  }

  return (
    <div>
      <div className={s.paginatorWrapper}>
        <div className={s.lastButton}></div>
        {arrayPages.map(n => <div className={s.button}></div>)}
        <div className={s.nextButton}></div>
      </div>
      {children}
      <div className={s.paginatorWrapper}>
        <div className={s.lastButton}></div>
        {arrayPages.map(n => <div className={s.button}></div>)}
        <div className={s.nextButton}></div>
      </div>
    </div>
  )
}


export default PaginatorLoader
