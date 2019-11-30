import React from 'react';
import { connect } from 'react-redux';

import ChatNavBar from './chatNavBar/ChatNavBar';
import ChatBox from './chatBox/ChatBox';
import MessageSendOption from './messageSendOption/MessageSendOption';

import NoChat from './noChat/NoChat';

function ChatOption(props) {
  return props.loading ? (
    <NoChat />
  ) : (
    <React.Fragment>
      <ChatNavBar targetUser={props.targetUser} />
      <ChatBox
        userId={props.userId}
        messageList={props.messageList}
        messageLoading={props.messageLoading}
      />
      <MessageSendOption targetUserId={props.targetUser._id} />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.chatReducer.userId,
    targetUser: state.chatReducer.targetUser,
    loading: state.chatReducer.loading,
    messageLoading: state.chatReducer.messageLoading,
    messageList: state.chatReducer.messageList
  };
};

export default connect(mapStateToProps)(ChatOption);
