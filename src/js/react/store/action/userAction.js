import axios from 'axios';

import cookieParser from '../../../util/cookieParser';
import { UPDATE_STORE } from './actionType';

const userAction = ({ friendList, userId }) => {
  return {
    type: UPDATE_STORE,
    payload: {
      userId,
      friendList
    }
  };
};

export const userActionAsync = () => {
  return dispatch => {
    axios
      .get('/api/friend-list', {
        headers: { authorization: 'Bearer ' + cookieParser().token }
      })
      .then(response => {
        dispatch(userAction(response.data));
      })
      .catch(err => console.log(err));
  };
};
