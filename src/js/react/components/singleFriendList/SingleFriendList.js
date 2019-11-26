import React, { Component } from 'react';

import './SingleFriendList.scss';

export default class SingleFriendList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="singleFriendList" onClick={() => alert('HII')}>
          <img src={this.props.user.photoLink} alt={this.props.user.name} />
          <div className="info">
            <h5>{this.props.user.name}</h5>
            <h6>{this.props.user.email}</h6>
          </div>
        </div>
        <hr style={{ margin: 0 }} />
      </React.Fragment>
    );
  }
}
