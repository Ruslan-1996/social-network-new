import {connect} from "react-redux";
import {AppStateType} from "../../store/store";
import {
    fluxTextMessage,
    messagesType,
    sendMessageAC,
    usersInMessageType
} from "../../store/messageReducer";
import Messages from "./Messages";
import {messages, newMessageText, usersInMessage} from "../../store/messageSelector";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect/withAuthRedirect";

type mapStateToPropsType = {
    messages: Array<messagesType>,
    usersInMessage: Array<usersInMessageType>
    textOfNewMessage: string,
}

type MapDispatchToPropsType = {
    sendMessageAC: () => void
    fluxTextMessage: (text: string) => void
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        messages: messages(state),
        usersInMessage: usersInMessage(state),
        textOfNewMessage: newMessageText(state)
    }
}

const MessagesContainer = compose(
    withAuthRedirect,
    connect<mapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
        sendMessageAC,
        fluxTextMessage
    }))
(Messages)

export default MessagesContainer;
