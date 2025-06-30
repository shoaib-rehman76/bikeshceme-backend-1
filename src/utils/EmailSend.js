const nodemailer = require("nodemailer");

async function sendEmail(options) {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: "baiksceem@gmail.com",
      pass: "sniaqhssuojzcuoz",
      // pass:'zgqpyogixiblcvvu',
    },
  });

  // Define the email options
  const mailOptions = {
    from: options.from,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // Actually send the email
  await transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
