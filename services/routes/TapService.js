var tapImpl = require('../modals/TapImpl');
var constant = require('../../constant/Constant'); 
var fs = require('fs');
var mkdirp = require('mkdirp');
var ASSET_BASE_PATH = require('../../config').ASSET_BASE_PATH;
var PATH_SEPERATOR = require('../../config').PATH_SEPERATOR;
var path = require('path');
var logger = require('../../logger/log');
var path = require('path');
var utility = require('../../util/Utility');
var notificationService = require('./NotificationService');
  
exports.saveTap = function (req, res, next) {
  //var x = req.file
  var successStatusCode = constant.statusCode.success;
  var errorStatusCode = constant.statusCode.error;
  var username = req.session.user;
  var reciepentList = req.body.reciepentList;
  var tapType = parseInt(req.body.type);
  var latitude = req.body.latitude || null;
  if (latitude != null){
    latitude = parseFloat(latitude);
  }
  var longitude = req.body.longitude || null;
  if(longitude != null){
    longitude = parseFloat(longitude);
  }
  var instructions = req.body.instructions || null;
  var unlockedTimestamp = req.body.unlockedTimestamp || null;
  var comment = req.body.comment || null;
  var isAnonymous = req.body.isAnonymous || false;
  var location = req.body.location || null;
  var assets = req.body.assets;
  var tapStatus = req.body.tapStatus || "1";
  var linkedTap = req.body.linkedTap || null;
  tapStatus = parseInt(tapStatus);
  
if (reciepentList == null || reciepentList == undefined || reciepentList.length <= 0) {	
    return res.send({ statusCode: errorStatusCode, message: constant.responseMsg.error });
  }
  if (assets == null || assets == undefined || assets.length <= 0) {
    return res.send({ statusCode: errorStatusCode, message: constant.responseMsg.error });
  }
  var assetsArr = [];
  var assetsTypeArr = [];
  for (var index in assets){
    assetsArr.push(assets[index]['asset']);
    assetsTypeArr.push(assets[index]['assetType']);
  }
  //reciepentList = JSON.parse(reciepentList)
  tapImpl.saveTap(username, reciepentList.join(), tapType, latitude, longitude, unlockedTimestamp, comment,assetsArr.join(),assetsTypeArr.join(),isAnonymous,location,tapStatus,instructions,linkedTap, function (err) {
    if (err) {
      var bodyParams = [username, reciepentList.join(), tapType, latitude, longitude, unlockedTimestamp, comment,assets.join(),isAnonymous,location];
      logger.log('error',err,req.url,bodyParams);
      console.log('the error: ', err);
      next(err);
      //res.json({ statusCode: errorStatusCode, message: constant.responseMsg.error });
    } else {  
	console.log('we also go to this part');
        res.json({ statusCode: successStatusCode, message: constant.responseMsg.success });
        tapImpl.getDeviceToken(reciepentList.join(),function(err,data){
          if(err){
            next(err);
          }else{
            for (var i in data){ 
              notificationService.sendmessage(data[i]['device_token'],data[i]['badge_count'],constant.notificationMsg.tapMsg,null);
            }
          }
        }) 
    }
  });
}

exports.getTaps = function (req, res, next) { 
  var successStatusCode = constant.statusCode.success;
  var errorStatusCode = constant.statusCode.error;
  var username = req.session.user;
  var tapType = req.query.tapType || '0';
  
  tapImpl.getTaps(username,tapType, function (err,data) {
    if (err) {
      var bodyParams = [username,tapType];
      logger.log('error',err,req.url,bodyParams);
      next(err);
      //res.json({ statusCode: errorStatusCode, message: constant.responseMsg.error });
    } else {
      var resArr = []; 
      if(data != null || data != undefined){
        for(var index in data){
          var currentJson = data[index];
          if(currentJson.hasOwnProperty('users')){
            currentJson['users'] = utility.convertJsonStrToArr(currentJson['users']);
          }
          if(currentJson.hasOwnProperty('assets')){
            currentJson['assets'] = utility.convertJsonStrToArr(currentJson['assets']);
          }
          resArr.push(currentJson);
        }
      }
      return res.json({ statusCode: successStatusCode, data: resArr });
    }
  });
}

