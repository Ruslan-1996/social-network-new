import React from 'react';
import s from './SendMessage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

type propsType = {
    sendMessageAC: () => void
    fluxTextMessage: (text:string) => void
    textOfNewMessage: string
}

const SendMessage: React.FC<propsType> = (props) => {
    
    return (
        <div className={s.wrapper}>
            <textarea placeholder='Enter your message' onChange={(e) => props.fluxTextMessage(e.target.value)}
                      value={props.textOfNewMessage} className={s.textArea}/>
            <button className={s.button} disabled={!props.textOfNewMessage} onClick={()=>props.sendMessageAC()}>
                <FontAwesomeIcon icon={faShare}/>
            </button>
        </div>
    );
}

export default SendMessage;
