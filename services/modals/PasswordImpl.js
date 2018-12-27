var pool = require('../../dao/ConnectionPool').dbPool;
var utility = require('../../util/Utility');

exports.saveOTP = function (user_arg, otp_arg, callback) {
    var params = "'" + user_arg.trim() + "'," + otp_arg;
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            return;
        }
        connection.query("CALL add_otp(" + params + ")", function (err, rows) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
        connection.on('error', function (err) {
            callback(err, null);
            return;
        });
    });
}

exports.varifyOTP = function (user_arg, otp_arg, callback) {
    var params = "'" + user_arg.trim() + "'," + otp_arg;
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            return;
        }
        connection.query("CALL varify_otp(" + params + ")", function (err, rows) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                var isVariefied = (rows[0][0].time_left > 0) ? true : false;
                var data = { 'isVariefied': isVariefied };
                callback(null, data);
            }
        });
        connection.on('error', function (err) {
            callback(err, null);
            return;
        });
    });
}

exports.updatePassword = function (user_arg, otp_arg, password_arg, callback) {
    var params = "'" + user_arg.trim() + "'," + otp_arg + ",'"+ password_arg.trim() +"'";
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            return;
        }
        connection.query("CALL update_password(" + params + ")", function (err, rows) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows[0][0].result);
            }
        });
        connection.on('error', function (err) {
            callback(err, null);
            return;
        });
    });
}