import React from 'react';

import ChatNavBar from './chatNavBar/ChatNavBar';
import ChatBox from './chatBox/ChatBox';
import MessageSendOption from './messageSendOption/MessageSendOption';

export default function ChatOption() {
  return (
    <React.Fragment>
      <ChatNavBar />
      <ChatBox />
      <MessageSendOption />
    </React.Fragment>
  );
}
