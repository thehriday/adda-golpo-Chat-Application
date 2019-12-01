import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import './ChatBox.scss';

import SingleChat from './singleChat/SingleChat';
import CenterElement from '../../components/centerElement/CenterElement';
import cookieParser from '../../../util/cookieParser';

import {
  updateMessageList,
  scrollUpdateMessageList
} from '../../store/action/chatAction';

function ChatBox(props) {
  let ChatBoxRef = null;
  let sendRequest = true;
  let [dataSkipNumber, setDataSkipNumber] = useState(20);

  console.log(dataSkipNumber);

  useEffect(() => {
    const peerId = [...props.userId, ...props.targetUserId].sort().join('');
    const socket = io();
    socket.on(peerId, newMessage => {
      props.updateMessageList(newMessage);
    });
  }, [props.targetUserId]);

  useEffect(() => {
    ChatBoxRef.scroll(0, ChatBoxRef.scrollHeight);
  });

  const scrollHandler = e => {
    const { scrollTop } = e.target;

    if (scrollTop <= 0) {
      if (sendRequest) {
        // send request
        axios
          .post(
            '/api/get-messages',
            {
              receiverId: props.targetUserId,
              dataSkipNumber
            },
            {
              headers: { authorization: 'Bearer ' + cookieParser().token }
            }
          )
          .then(response => {
            sendRequest = true;
            setDataSkipNumber(dataSkipNumber + 10);
            props.scrollUpdateMessageList(response.data.data);
            console.log(response.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
      sendRequest = false;
    }
  };

  return (
    <div
      ref={element => (ChatBoxRef = element)}
      className="ChatBox"
      onScroll={e => scrollHandler(e)}
    >
      <h1>Loading</h1>
      {props.messageLoading ? (
        <CenterElement>
          <h1>Loading...</h1>
        </CenterElement>
      ) : props.messageList.length === 0 ? (
        <CenterElement>
          <i
            style={{ fontSize: 80 }}
            class="fa fa-frown-o"
            aria-hidden="true"
          ></i>
          <h4>No message found</h4>
        </CenterElement>
      ) : (
        props.messageList.map(singleMessage => (
          <SingleChat userId={props.userId} singleMessage={singleMessage} />
        ))
      )}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    updateMessageList: newMessage => dispatch(updateMessageList(newMessage)),
    scrollUpdateMessageList: newMessage =>
      dispatch(scrollUpdateMessageList(newMessage))
  };
};

export default connect(null, mapDispatchToProps)(ChatBox);
