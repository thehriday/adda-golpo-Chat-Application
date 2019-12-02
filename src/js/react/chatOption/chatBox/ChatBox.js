import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import './ChatBox.scss';

import SingleChat from './singleChat/SingleChat';
import CenterElement from '../../components/centerElement/CenterElement';
import Spinner from '../../components/spinner/Spinner';

import {
  updateMessageList,
  scrollUpdateMessageListAsync
} from '../../store/action/chatAction';

import { SCROLL_UPDATE_MESSAGE_LIST } from '../../store/action/actionType';

const socket = io();
let previousScrollHeight = 0;

function ChatBox(props) {
  let ChatBoxRef = null;

  useEffect(() => {
    const peerId = [...props.userId, ...props.targetUserId].sort().join('');

    if (!socket.hasListeners(peerId)) {
      socket.on(peerId, newMessage => {
        props.updateMessageList(newMessage);
      });
    }
  }, [props.targetUserId]);

  useEffect(() => {
    if (props.fetchDataType !== SCROLL_UPDATE_MESSAGE_LIST) {
      ChatBoxRef.scroll(0, ChatBoxRef.scrollHeight);
    } else {
      ChatBoxRef.scroll(0, ChatBoxRef.scrollHeight - previousScrollHeight);
    }
    previousScrollHeight = ChatBoxRef.scrollHeight;
  });

  const scrollHandler = e => {
    const { scrollTop } = e.target;

    if (scrollTop <= 0) {
      const willSendRequest = props.totalMessages !== props.messageList.length;
      // !props.messageListUpdating
      console.log();

      if (willSendRequest) {
        props.scrollUpdateMessageListAsync({
          receiverId: props.targetUserId,
          dataSkipNumber: props.dataSkipNumber
        });
      }
    }
  };

  return (
    <div
      ref={element => (ChatBoxRef = element)}
      className="ChatBox"
      onScroll={e => scrollHandler(e)}
    >
      {props.messageListUpdating ? <Spinner /> : ''}
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

const mapStateToProps = state => {
  return {
    messageListUpdating: state.chatReducer.messageListUpdating,
    dataSkipNumber: state.chatReducer.dataSkipNumber
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMessageList: newMessage => dispatch(updateMessageList(newMessage)),
    scrollUpdateMessageListAsync: newMessage =>
      dispatch(scrollUpdateMessageListAsync(newMessage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
