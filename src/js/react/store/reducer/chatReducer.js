import { UPDATE_CHAT_REDUCER } from '../action/actionType';

const initialState = {
  userId: '',
  targetUser: {},
  loading: true
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHAT_REDUCER:
      return {
        ...state,
        userId: action.payload.userId,
        targetUser: action.payload.targetUser,
        loading: false
      };
    default:
      return state;
  }
};

export default chatReducer;