exports.getAsset = function (req, res, next) { 
  var asset = req.query.asset;
  var assetType = req.query.assetType;
  //ASSET_BASE_PATH = "E:\\tapapp\\Tapapp-backend\\assets\\";
  var filePath = ASSET_BASE_PATH + asset;
  var extension = path.extname(asset).replace(".", "");
  res.sendFile(filePath, function (err) {
        if (err) { 
          console.log(err)
        }
        else { 
        }
      });
      return;
      /*
  fs.readFile(filePath,function (err,data) {
    if(err){
      var bodyParams = [filePath];
      logger.log('error',err,req.url,bodyParams); 
      next(err);
      //res.json({ statusCode:  constant.statusCode.error, message: constant.responseMsg.error });
    }else{
      var extension = path.extname(asset).replace(".", "");
      var header;
      if(assetType == 1){
        header = 'image/' + extension;
      }else{
        if(extension == 'mov'){
          extension = 'quicktime';
        }
        header = 'video/' + extension;
      }
      res.writeHead(200, {'Content-Type': header });
      return res.end(data, 'binary');
    }
  });*/
  /*
  fs.stat(filePath, function(err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          // 404 Error if file not found
          return res.sendStatus(404);
        }
      res.end(err);
      }
      var range = "bytes=0-";//req.headers.range;
      if (!range) {
       // 416 Wrong range
       return res.sendStatus(416);
      }
      var start = 0;
      var total = stats.size;
      var end = total - 1;
      var chunksize = (end - start) + 1;
       if(extension == 'mov'){
          extension = 'quicktime';
        }
      
      fs.readFile(filePath,function (err,data) {
        if(err){
          var bodyParams = [filePath];
          logger.log('error',err,req.url,bodyParams); 
          res.json({ statusCode:  constant.statusCode.error, message: constant.responseMsg.error });
        }else{
          var extension = path.extname(asset).replace(".", "");
          var header;
          if(assetType == 1){
            header = 'image/' + extension;
          }else{
            if(extension == 'mov'){
              extension = 'quicktime';
            }
            header = 'video/' + extension;
          }
          //res.writeHead(200, {'Content-Type': header });
          res.writeHead(200, {
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/" + extension
          });
          res.end(data, 'binary');
        }
      });
      var stream = fs.createReadStream(filePath, { start: start, end: end })
        .on("open", function() {
          stream.pipe(res);
        }).on("error", function(err) {
          res.end(err);
        });
    });*/
}
 


exports.saveAsset = function (req, res, next) {
  return res.json({statusCode:constant.statusCode.success,data:{'filePath':req.file.filename}})
 } 
  
 exports.updateTapStatus = function (req, res, next) { 
    var successStatusCode = constant.statusCode.success;
    var errorStatusCode = constant.statusCode.error;
    var tapId = req.body.tapId;
    var statusType = req.body.statusType;
    var recieverUsername = req.session.user;
    tapImpl.updateTapStatus(recieverUsername, tapId, statusType, function (err) {
      var bodyParams = [recieverUsername, statusType];
      if (err){
        logger.log('error',err,req.url,bodyParams);
        next(err);
        //res.json({ statusCode: errorStatusCode, message: constant.responseMsg.error });
      } else {
        logger.log('error','success',req.url,bodyParams);
        return res.json({ statusCode: successStatusCode, message: constant.responseMsg.success });
      }
    });
}

exports.resetBadge = function (req, res, next) { 
    var successStatusCode = constant.statusCode.success;
    var errorStatusCode = constant.statusCode.error;  
    var username = req.session.user;
    tapImpl.resetBadge(username, function (err) {
      var bodyParams = [username];
      if (err) {
        logger.log('error',err,req.url,bodyParams);
        next(err);
        //res.json({ statusCode: errorStatusCode, message: constant.responseMsg.error });
      } else { 
        return res.json({ statusCode: successStatusCode, message: constant.responseMsg.success });
      }
    });
}  

exports.deleteTaps = function (req, res, next) {
   var successStatusCode = constant.statusCode.success; 
   var tapid=req.params.id;
   var username = req.session.user;
   tapImpl.deleteTaps(username, tapid,function (err) {
      var bodyParams = [username];
      if (err) {
        logger.log('error',err,req.url,bodyParams);
        next(err);
      } else { 
        return res.json({ statusCode: successStatusCode, message: constant.responseMsg.success });
      }
    });
  
}

     
