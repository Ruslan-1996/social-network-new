import React from 'react';
import s from './Message.module.css';

type propsType = {
    message: string,
    id: number
}

const Message: React.FC<propsType> = (props) => {

    return (
        <div className={s.wrapper}>
            <span className={s.message}>
                {props.message}
            </span>
        </div>
    );
}

export default Message;
