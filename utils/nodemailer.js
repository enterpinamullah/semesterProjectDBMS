const nodemailer = require('nodemailer');

module.exports = {
  mailService: ({ to, subject, body }) => {
    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'inamullahswatian@gmail.com',
        pass: 'vfnmtdnnhcpradaj',
      },
    });
    const mailDetails = {
      from: 'inamullahswatian@gmail.com',
      to,
      subject,
      text: body,
    };

    mailTransporter.sendMail(mailDetails, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Email sent successfully');
      }
    });
  },
};
