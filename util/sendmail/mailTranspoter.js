const nodemailer = require('nodemailer');
const nodeMailerSendGridTransport = require('nodemailer-sendgrid-transport');

module.exports = nodemailer.createTransport(
  nodeMailerSendGridTransport({
    auth: {
      api_key: process.env.MAIL_API_KEY
    }
  })
);
