var URL_PREFIX = require('../config').URL_PREFIX;
 
    
module.exports = function(app){
    
	app.use(function(req,res,next){
        /*var path = req.path;
        if(path.indexOf(URL_PREFIX) !== -1){
            path = path.replace(URL_PREFIX,'');
            req.path = path
        }*/
    });

};