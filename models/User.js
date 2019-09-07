const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  photoLink: {
    type: String,
    default: '/photos/avatar.png'
  }
});

// hash password before save
const hashPassword = function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
};

userSchema.pre('save', hashPassword);

// find email
userSchema.statics.findEmail = async function(email) {
  const user = await this.findOne({ email });
  return user;
};

// find username
userSchema.statics.findUsername = async function(username) {
  const user = await this.findOne({ username });
  return user;
};

module.exports = mongoose.model('User', userSchema);
