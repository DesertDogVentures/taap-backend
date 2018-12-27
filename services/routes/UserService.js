var userImpl = require('../modals/UserImpl');
var utility = require('../../util/Utility');
var constant = require('../../constant/Constant');
var errMsg = require('../../constant/ErrMsg');
var jwt = require('jsonwebtoken');
var redisProperties = require('../../config').redis;
var jwtProperties = require('../../config').jwt;
var logger = require('../../logger/log');
var notificationService = require('./NotificationService')

var redis = require("redis").createClient({
  host: redisProperties.host,
  port: redisProperties.port,
  disableTTL: true
});


var generateToken = function (payload, callback) {
  jwt.sign(payload, jwtProperties.secret_key, { 'expiresIn': jwtProperties.exprireTime }, function (err, token) {
    logger.log('error',err,'in genrating token',payload);
    callback(err, token);
  });
}

exports.registerUser = function (req, res, next) {
  var params = req.body;
  var errorStatusCode = constant.statusCode.error;
  var successStatusCode = constant.statusCode.success;
  if (utility.isEmpty(params.mailId)){
    return res.send({ statusCode: errorStatusCode, message: errMsg.emailEmpty });
  }
  // else if (utility.isEmpty(params.contactNumber))
  //   return res.send({ statusCode: errorStatusCode, message: errMsg.contactEmpty });
  else if (utility.isEmpty(params.password)){
    return res.send({ statusCode: errorStatusCode, message: errMsg.passwordEmpty });
  }
  else if (utility.isEmpty(params.firstName)) {
    return res.send({ statusCode: errorStatusCode, message: errMsg.firstNameEmpty });
  } else if (utility.isEmpty(params.username)) {
    return res.send({ statusCode: errorStatusCode, message: errMsg.usernameEmpty });
  } 
  // else if (utility.isEmpty(params.countryCode)) {
  //   return res.send({ statusCode: errorStatusCode, message: errMsg.countryCodeEmpty })
  // }
  else {
    userImpl.registerUser(params, function (err) {
      if (err) {
        var bodyParams = [params.mailId,params.contactNumber,params.password,params.firstName,params.username,params.countryCode,params.lastName,params.birthDate,params.image];
        logger.log('error',err,req.url,bodyParams);
        next(err);
        //res.json({ statusCode: errorStatusCode, message: constant.responseMsg.error });
      } else {
        return res.json({ statusCode: successStatusCode, message: constant.responseMsg.success });
      }
    });
  }
}


exports.editUserInfo = function (req, res, next) {
  var errorStatusCode = constant.statusCode.error;
  var successStatusCode = constant.statusCode.success;
  var params = req.body;
  var firstName = params.firstName.trim();
  var username = req.session.user;
  if (utility.isEmpty(firstName)) {
    return res.send({ statusCode: errorStatusCode, message: errMsg.firstNameEmpty });
  } else if (utility.isEmpty(username)) {
    return res.send({ statusCode: errorStatusCode, message: errMsg.usernameEmpty });
  }
  var mailId = params.email.trim();
  var lastName = params.lastName.trim() || '';
  var birthDate = params.birthDate || '';
  var image = params.image || '';
  var friendsList = params.friendsList || [];
  userImpl.editUserInfo(username, mailId, firstName, lastName, birthDate, image, friendsList, function (err) {
    if (err) {
      var bodyParams = [username, mailId, firstName, lastName, birthDate, image];
      logger.log('error',err,req.url,bodyParams);
      next(err);
    } else {
      return res.json({ statusCode: successStatusCode, message: constant.responseMsg.success });
    }
  });
}

