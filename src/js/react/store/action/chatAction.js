import { UPDATE_CHAT_REDUCER } from '../action/actionType';

const chatAction = ({ userId, targetUser }) => {
  return {
    type: UPDATE_CHAT_REDUCER,
    payload: {
      userId,
      targetUser
    }
  };
};

export const chatActionAsync = data => {
  return dispatch => {
    dispatch(chatAction(data));
  };
};
