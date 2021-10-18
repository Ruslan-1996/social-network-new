const SEND_MESSAGE = 'SEND_MESSAGE'
const FLUX_TEXT_MESSAGE = 'FLUX_TEXT_MESSAGE'

export type usersInMessageType = {
  name: string,
  avatar: string | null,
  id: number
}

export type messagesType = {
  message: string,
  id: number
}

type initialStateType = {
  usersInMessage: Array<usersInMessageType>,
  messages: Array<messagesType>,
  newMessageText: string
}
let initialState: initialStateType = {
  usersInMessage: [{name: 'Ruslanchik', avatar: null, id: 1},
    {name: 'Sun', avatar: null, id: 2},
    {name: 'Teacher', avatar: null, id: 3},
    {name: 'Nikitka', avatar: 'https://www.meme-arsenal.com/memes/25f4f0f438d677897ef44be3d86b780d.jpg', id: 4}],
  messages: [
    {message: 'Hi', id: 1},
    {message: 'What is it?', id: 2},
    {message: 'It\'s a new socaial newtork!', id: 3},],
  newMessageText: '',
}

const messageReducer = (state = initialState, action: actionType): initialStateType => {
  switch (action.type) {
    case FLUX_TEXT_MESSAGE:
      return {...state, newMessageText: action.text};
    case SEND_MESSAGE:
      let message = {message: state.newMessageText, id: state.messages[state.messages.length - 1].id + 1}
      state.newMessageText = ''
      return {...state, messages: [...state.messages, message]};
    default:
      return state;
  }
}

type actionType = sendMessageACType | fluxTextMessageFluxType

export type fluxTextMessageFluxType = {
  type: typeof FLUX_TEXT_MESSAGE,
  text: string
}

export const fluxTextMessage = (text: string) => {
  return {
    type: FLUX_TEXT_MESSAGE,
    text
  }
}

export type sendMessageACType = {
  type: typeof SEND_MESSAGE,
}

export const sendMessageAC = (): sendMessageACType => {
  return {
    type: SEND_MESSAGE,
  }
}

export default messageReducer