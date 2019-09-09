const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
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
  }
});

module.exports = mongoose.model('User', userSchema);