exports.checkIfUserUnique = function (req, res, next) {
  var username = req.query.username;
  var contactNumber = req.query.contactNumber || '';

  var userParam = null;
  var paramType = null;

  if (utility.isNotEmpty(username)) {
    userParam = username;
    paramType = 'username';
  } else if (utility.isNotEmpty(contactNumber)) {
    userParam = contactNumber;
    paramType = 'contactnumber';
  }

  userImpl.checkIfUserUnique(userParam, paramType, function (err, data) {
    if (err) {
      var bodyParams = [userParam, paramType];
      logger.log('error',err,req.url,bodyParams);
      next(err);
      //res.json({ statusCode: constant.statusCode.error, message: constant.responseMsg.error });
    } else {
      return res.json({ statusCode: constant.statusCode.success, data: data });
    }
  });
}

getUserInfo = function (req, res, next) {
  var username = req.session.user;

  if (utility.isEmpty(username)) {
    return res.send({ statusCode: errorStatusCode, message: errMsg.usernameEmpty });
  }
  userImpl.getUserInfo(username.trim(), function (err, data) {
    if (err) {
      var bodyParams = [username];
      logger.log('error',err,req.url,bodyParams);
      next(err);
      //res.json({ statusCode: constant.statusCode.error, message: constant.responseMsg.error });
    } else {
      data[0]['token'] = req.session.token;
      return res.json({ statusCode: constant.statusCode.success, data: data[0] });
    }
  });
}
exports.getUserInfo = getUserInfo;

exports.authenticateUser = function (req, res, next) {
  console.log('hitting auth route');
  var errorStatusCode = constant.statusCode.error;
  var successStatusCode = constant.statusCode.success;
  var params = req.body;
  var username = params.username;
  var password = params.password;
  var deviceToken = params.deviceToken || null;

  if (utility.isEmpty(username)) {
    return res.send({ statusCode: errorStatusCode, message: errMsg.usernameEmpty });
  } else if (utility.isEmpty(password)) {
    return res.send({ statusCode: errorStatusCode, message: errMsg.passwordEmpty });
  }

  userImpl.authenticateUser(username.trim(), password, deviceToken, function (err, data) {
    if (err) {
      var bodyParams = [username,password];
      logger.log('error',err,req.url,bodyParams);
      //next();    // different message at not authorized User
      res.json({ statusCode: errorStatusCode, message: errMsg.usernameAndPasswordNotCorrect });
    } else {
      generateToken({ 'username': username, 'password': password }, function (err, token) {
        if (err) {
          var bodyParams = [username,password];
          logger.log('error',err,req.url,bodyParams);
          next(err);
          //res.json({ statusCode: errorStatusCode, message: constant.responseMsg.error });
        }
        else {
          redis.set(token, username, function (error, result) {
            if (error){
              var bodyParams = [token, username];
              logger.log('error',err,req.url,bodyParams);
              next(err);
              //res.json({ statusCode: errorStatusCode, message: constant.responseMsg.error  })
            }
            else{
              req.session.user = username;
              req.session.token = token; 
              getUserInfo(req,res,next);
              //res.json({ statusCode: successStatusCode, data: { "token": token, "isAuthenticated": true } });
            }
          });

        }
      })

    }
  });
}

exports.destroyToken = function (req, res, next) { 
  var successStatusCode = constant.statusCode.success;
  var token = req.headers.token; 
  var username = req.session.user;
  redis.del(token)
  userImpl.destroyToken(username,function (err) {
    if (err) {  
      next(err);
      //res.json({ statusCode: errorStatusCode, message: constant.responseMsg.error });
    } else {
      return res.json({ statusCode: successStatusCode, message: constant.responseMsg.success });
    }
  }); 
}


