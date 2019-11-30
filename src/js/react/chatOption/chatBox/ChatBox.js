import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { animateScroll } from 'react-scroll';

import './ChatBox.scss';

import SingleChat from './singleChat/SingleChat';
import CenterElement from '../../components/centerElement/CenterElement';

import { updateMessageList } from '../../store/action/chatAction';

function ChatBox(props) {
  let ChatBoxRef = null;

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

  return (
    <div ref={element => (ChatBoxRef = element)} className="ChatBox">
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
    updateMessageList: newMessage => dispatch(updateMessageList(newMessage))
  };
};

export default connect(null, mapDispatchToProps)(ChatBox);
