const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String
    },
    photoLink: {
      type: String,
      default: '/photos/avatar.png'
    },
    emailValidationCode: {
      type: String
    },
    passwordResetToken: {
      type: String
    },
    passwordResetTime: {
      type: Date
    },
    friendList: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequest: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sendRequest: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
