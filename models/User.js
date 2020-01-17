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
    isActive: {
      type: Boolean,
      default: true
    },
    friendList: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequest: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sendRequest: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    userInfo: {
      mobile: {
        type: String,
        default: 'Not Set Yet'
      },
      work: {
        type: String,
        default: 'Not Set Yet'
      },
      city: {
        type: String,
        default: 'Not Set Yet'
      },
      about: {
        type: String,
        default: 'Not Set Yet'
      }
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', function(next) {
  this.friendList = [...new Set(this.friendList)];
  this.friendRequest = [...new Set(this.friendRequest)];
  this.sendRequest = [...new Set(this.sendRequest)];
  next();
});

module.exports = mongoose.model('User', userSchema);
