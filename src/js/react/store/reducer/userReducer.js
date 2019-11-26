import { UPDATE_STORE } from '../action/actionType';

const initialState = {
  userId: '',
  friendList: [],
  loading: true
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STORE:
      return {
        loading: false,
        friendList: action.payload.friendList
          ? action.payload.friendList
          : state.friendList,
        userId: action.payload.userId ? action.payload.userId : state.userId
      };
    default:
      return state;
  }
};

export default userReducer;
