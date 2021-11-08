import cn from 'classnames';
import React, { useMemo, useState } from 'react';
import s from './Paginator.module.css'

type PropsType = {
  totalCount: number
  pageSize: number
  currentPage: number
  sizePaginator: number
  getPageNumber: (currentPage: number) => void
  hidePaginator: boolean
}

const Paginator: React.FC<PropsType> = React.memo((props) => {
  const {totalCount, pageSize, currentPage, getPageNumber, sizePaginator, children, hidePaginator} = props

  let [count, setCount] = useState<number>(() => (Math.floor(currentPage / sizePaginator)))

  let pagesNumber = Math.ceil(totalCount / pageSize)

  const arrayPages = useMemo(() => {
    const arrayPages = []

    for (let i = 1; i <= pagesNumber; i = i + sizePaginator) {
      let array = []

      for (let j = 0; j < sizePaginator; j++) {
        i + j <= pagesNumber && array.push(i + j)
      }
      arrayPages.push(array)
      array = []
    }

    return arrayPages
  }, [sizePaginator, pagesNumber])


  const onNext = () => {
    setCount(prevState => prevState + 1)
  }

  const onLast = () => {
    setCount(prevState => prevState - 1)
  }

  return (
    <div>
      <div className={cn({[s.disabledWrapper]: !hidePaginator}, s.paginatorWrapper)}>
        <button className={cn({[s.disabled]: !hidePaginator}, s.lastButton)} disabled={!count}
                onClick={onLast}>{hidePaginator && 'last'}
        </button>
        <div className={s.pages}>
          {arrayPages[count].map(n => <button key={n} className={cn({[s.active]: currentPage === n}, s.button)}
                                              onClick={() => getPageNumber(n)}
                                              disabled={!hidePaginator}>{hidePaginator && n}</button>)}
        </div>
        <button className={cn({[s.disabled]: !hidePaginator}, s.nextButton)} disabled={count === arrayPages.length - 1}
                onClick={onNext}>{hidePaginator && 'next'}
        </button>
      </div>
      {children}
      <div className={cn({[s.disabledWrapper]: !hidePaginator}, s.paginatorWrapper)}>
        <button className={cn({[s.disabled]: !hidePaginator}, s.lastButton)} disabled={!count}
                onClick={onLast}>{hidePaginator && 'last'}
        </button>

        <div className={s.pages}>
        {arrayPages[count].map(n => <button key={n} className={cn({[s.active]: currentPage === n}, s.button)}
                                            onClick={() => getPageNumber(n)}
                                            disabled={!hidePaginator}>{hidePaginator && n}</button>)}
        </div>
        <button className={cn({[s.disabled]: !hidePaginator}, s.nextButton)} disabled={count === arrayPages.length - 1}
                onClick={onNext}>{hidePaginator && 'next'}
        </button>
      </div>
    </div>
  )
})

export default Paginator
