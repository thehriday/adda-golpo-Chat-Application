import React, { Component } from 'react';

import './MessageSendOption.scss';

export default class MessageSendOption extends Component {
  render() {
    return (
      <div className="MessageSendOption">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
          />
          <div className="input-group-append">
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    );
  }
}
