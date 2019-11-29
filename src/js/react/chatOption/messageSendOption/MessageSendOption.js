import React, { Component } from 'react';

import './MessageSendOption.scss';

export default class MessageSendOption extends Component {
  constructor(props) {
    super(props);
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
      console.log(this.state.message);
      console.log(this.props);

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
