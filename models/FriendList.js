const mongoose = require('mongoose');

const { Schema } = mongoose;

const frindListSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId
  },
  friendList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('FriendList', frindListSchema);
