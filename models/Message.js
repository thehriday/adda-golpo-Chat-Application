const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    peerId: {
      type: String,
      required: true
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    messageBody: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

messageSchema.post('save', (result, next) => {
  result
    .populate('sender', ['name', 'username', 'email', 'photoLink'])
    .execPopulate()
    .then(function() {
      next();
    });
});

module.exports = mongoose.model('Message', messageSchema);
