var log4js = require('log4js'); // include log4js
//var logs_conf = require("../config").log_conf;
var logs_enabled = {
                "info":"true",
                "warn":"true",
                "error":"true",
                "debug":"true",
                "fatal":"true"
            };
              // logs_conf.logs_enabled;
var logs_path = "./logs";//logs_conf.logs_path;
var path = require('path');

log4js.configure({ // configure to use all types in different files.
    appenders: [
        {   type: 'dateFile',
            filename: path.join(logs_path,"error.log"), // specify the path where u want logs folder error.log
            category: 'error',
            pattern: "-dd-MM",
            maxLogSize: 20480,
            backups: 10,
            alwaysIncludePattern:false
        },
        {   type: "dateFile",
            filename: path.join(logs_path,"info.log"), // specify the path where u want logs folder info.log
            category: "info",
            pattern: "-dd--MM",
            maxLogSize: 20480,
            backups: 10,
            "alwaysIncludePattern":false
        },
        {   type: 'dateFile',
            filename: path.join(logs_path,"debug.log"), // specify the path where u want logs folder debug.log
            category: 'debug',
            pattern: "-dd--MM",
            maxLogSize: 20480,
            backups: 10,
            alwaysIncludePattern: false
        },
		{   type: 'dateFile',
            filename: path.join(logs_path,"warn.log"), // specify the path where u want logs folder error.log
            category: 'warn',
            pattern: "-dd-MM",
            maxLogSize: 20480,
            backups: 10,
            alwaysIncludePattern:false
        },
		{   type: 'dateFile',
            filename: path.join(logs_path,"fatal.log"), // specify the path where u want logs folder error.log
            category: 'fatal',
            pattern: "-dd-MM",
            maxLogSize: 20480,
            backups: 10,
            alwaysIncludePattern:false
        }
    ]
});

var loggerinfo = log4js.getLogger('info'); // initialize the var to use.
var loggererror = log4js.getLogger('error'); // initialize the var to use.
var loggerdebug = log4js.getLogger('debug'); // initialize the var to use.
var loggerwarn = log4js.getLogger('warn'); // initialize the var to use.
var loggerfatal = log4js.getLogger('fatal'); // initialize the var to use.

loggerinfo.info('This is Information Logger');
loggererror.info('This is Error Logger');
loggerdebug.info('This is debug Logger');
loggerwarn.info('This is warn Logger');
loggerfatal.info('This is fatal Logger'); 

var log = function(level,message,url,query){
    var dotString="-----------------------------------------------------";
    var errString = '\n\n'+message+'\nUrl:-'+url+'\nQuery:-'+query+'\n\n'+dotString; 
    if(level=='error' && logs_enabled.error=="true"){
     loggererror.info(errString);
    }
    else if(level == "debug" && logs_enabled.debug=="true"){
        loggerdebug.info(errString);
    }     
    else if(level == "info" && logs_enabled.info=="true"){
        loggerinfo.info(errString);
    }
    else if(level == "warn" && logs_enabled.warn=="true"){
        loggerwarn.info(errString);
    }
    else if(level == "fatal" && logs_enabled.fatal=="true"){
        loggerfatal.info(errString);
    }
    else {
        errString = '\n\n'+level+'\n'+message+'\nUrl:-'+url+'\nQuery:-'+query+'\n\n'+dotString;
       loggererror.info(errString); 
    }    
    return;
}

exports.log=log;


var reqReslog = function(level,url,method,headers,query,body){
    var dotString="-------------------------------------------------------";
    var message = '\n\nUrl:-' +url+ '   \n\nmethod:-' +method+'\n\n'; 
    if(level == "info" && logs_enabled.info=="true"){
       loggerinfo.info(message);
       loggerinfo.info("headers");
       loggerinfo.info(headers);
       loggerinfo.info("body");
       loggerinfo.info(body);
       loggerinfo.info("query");
       loggerinfo.info(query);
       loggerinfo.info(dotString);
    }    
    return;
}

exports.reqReslog=reqReslog;


var errorLog = function(level,errMessage,url,method,headers,query,body){
    var dotString="-------------------------------------------------------";
    var message = '\n\nUrl:-' +url+ '   \n\nmethod:-' +method+'\n\n'; 
    console.log("121");
    console.log(message);
    if(level == "error" && logs_enabled.error=="true"){
       console.log("124");
       loggererror.info(message);
       loggererror.error("headers");
       loggererror.error(headers);
       loggererror.error("body");
       loggererror.error(body);
       loggererror.error("query");
       loggererror.error(query); 
       loggererror.error("errMessage");
       loggererror.error(errMessage.stack);
       loggererror.error(dotString);
    }    
    return;
}

exports.errorLog=errorLog;