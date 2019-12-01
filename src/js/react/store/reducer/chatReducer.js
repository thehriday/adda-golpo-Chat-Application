import {
  UPDATE_CHAT_REDUCER,
  FETCH_MESSAGES,
  UPDATE_MESSAGE,
  SCROLL_UPDATE_MESSAGE_LIST
} from '../action/actionType';

const initialState = {
  userId: '',
  targetUser: {},
  loading: true,
  messageList: [],
  messageLoading: true,
  totalMessages: 0
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHAT_REDUCER:
      return {
        ...state,
        userId: action.payload.userId,
        targetUser: action.payload.targetUser,
        loading: false,
        messageLoading: true
      };
    case FETCH_MESSAGES:
      return {
        ...state,
        messageList: action.payload.messageList,
        totalMessages: action.payload.totalMessages,
        messageLoading: false
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        messageList: [...state.messageList, action.payload.newMessage]
      };
    case SCROLL_UPDATE_MESSAGE_LIST:
      return {
        ...state,
        messageList: [...action.payload.newMessage, ...state.messageList]
      };
    default:
      return state;
  }
};

export default chatReducer;
