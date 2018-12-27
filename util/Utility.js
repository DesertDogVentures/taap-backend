var moment = require('moment');

exports.getCurrentTimestamp = function(){
    return moment().format('YYYY-MM-DD hh:mm:ss');
}

exports.getCurrentTimestampinUTC = function(){
    return moment.utc().format('YYYY-MM-DD hh:mm:ss');
}

exports.getUser = function () {
    return -1;
}

exports.isEmpty = function(params) {
    if(params == null || params == undefined || params.trim() == ''){
        return true;
    }else{
        return false;
    }
}

exports.isNotEmpty = function(params) {
    if(params == null || params == undefined || params.trim() == ''){
        return false;
    }else{
        return true;
    }
}

exports.convertJsonStrToArr = function(jsonStr) {
    if(jsonStr == null || jsonStr.trim() == ''){
        return null;
    }
    var token = '},'
    var parsedArr = [];
    while(jsonStr.indexOf(token) > 0){
        var tokenIndex = jsonStr.indexOf(token);
        var currentJson = JSON.parse(jsonStr.substring(0,tokenIndex + 1));
        parsedArr.push(currentJson);
        jsonStr = jsonStr.substring(tokenIndex + 2)
    }
    parsedArr.push(JSON.parse(jsonStr));
    return parsedArr;
}