import React from 'react';
import s from './PreloaderLogo.module.css'

const PreloaderLogo = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.logo}>
                VR
            </div>
        </div>
    )
}

export default PreloaderLogo;