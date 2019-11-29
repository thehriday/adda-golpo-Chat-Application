import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import FriendList from './listOption/friendList/FriendList';
import ChatOption from './chatOption/ChatOption';

import store from './store/index';

function App(props) {
  return <Provider store={store}>{props.children}</Provider>;
}

ReactDOM.render(
  <App>
    <FriendList />
  </App>,
  document.querySelector('.authHomePage .friendList-content')
);

ReactDOM.render(
  <App>
    <ChatOption />
  </App>,
  document.querySelector('.authHomePage .chatOption-container')
);
