import axios from 'axios';

import cookieParser from '../../../util/cookieParser';
import {
  UPDATE_FRIEND_LIST_REDUCER,
  SELECT_SINGLE_FRIEND,
  RESET_DATA_SKIP_NUMBER,
  UPDATE_ACTIVE_FRIEND_LIST
} from './actionType';

const friendListAction = ({ friendList, userId }) => {
  return {
    type: UPDATE_FRIEND_LIST_REDUCER,
    payload: {
      userId,
      friendList
    }
  };
};

export const friendListActionAsync = () => {
  return dispatch => {
    axios
      .get('/api/friend-list', {
        headers: { authorization: 'Bearer ' + cookieParser().token }
      })
      .then(response => {
        dispatch(friendListAction(response.data));
      })
      .catch(err => console.log(err));
  };
};

const restDataSkipNumber = () => {
  return {
    type: RESET_DATA_SKIP_NUMBER
  };
};

export const selectFriend = targetUserId => {
  return dispatch => {
    dispatch(restDataSkipNumber());
    dispatch({
      type: SELECT_SINGLE_FRIEND,
      payload: { targetUserId }
    });
  };
};

export const activeStatusAction = data => {
  return {
    type: UPDATE_ACTIVE_FRIEND_LIST,
    payload: data
  };
};
