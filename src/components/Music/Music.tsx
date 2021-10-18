import s from './Music.module.css'
import { ReactComponent as YandexIcon } from './../../static/yandexLogoIcon.svg';

const Music = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        Listen to music on yandex music
        <a href='https://music.yandex.by/home' target='_blank'><YandexIcon className={s.yandexIcon}/></a>
      </div>
    </div>
  )
}

export default Music