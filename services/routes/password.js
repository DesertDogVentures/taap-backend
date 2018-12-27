var userImpl = require('../modals/UserImpl');
var passwordImpl = require('../modals/PasswordImpl');
var utility = require('../../util/Utility');
var emailService = require('./NodeMailer');
var errMsg = require('../../constant/ErrMsg');
var constant = require('../../constant/Constant');
var logger = require('../../logger/log');

exports.sendOTP = function (req, res, next) {
  var successStatusCode = constant.statusCode.success;
  var errorStatusCode = constant.statusCode.error;
  var params = req.body;
  if (utility.isEmpty(params.mailId))
    return res.send({ statusCode: errorStatusCode, message: errMsg.emailEmpty });

  let userEmailId = params.mailId;
  let paramType = 'email';

  userImpl.checkIfUserUnique(userEmailId, paramType, function (err, data) {
    if (err) {
      var bodyParams = [userEmailId, paramType];
      logger.log('error', err, req.url, bodyParams);
      next(err);
    } else {
      if (data.isUnique) {
        return res.json({ statusCode: errorStatusCode, message: errMsg.emailNotExist });
      }
      else {
        emailService.sendMail(userEmailId, function (err, result) {
          if (err) {
            logger.log('error', err, req.url, '');
            next(err);
          }
          else {
            passwordImpl.saveOTP(userEmailId, result.otp, function (err, result) {
              if (err) {
                logger.log('error', err, req.url, userEmailId);
                next(err);
              }
              else {
                return res.json({ statusCode: successStatusCode, message: constant.notificationMsg.otpSendSuccessfully });
              }
            });
          }
        });
      }
    }
  });

}


exports.varifyOTP = function (req, res, next) {
  var successStatusCode = constant.statusCode.success;
  var errorStatusCode = constant.statusCode.error;
  var params = req.body;
  if (utility.isEmpty(params.mailId))
    return res.send({ statusCode: errorStatusCode, message: errMsg.emailEmpty });
  if (utility.isEmpty(params.otp))
    return res.send({ statusCode: errorStatusCode, message: errMsg.otpEmpty });

  let userEmailId = params.mailId;
  let otp = params.otp;

  passwordImpl.varifyOTP(userEmailId, otp, function (err, result) {
    if (err) {
      logger.log('error', err, req.url, userEmailId);
      next(err);
    }
    else {
      // console.log(result[0][0].time_left);
      return res.json({ statusCode: successStatusCode, message: result });
    }
  });

}

exports.updatePassword = function (req, res, next) {
  var successStatusCode = constant.statusCode.success;
  var errorStatusCode = constant.statusCode.error;
  var params = req.body;
  if (utility.isEmpty(params.mailId))
    return res.send({ statusCode: errorStatusCode, message: errMsg.emailEmpty });
  if (utility.isEmpty(params.otp))
    return res.send({ statusCode: errorStatusCode, message: errMsg.otpEmpty });
    if (utility.isEmpty(params.password))
    return res.send({ statusCode: errorStatusCode, message: errMsg.passwordEmpty });  

  let userEmailId = params.mailId;
  let otp = params.otp;
  let password = params.password;

  passwordImpl.updatePassword(userEmailId, otp, password, function (err, result) {
    if (err) {
      logger.log('error', err, req.url, userEmailId);
      next(err);
    }
    else {
      // console.log(result[0][0].time_left);
      if(result){
        return res.json({ statusCode: successStatusCode, message: constant.notificationMsg.passwordUpdated });
      }else {
        return res.json({ statusCode: successStatusCode, message: errMsg.otpEmpty });
      }
    }
  });

}