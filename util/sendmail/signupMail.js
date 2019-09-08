const transporter = require('./mailTranspoter');

module.exports = async function({ to, link, name }) {
  const info = await transporter.sendMail({
    from: `${process.env.SITE_NAME} <${process.env.SITE_EMAIL}>`,
    to,
    subject: 'Active You Account',
    text: `
    Hi ${name}
    To Active Your Account <a href="${link}"> Click Here </a>`,
    html: `
        Hi ${name}
        <br/>
        <b> To Active Your Account <a href="${link}">Click Here </a></b>
    `
  });
};
