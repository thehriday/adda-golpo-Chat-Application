const nodemailer = require('nodemailer');
const nodeMailerSendGridTransport = require('nodemailer-sendgrid-transport');

module.exports = nodemailer.createTransport(
  nodeMailerSendGridTransport({
    auth: {
      api_key:
        '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',
      api_user: 'mshidoy'
    }
  })
);
