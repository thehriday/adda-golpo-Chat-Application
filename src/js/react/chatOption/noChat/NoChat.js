import React from 'react';

import './NoChat.scss';

export default function NoChat() {
  return (
    <div className="NoChat">
      <i class="fa fa-comments-o" aria-hidden="true"></i>
      <h1>Select a Conversation</h1>
      <p>
        Try selecting a conversation or searching <br /> for someone specific.
      </p>
    </div>
  );
}
