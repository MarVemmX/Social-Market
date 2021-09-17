import nodemailer from 'nodemailer';

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        // service: process.env.EMAIL_SERVICE,
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'nguyendandinh472000@gmail.com', // process.env.EMAIL_USERNAME
            pass: 'Aq1sw2de3', // process.env.EMAIL_PASSWORD
        },
    });

    const mailOptions = {
        from: 'nguyendandinh472000@gmail.com', // process.env.EMAIL_FROM
        to: options.to, // options.to: địa chỉ gởi đến
        subject: 'abcTest', // options.subject: tiêu đề của mail
        html: 'đây là nội dung test', // options.text: nội dung gửi
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

module.exports = sendEmail;
