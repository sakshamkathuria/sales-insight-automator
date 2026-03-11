const nodemailer = require("nodemailer");

async function sendEmail(to, summary) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Sales Insight Summary",
    text: summary
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;