import axios from 'axios';

import cookieParser from '../../../util/cookieParser';
import {
  UPDATE_CHAT_REDUCER,
  FETCH_MESSAGES,
  UPDATE_MESSAGE,
  SCROLL_UPDATE_MESSAGE_LIST,
  SCROLL_HIT_TOP
} from '../action/actionType';

const chatAction = ({ userId, targetUser }) => {
  return {
    type: UPDATE_CHAT_REDUCER,
    payload: {
      userId,
      targetUser
    }
  };
};

const fetchMessages = ({ data, totalMessages }) => {
  return {
    type: FETCH_MESSAGES,
    payload: {
      messageList: data,
      totalMessages
    }
  };
};

export const chatActionAsync = data => {
  return dispatch => {
    dispatch(chatAction(data));
    axios
      .post(
        '/api/get-messages',
        {
          receiverId: data.targetUser._id
        },
        {
          headers: { authorization: 'Bearer ' + cookieParser().token }
        }
      )
      .then(response => {
        dispatch(fetchMessages(response.data));
      })
      .catch(err => console.log(err));
  };
};

export const updateMessageList = newMessage => {
  return {
    type: UPDATE_MESSAGE,
    payload: {
      newMessage
    }
  };
};
const scrollUpdateMessageList = newMessage => {
  return {
    type: SCROLL_UPDATE_MESSAGE_LIST,
    payload: {
      newMessage
    }
  };
};

const scrollHitTop = () => {
  return {
    type: SCROLL_HIT_TOP
  };
};

export const scrollUpdateMessageListAsync = ({
  receiverId,
  dataSkipNumber
}) => {
  return dispatch => {
    dispatch(scrollHitTop());
    axios
      .post(
        '/api/get-messages',
        {
          receiverId,
          dataSkipNumber
        },
        {
          headers: { authorization: 'Bearer ' + cookieParser().token }
        }
      )
      .then(response => {
        dispatch(scrollUpdateMessageList(response.data.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
