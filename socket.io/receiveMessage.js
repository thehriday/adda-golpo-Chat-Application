const jwt = require('jsonwebtoken');
const Message = require('../models/Message');

const { SEND_MESSAGE } = require('./emitType');

module.exports = io => {
  io.on('connection', socket => {
    socket.on(SEND_MESSAGE, ({ senderReceiver, message, typingState }) => {
      try {
        // extract sender receiver id, and create peer id
        const { senderToken, receiver } = senderReceiver;
        const sender = jwt.decode(senderToken, process.env.SECRET_CODE)._id;
        const peerId = [...sender, ...receiver].sort().join('');

        if (message) {
          const { messageBody } = message;
          const newMessage = new Message({
            peerId,
            sender,
            receiver,
            messageBody
          });

          newMessage
            .save()
            .then(result => {
              io.emit(peerId, { message: result });
            })
            .catch(err => {
              console.log(err);
            });
        }
        if (typingState) {
          io.emit(peerId, { typingState });
        }
      } catch (err) {
        console.log(err);
      }
    });
  });
};
