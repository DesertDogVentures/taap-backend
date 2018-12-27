'use strict';
const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "services.taapapp@gmail.com",
        pass: "Taapapp_01"
    }
});

exports.sendMail = function (data_args, callback) {
    let otp = Math.floor(100000 + Math.random() * 900000);
    var mailOptions = {
        to: data_args,
        subject: "One Time Password",
        text: "Your OTP is "+ otp.toString() +", it's valid for only 30 mins. Please do not share with any one."
    }
    transport.sendMail(mailOptions, function (error, response) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, { 'otp': otp });
        }
    });
};
