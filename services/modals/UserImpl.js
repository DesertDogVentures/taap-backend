var pool = require('../../dao/ConnectionPool').dbPool;
var utility = require('../../util/Utility');

exports.registerUser = function (params, callback) {
    var createdBy = utility.getUser();
    var creationDate = utility.getCurrentTimestampinUTC();
    var lastName = params.lastName || '';
    var birthDate = params.birthDate || '';
    var image = params.image || '';
    var params = "'" + params.mailId.trim() + "','" + params.firstName.trim() + "','" + lastName.trim() + "','" + params.contactNumber.trim() + "','" + birthDate + "','" + creationDate + "'," + createdBy + ",'" + creationDate + "'," + createdBy + ",'" + params.password + "','" + params.username.trim() + "','" + params.countryCode.trim() + "','" + image + "'";
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
            return;
        }
        connection.query("CALL add_user(" + params + ")", function (err, rows) {
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

exports.editUserInfo = function (username, mailId, firstName, lastName, birthDate, image, friendsList, callback) {
    console.log('we are here');
    var createdBy = utility.getUser();
    var creationDate = utility.getCurrentTimestampinUTC();
    var params ="'"+ mailId + "','" + firstName + "','" + lastName + "','" + birthDate + "','" + username + "','" + image + "','"+ friendsList + "','" + creationDate + "'," + createdBy;
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
            return;
        }
        console.log(params);
        connection.query("CALL update_user2(" + params + ")", function (err, rows) {
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

exports.checkIfUserUnique = function (userParam, paramType, callback) {
    var params = "'" + userParam + "','" + paramType + "'";

    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            return;
        }
        connection.query("CALL check_user_exist(" + params + ")", function (err, rows) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                var isUnique = (rows[0][0].is_exist > 0) ? false : true;
                var data = { 'isUnique': isUnique };
                callback(null, data);
            }
        });
        connection.on('error', function (err) {
            callback(err, null);
            return;
        });
    });
}

exports.getUserInfo = function (username, callback) {
    var params = "'" + username + "'";

    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
            return;
        }
        connection.query("CALL get_user1(" + params + ")", function (err, rows) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows[0]);
            }
        });
        connection.on('error', function (err) {
            callback(err);
            return;
        });
    });
}

exports.authenticateUser = function (username, password, deviceToken, callback) {
    var params = "'" + username + "','" + password + "','" + deviceToken + "'";

    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            return;
        }
        connection.query("CALL authenticate_user(" + params + ")", function (err, rows) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                var isAuthenticated = (rows[0].length > 0) ? true : false;
                if(isAuthenticated){
                    callback(null,true);
                }else{
                    callback(true, null);
                }
            }
        });
        connection.on('error', function (err) {
            callback(err, null);
            return;
        });
    });
}

exports.changeRequestStatus = function (senderUsername, recieverUsername, requestStatus, requestType, callback) {
    var creationDate = utility.getCurrentTimestampinUTC();
    var params = "'" + senderUsername + "','" + recieverUsername + "'," + requestStatus + "," + requestType + ",'" + creationDate + "'";

    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
            return;
        }
        connection.query("CALL change_friend_request_status(" + params + ")", function (err, rows) {
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

exports.searchUsers = function (queryParam, username, callback) {
    var params = "'" + queryParam + "','" + username + "'";

    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            return;
        }
        connection.query("CALL search_user(" + params + ")", function (err, rows) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows[0]);
            }
        });
        connection.on('error', function (err) {
            callback(err, null);
            return;
        });
    });
}

exports.getFriendList = function (username, callback) {
    var params = "'" + username + "'";

    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            return;
        }
        connection.query("CALL get_friend_list(" + params + ")", function (err, rows) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows[0]);
            }
        });
        connection.on('error', function (err) {
            callback(err, null);
            return;
        });
    });
}

exports.getContactStatus = function (username, contactList, callback) {
    var params = "'" + username + "','" + contactList + "'";

    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            return;
        }
        connection.query("CALL get_user_contact_list_status(" + params + ")", function (err, rows) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows[0]);
            }
        });
        connection.on('error', function (err) {
            callback(err, null);
            return;
        });
    });
}

exports.saveTap = function (username, reciepentList, tapType, latitude, longitude, unlockedTimestamp, content, callback) {
    var creationDate = utility.getCurrentTimestampinUTC();
    var params = "'" + username + "','" + reciepentList + "'," + tapType + "," + latitude + "," + longitude + ",'" + unlockedTimestamp + "','" + creationDate + "','" + content + "'" ;

    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            return;
        }
        connection.query("CALL add_tap(" + params + ")", function (err, rows) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows[0]);
            }
        });
        connection.on('error', function (err) {
            callback(err, null);
            return;
        });
    });
}

exports.destroyToken = function (username, callback) {
    var params = "'" + username + "'";
    var query  = "UPDATE users SET device_token = NULL WHERE username = " + params;
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
            return;
        }
        connection.query(query, function (err) {
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


exports.blockUser = function (user_id,friend_id,is_blocked, callback) {
    var params = user_id+","+friend_id+","+is_blocked;
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err);
            return;
        }
        connection.query("CALL block_user(" + params + ")", function (err, rows) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows[0]);
            }
        });
        connection.on('error', function (err) {
            callback(err);
            return;
        });
    });
     
}
