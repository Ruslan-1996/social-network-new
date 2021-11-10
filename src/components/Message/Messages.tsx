import React, { useState } from 'react';
import s from './Messages.module.css';
import UserInMessage from "./UserInMessage/UserInMessage";
import Message from "./UserInMessage/Message/Message";
import SendMessage from "./SendMessage/SendMessage";
import {messagesType, usersInMessageType} from "../../store/messageReducer";
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

type propsType = {
    messages: Array<messagesType>,
    usersInMessage: Array<usersInMessageType>
    textOfNewMessage: string,
    sendMessageAC: () => void,
    fluxTextMessage: (text: string) => void
}

const Messages: React.FC<propsType> = (props) => {
    const [editModeMessage, setEditModeMessage] = useState(false)

    const users = props.usersInMessage.map((user: usersInMessageType) => <UserInMessage user={user.name}
                                                                                        avatar={user.avatar}
                                                                                        key={user.id} id={user.id}/>)

    const message = props.messages.map((message: messagesType) => <Message message={message.message} key={message.id}
                                                                           id={message.id}/>)

    return (
        <div className={s.wrapper}>
            <div className={cn({[s.showUsers]: !editModeMessage},s.users)} onClick={() => setEditModeMessage(prevState => !prevState)}>
                {users}
            </div>
            <div className={s.messages}>
                <button className={s.buttonReturn} onClick={() => setEditModeMessage(prevState => !prevState)}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                <div className={s.messageText}>
                    <div>
                        {message}
                    </div>
                </div>
                <div className={s.inputMessage}>
                    <SendMessage sendMessageAC={props.sendMessageAC} fluxTextMessage={props.fluxTextMessage}
                                 textOfNewMessage={props.textOfNewMessage}/>
                </div>
            </div>
        </div>
    );
}

export default Messages;
