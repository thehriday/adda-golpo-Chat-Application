const transporter = require('./mailTranspoter');

module.exports = async function({ to, link, name, subject, text, html }) {
  const info = await transporter.sendMail({
    from: `${process.env.SITE_NAME} <${process.env.SITE_EMAIL}>`,
    to,
    subject,
    text,
    html
  });
};
