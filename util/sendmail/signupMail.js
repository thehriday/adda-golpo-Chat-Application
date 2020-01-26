const transporter = require('./mailTranspoter');
const signupTemplates = require('./email-templates/signupTemplates');

module.exports = async function({ to, link, name }) {
  const info = await transporter.sendMail({
    from: `${process.env.SITE_NAME} <${process.env.SITE_EMAIL}>`,
    to,
    subject: 'Active You Account',
    text: `
    Hi ${name}
    To Active Your Account <a href="${link}"> Click Here </a>`,
    html: signupTemplates({ name, link })
  });
};
