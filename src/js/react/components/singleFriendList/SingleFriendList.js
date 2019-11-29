import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SingleFriendList.scss';

import { chatActionAsync } from '../../store/action/chatAction';
import { selectFriend } from '../../store/action/friendListAction';

class SingleFriendList extends Component {
  clickHandler() {
    this.props.updateChatState({
      userId: this.props.userId,
      targetUser: this.props.targetUser
    });

    this.props.selectFriend(this.props.targetUser._id);
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
            <div className="active-status active"></div>
          </div>
          <div className="info">
            <h5>{this.props.targetUser.name}</h5>
            <h6>{this.props.targetUser.email}</h6>
          </div>
        </div>
        <hr style={{ margin: 0 }} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateChatState: data => dispatch(chatActionAsync(data)),
    selectFriend: targetUserId => dispatch(selectFriend(targetUserId))
  };
};

export default connect(null, mapDispatchToProps)(SingleFriendList);
