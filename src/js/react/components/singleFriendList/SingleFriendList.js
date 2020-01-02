import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import './SingleFriendList.scss';

import { chatActionAsync } from '../../store/action/chatAction';
import {
  selectFriend,
  activeStatusAction
} from '../../store/action/friendListAction';

class SingleFriendList extends Component {
  clickHandler() {
    this.props.updateChatState({
      userId: this.props.userId,
      targetUser: this.props.targetUser
    });

    this.props.selectFriend(this.props.targetUser._id);
  }

  componentDidMount() {
    const socket = io();
    socket.on(`active-status ${this.props.targetUser._id}`, isActive => {
      this.props.updateActiveFriendList({
        _id: this.props.targetUser._id,
        isActive
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div
          className={`singleFriendList ${
            this.props.isSelected ? 'active' : ''
          }`}
          onClick={() => this.clickHandler()}
        >
          <div className="profile-picture">
            <img
              src={this.props.targetUser.photoLink}
              alt={this.props.targetUser.name}
            />
            <div
              className={`active-status ${
                this.props.targetUser.isActive ? 'active' : 'inactive'
              }`}
            ></div>
          </div>
          <div className="info">
            <h5>{this.props.targetUser.name}</h5>
            <h6>{this.props.targetUser.email}</h6>
          </div>
          <span
            style={{ background: 'red' }}
            className="badge badge-dark ml-auto mr-4"
          >
            9
          </span>
        </div>
        <hr style={{ margin: 0 }} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateChatState: data => dispatch(chatActionAsync(data)),
    updateActiveFriendList: data => dispatch(activeStatusAction(data)),
    selectFriend: targetUserId => dispatch(selectFriend(targetUserId))
  };
};

export default connect(null, mapDispatchToProps)(SingleFriendList);
