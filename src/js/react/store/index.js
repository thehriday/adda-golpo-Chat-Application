import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducer/userReducer';

const rootReducer = combineReducers({
  user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
