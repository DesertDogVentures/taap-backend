var pool = require('../../dao/ConnectionPool').dbPool;
var utility = require('../../util/Utility');


exports.saveTap = function (username, reciepentList, tapType, latitude, longitude, unlockedTimestamp, content,assets, assetsType, isAnonymous,location,tapStatus,instructions,linkedTap,callback) {
    var creationDate = utility.getCurrentTimestampinUTC(); 
    var params = "'" + username + "','" + reciepentList + "'," + tapType + "," + latitude + "," + longitude + ",'" + unlockedTimestamp + "','" + creationDate + "','" + content + "','" + assets + "','" + assetsType   + "'," + isAnonymous + ",'" + location + "'," + tapStatus + ",'"+ instructions+"',"+linkedTap;
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
            return;
        }
        connection.query("CALL add_tap3(" + params + ")", function (err) {
            connection.release();
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
        connection.on('error', function (err) {
            callback(err);
            return;
        });
    });
}

exports.getDeviceToken = function (usernameList, callback) {
    usernameList = usernameList.replace(",","','");
    var params = "'" + usernameList + "'";
    
    var query  = 'call get_notification_info (\"' + params + '\")';
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err,null);
            return;
        } 
        connection.query(query, function (err,rows) {
            connection.release();
            if (err) {
                callback(err,null);
            } else { 
                callback(null,rows[0]);
            }
        });
        connection.on('error', function (err) {
            callback(err,null);
            return;
        });
    }); 
}

exports.getTaps = function (username, tapType, callback) { 
    var params = "'" + username + "'";
    var queryDB = '';
    if(tapType === '0'){
        queryDB = "CALL get_tap_list1(" + params + ")";
    }else if(tapType === '1'){
        queryDB = "CALL get_sent_tap_list3(" + params + ")";
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
            return;
        }
        connection.query(queryDB, function (err,rows) {
            connection.release();
            if (err) {
                callback(err,null);
            } else {
                callback(null,rows[0]);
            }
        });
        connection.on('error', function (err) {
            callback(err,null);
            return;
        });
    });
}

exports.updateTapStatus = function (recieverUsername, tapId, statusType, callback) { 
    var creationDate = utility.getCurrentTimestampinUTC();
    var params = "'" + recieverUsername + "','" + tapId + "','" + creationDate + "','" + statusType + "'";
    console.log(params);
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
            return;
        }
        connection.query("CALL change_tap_status1(" + params + ")", function (err) {
            connection.release();
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
        connection.on('error', function (err) {
            callback(err);
            return;
        });
    });
}

exports.resetBadge = function (username, callback) {  
    var params = "'" + username + "'";
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
            return;
        }
        connection.query("CALL reset_badge(" + params + ")", function (err) {
            connection.release();
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
        connection.on('error', function (err) {
            callback(err);
            return;
        });
    });
}

exports.deleteTaps = function (username, tapid, callback) {  
    var params = "'" + username + "',"+tapid;
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
            return;
        }
        console.log("CALL delete_tap(" + params + ")");
        connection.query("CALL delete_tap(" + params + ")", function (err) {
            connection.release();
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
        connection.on('error', function (err) {
            callback(err);
            return;
        });
    });
}

