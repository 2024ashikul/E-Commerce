

const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    service :' gmail',
    auth: {
                user: '2024ashikul@gmail.com',
                pass: 'lkmp dfgm vwsd bgck',
    }
});

async function sendMail({to, subject ,body}){
    const info = await transporter.sendMail({
    from: '"Tech Bangladesh" <2024ashikul@gmail.com>',
    to,
    subject,
    text: body,
  });
  return info;
}


module.exports = sendMail;