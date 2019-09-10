const transporter = require('./mailTranspoter');

module.exports = async function({ to, link, name }) {
  const info = await transporter.sendMail({
    from: `${process.env.SITE_NAME} <${process.env.SITE_EMAIL}>`,
    to,
    subject: 'Reset Your Password',
    text: `
    Hi ${name}
    To Rest Your Password <a href="${link}"> Click Here </a>`,
    html: `
        Hi ${name}
        <br/>
        <b> To Rest Your Password <a href="${link}">Click Here </a></b>
    `
  });
};
