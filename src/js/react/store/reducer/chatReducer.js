import {
  UPDATE_CHAT_REDUCER,
  FETCH_MESSAGES,
  UPDATE_MESSAGE
} from '../action/actionType';

const initialState = {
  userId: '',
  targetUser: {},
  loading: true,
  messageList: [],
  messageLoading: true
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
        messageLoading: false
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        messageList: [...state.messageList, action.payload.newMessage]
      };
    default:
      return state;
  }
};

export default chatReducer;
