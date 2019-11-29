const jwt = require('jsonwebtoken');
const Message = require('../models/Message');

const { SEND_MESSAGE } = require('./emitType');

module.exports = io => {
  io.on('connection', socket => {
    socket.on(SEND_MESSAGE, message => {
      try {
        const { senderToken, receiver, messageBody } = message;
        const sender = jwt.decode(senderToken, process.env.SECRET_CODE)._id;
        const peerId = [...sender, ...receiver].sort().join('');
        const newMessage = new Message({
          peerId,
          sender,
          receiver,
          messageBody
        });

        newMessage
          .save()
          .then(result => console.log(result))
          .catch(err => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    });
  });
};
