import React, { Component } from 'react';
import io from 'socket.io-client';

import './MessageSendOption.scss';
import cookieParser from '../../../util/cookieParser';

import { SEND_MESSAGE } from '../../../../../socket.io/emitType';

export default class MessageSendOption extends Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      message: ''
    };
  }
  changeHandler(e) {
    this.setState({
      message: e.target.value
    });
  }
  submitHandler(key) {
    if (key === 'Enter' && this.state.message) {
      const message = {
        senderToken: cookieParser().token,
        receiver: this.props.targetUserId,
        messageBody: this.state.message
      };

      this.socket.emit(SEND_MESSAGE, message);

      this.setState({
        message: ''
      });
    }
  }
  render() {
    return (
      <div className="MessageSendOption">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={this.state.message}
            onChange={e => this.changeHandler(e)}
            onKeyDown={e => this.submitHandler(e.key)}
          />
          <div className="input-group-append">
            <button
              onClick={() => this.submitHandler('Enter')}
              className="btn btn-primary"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}
