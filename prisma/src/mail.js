const nodemailer = require("nodemailer");
var transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = text => `
<div>
<h2>hello there!</h2>
<p>${text}</p>
<p>hello muze</p>
</div>
`;
exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;
