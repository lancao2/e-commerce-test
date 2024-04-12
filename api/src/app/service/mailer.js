const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
require('dotenv').config()

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PW
    }
  });

// transport.use('compile', hbs({
//     viewEngine: 'handlebars',
//     viewPath: '../templates/mails',
//     extName: '.html'
// }));

module.exports = transport;