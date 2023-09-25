const sgMail = require('@sendgrid/mail');

const sendMailWithSendgrid = (data) => {
  const apiKey = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(apiKey);

  return sgMail.send(data);
}

module.exports = {
  sendMailWithSendgrid,
}