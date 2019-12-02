import {
  UPDATE_CHAT_REDUCER,
  FETCH_MESSAGES,
  UPDATE_MESSAGE,
  SCROLL_UPDATE_MESSAGE_LIST,
  SCROLL_HIT_TOP,
  SET_DATA_SKIP_NUMBER,
  RESET_DATA_SKIP_NUMBER
} from '../action/actionType';

const initialState = {
  userId: '',
  targetUser: {},
  loading: true,
  messageList: [],
  messageLoading: true,
  messageListUpdating: false,
  totalMessages: 0,
  fetchDataType: '',
  dataSkipNumber: 20
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHAT_REDUCER:
      return {
        ...state,
        userId: action.payload.userId,
        messageListUpdating: false,
        targetUser: action.payload.targetUser,
        loading: false,
        messageLoading: true
      };
    case FETCH_MESSAGES:
      return {
        ...state,
        fetchDataType: FETCH_MESSAGES,
        messageListUpdating: false,
        messageList: action.payload.messageList,
        totalMessages: action.payload.totalMessages,
        messageLoading: false
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        fetchDataType: UPDATE_MESSAGE,
        messageListUpdating: false,
        messageList: [...state.messageList, action.payload.newMessage]
      };
    case SCROLL_UPDATE_MESSAGE_LIST:
      return {
        ...state,
        messageListUpdating: false,
        dataSkipNumber: state.dataSkipNumber + 10,
        fetchDataType: SCROLL_UPDATE_MESSAGE_LIST,
        messageList: [...action.payload.newMessage, ...state.messageList]
      };
    case SCROLL_HIT_TOP:
      return {
        ...state,
        messageListUpdating: true
      };
    case RESET_DATA_SKIP_NUMBER:
      return {
        ...state,
        dataSkipNumber: 20
      };
    default:
      return state;
  }
};

export default chatReducer;
