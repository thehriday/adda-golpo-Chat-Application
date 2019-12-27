import {
  UPDATE_FRIEND_LIST_REDUCER,
  SELECT_SINGLE_FRIEND,
  UPDATE_ACTIVE_FRIEND_LIST
} from '../action/actionType';

const initialState = {
  userId: '',
  friendList: [],
  loading: true
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FRIEND_LIST_REDUCER:
      return {
        loading: false,
        friendList: action.payload.friendList,
        userId: action.payload.userId
      };
    case SELECT_SINGLE_FRIEND:
      return {
        ...state,
        friendList: state.friendList.map(singleFriend => {
          if (singleFriend._id === action.payload.targetUserId) {
            return {
              ...singleFriend,
              isSelected: true
            };
          }
          return {
            ...singleFriend,
            isSelected: false
          };
        })
      };
    case UPDATE_ACTIVE_FRIEND_LIST:
      return {
        ...state,
        friendList: state.friendList.map(singleFriend => {
          if (singleFriend._id === action.payload._id) {
            return { ...singleFriend, isActive: action.payload.isActive };
          }
          return singleFriend;
        })
      };
    default:
      return state;
  }
};

export default userReducer;
