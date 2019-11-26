import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleFriendList from '../../components/singleFriendList/SingleFriendList';
import { userActionAsync } from '../../store/action/userAction';

class FriendList extends Component {
  componentDidMount() {
    this.props.updateState();
  }
  render() {
    return (
      <div>
        {this.props.user.loading ? (
          <h3 className="center">Loading...</h3>
        ) : this.props.user.friendList.length === 0 ? (
          <div className="center" style={{ paddingTop: 'calc(30vh - 80px)' }}>
            <span style={{ fontSize: '80px', color: '#c3c3c3' }}>
              <i class="fa fa-users" aria-hidden="true"></i>
            </span>
            <h5>You have added no friend yet.</h5>
            <p>Please add a friend to chat</p>
          </div>
        ) : (
          this.props.user.friendList.map(singleFriend => (
            <SingleFriendList key={singleFriend._id} user={singleFriend} />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateState: () => dispatch(userActionAsync())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