exports.changeRequestStatus = function (req, res, next) {
  var errorStatusCode = constant.statusCode.error;
  var successStatusCode = constant.statusCode.success;
  var params = req.body;
  var senderUsername = params.senderUsername;
  var recieverIdentity = params.recieverIdentity;
  var requestStatus = params.requestStatus || 1;
  var requestType = params.requestType || 1;

  if (utility.isEmpty(senderUsername)) {
    return res.send({ statusCode: errorStatusCode, message: errMsg.usernameEmpty });
  } else if (utility.isEmpty(recieverIdentity)) {
    return res.send({ statusCode: errorStatusCode, message: errMsg.usernameEmpty });
  }
  userImpl.changeRequestStatus(senderUsername, recieverIdentity, requestStatus, requestType, function (err) {
    if (err) {
      var bodyParams = [senderUsername, recieverIdentity, requestStatus, requestType];
      logger.log('error',err,req.url,bodyParams);
      next(err);
      //res.json({ statusCode: errorStatusCode, message: constant.responseMsg.error });
    } else {
      return res.json({ statusCode: successStatusCode, message: constant.responseMsg.success });
    }
  });
}

exports.searchUsers = function (req, res, next) {
  var errorStatusCode = constant.statusCode.error;
  var successStatusCode = constant.statusCode.success;
  var queryParam = req.params.query;
  var username = req.session.user;

  if (utility.isEmpty(queryParam)) {
    return res.send({ statusCode: errorStatusCode, message: constant.responseMsg.error });
  }

  userImpl.searchUsers(queryParam, username, function (err, data) {
    if (err) {
      var bodyParams = [queryParam, username];
      logger.log('error',err,req.url,bodyParams);
      next(err); 
      //res.json({ statusCode: errorStatusCode, message: constant.responseMsg.error });
    } else {
      return res.json({ statusCode: successStatusCode, data: { 'userList': data } });
    }
  });
}

exports.getFriendList = function (req, res, next) {
  var errorStatusCode = constant.statusCode.error;
  var successStatusCode = constant.statusCode.success;
  var username = req.session.user;

  if (utility.isEmpty(username)) {
    return res.send({ statusCode: errorStatusCode, message: constant.responseMsg.error });
  }

  userImpl.getFriendList(username, function (err, data) {
    if (err) {
      var bodyParams = [username];
      logger.log('error',err,req.url,bodyParams);
      next(err);
      //res.json({ statusCode: errorStatusCode, message: constant.responseMsg.error });
    } else {
      return res.json({ statusCode: successStatusCode, data: { 'friendList': data } });
    }
  });
}

exports.getContactStatus = function (req, res, next) {
  var errorStatusCode = constant.statusCode.error;
  var successStatusCode = constant.statusCode.success;
  var username = req.session.user;
  var contactList = req.body.contactList;

  if (utility.isEmpty(username)) {
    return res.send({ statusCode: errorStatusCode, message: constant.responseMsg.error });
  } else if (contactList == null || contactList == undefined || contactList.length <= 0) {
    return res.send({ statusCode: errorStatusCode, message: constant.responseMsg.error });
  }
  //var contactList = JSON.parse(contactList).join();

  userImpl.getContactStatus(username, contactList.join(), function (err, data) {
    if (err) {
      var bodyParams = [username, contactList.join()];
      logger.log('error',err,req.url,bodyParams);
      next(err);
      //res.json({ statusCode: errorStatusCode, message: constant.responseMsg.error });
    } else {
      return res.json({ statusCode: successStatusCode, data: data });
    }
  });
}


exports.blockUser = function (req, res, next) {
  var errorStatusCode = constant.statusCode.error;
  var successStatusCode = constant.statusCode.success;
  var user_id = req.body.user_id;
  var friend_id = req.body.friend_id;
  var is_blocked = req.body.is_block;
  // if (utility.isEmpty(id)) {
  //   return res.send({ statusCode: errorStatusCode, message: constant.responseMsg.error });
  // }
  if(is_blocked == true || is_blocked == 1 || is_blocked == '1'){
    is_blocked = true;
  }else{ is_blocked = false; }
  userImpl.blockUser(user_id,friend_id,is_blocked, function (err, data) {
    if (err) {
      var bodyParams = [id,is_blocked];
      logger.log('error',err,req.url,bodyParams);
      next(err);
      //res.json({ statusCode: errorStatusCode, message: constant.responseMsg.error });
    } else {
      return res.json({ statusCode: successStatusCode, data: true });
    }
  });
}
