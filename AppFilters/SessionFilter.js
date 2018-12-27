var sessionLessApis = require("../constant/SessionlessApi").sessionless;
var redisProperties = require('../config').redis;
var constant = require('../constant/Constant');
var errMsg = require('../constant/ErrMsg');

var redis = require("redis").createClient({    	
      host: redisProperties.host, 
      port: redisProperties.port, 
      disableTTL: true
    });
    
module.exports = function(app){
	app.use(function(req,res,next){
        var token = req.headers['token'];
	console.log("we are in the session filter and here is the user", req.session.user);
        if(token){
            redis.get(token,function(error, result) {
                if (error){
                    res.statusCode = 401;
                     res.json({statusCode: constant.statusCode.errorStatusCode, message:errMsg.userNotAuthorized});
                }
                else{
                    if(result){
                        req.session.user = result;
                        next();
                    }else{
                        res.statusCode = 401;
                        res.json({statusCode: constant.statusCode.errorStatusCode, message:errMsg.userNotAuthorized});
                    }
                    
                }
            });
        }
        else{
            if(sessionLessApis.indexOf(req.path) !== -1){
                next();
            }
            else{			
                res.statusCode = 401;
                res.json({statusCode: constant.statusCode.errorStatusCode, message:errMsg.userNotAuthorized});
            }			
        }
    });

};
