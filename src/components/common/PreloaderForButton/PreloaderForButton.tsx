import React from 'react';
import s from'./PreloaderForButton.module.css'

const PreloaderForButton = () => {
    return (
        <div className={s.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default PreloaderForButton;