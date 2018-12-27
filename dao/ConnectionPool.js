var dbProperties = require('../config.js').database;
var mysql = require('mysql'); 

var pool = mysql.createPool({
    connectionLimit : dbProperties.connectionLimit, 
    host : dbProperties.host,
    user : dbProperties.user,
    password : dbProperties.password,
    database : dbProperties.database,
    debug : dbProperties.debug
});

exports.dbPool = pool;
