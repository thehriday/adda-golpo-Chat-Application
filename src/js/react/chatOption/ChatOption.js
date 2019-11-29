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
      <ChatBox />
      <MessageSendOption
        userId={props.userId}
        targetUserId={props.targetUser._id}
      />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.chatReducer.userId,
    targetUser: state.chatReducer.targetUser,
    loading: state.chatReducer.loading
  };
};

export default connect(mapStateToProps)(ChatOption);
