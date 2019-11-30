import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { animateScroll } from 'react-scroll';

import './ChatBox.scss';

import SingleChat from './singleChat/SingleChat';

import { updateMessageList } from '../../store/action/chatAction';

function ChatBox(props) {
  let ChatBoxRef = null;
  if (props.messageList.length) {
    const socket = io();
    const { peerId } = props.messageList[0];
    socket.on(peerId, newMessage => {
      props.updateMessageList(newMessage);
    });
  }
  useEffect(() => {
    ChatBoxRef.scroll(0, ChatBoxRef.scrollHeight);
  });

  return (
    <div ref={element => (ChatBoxRef = element)} className="ChatBox">
      {props.messageLoading ? (
        <Loading />
      ) : props.messageList.length === 0 ? (
        <h1>No Chat</h1>
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
    updateMessageList: newMessage => dispatch(updateMessageList(newMessage))
  };
};

export default connect(null, mapDispatchToProps)(ChatBox);

function Loading() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1>Loading...</h1>
    </div>
  );
}
