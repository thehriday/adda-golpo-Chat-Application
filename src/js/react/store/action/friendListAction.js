import axios from 'axios';

import cookieParser from '../../../util/cookieParser';
import { UPDATE_FRIEND_LIST_REDUCER, SELECT_SINGLE_FRIEND } from './actionType';

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

export const selectFriend = targetUserId => {
  return dispatch => {
    dispatch({
      type: SELECT_SINGLE_FRIEND,
      payload: { targetUserId }
    });
  };
};
