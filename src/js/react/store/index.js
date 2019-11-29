import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import friendListReducer from './reducer/friendListReducer';
import chatReducer from './reducer/chatReducer';

const rootReducer = combineReducers({
  friendListReducer,
  chatReducer
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
