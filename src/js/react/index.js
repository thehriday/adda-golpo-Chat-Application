import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import FriendList from './listOption/friendList/FriendList';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <FriendList />
  </Provider>,
  document.querySelector('.authHomePage .friendList-content')
);
