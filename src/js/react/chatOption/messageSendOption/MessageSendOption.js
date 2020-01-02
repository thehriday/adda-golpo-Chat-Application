import React, { Component, useEffect } from 'react';
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
    this.senderReceiver = {
      senderToken: cookieParser().token,
      receiver: this.props.targetUserId
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
        messageBody: this.state.message
      };

      this.socket.emit(SEND_MESSAGE, {
        senderReceiver: this.senderReceiver,
        message
      });

      this.setState({
        message: ''
      });
    }
  }
  componentDidUpdate() {
    if (this.state.message.length === 0) {
      this.socket.emit(SEND_MESSAGE, {
        senderReceiver: this.senderReceiver,
        typingState: { isTyping: false, userId: this.props.userId }
      });
    } else {
      this.socket.emit(SEND_MESSAGE, {
        senderReceiver: this.senderReceiver,
        typingState: { isTyping: true, userId: this.props.userId }
      });
      clearTimeout(this.typingFinished);
      this.typingFinished = setTimeout(() => {
        this.socket.emit(SEND_MESSAGE, {
          senderReceiver: this.senderReceiver,
          typingState: { isTyping: false, userId: this.props.userId }
        });
      }, 1000 * 10);
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
