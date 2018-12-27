module.exports = function(app) {
	var tapService = require('../routes/TapService');
	var multer = require('multer'); 
    var path = require('path')
    var ASSET_BASE_PATH = require('../../config').ASSET_BASE_PATH;
    var URL_PREFIX = require('../../config').URL_PREFIX
    
      //ASSET_BASE_PATH = "E:\\tapapp\\Tapapp-backend\\assets\\";
      var storage = multer.diskStorage({
         destination: function (req, file, cb) {
            cb(null, ASSET_BASE_PATH)
         },
         filename: function (req, file, cb) {
	    console.log('the user: ', req.session.user);
            var filename = req.session.user +  '_' + Date.now() + path.extname(file.originalname);
            cb(null, filename)
         }
      })
 
    var upload = multer({ storage: storage })

    /**************************************************************************************************************/	  
    /**
     * @api {get} /friends
     * @apiName get list of friends
     * @apiGroup Tap 
         
    * @apiSuccessExample string Success-Response: {string}
    *     HTTP/1.1 200 OK
            [
                {
                            "statusCode":1
                            "data":{
                                "friendList": [
                                        {
                                        "first_name": "sagar",
                                        "last_name": "arora",
                                        "username": "sagararora"
                                        },
                                ]
                            }
                },
            ]
    *
    * @apiDescription authenticate user /friends
    * @apiHeader {String} Content-Type : application/json
    * 
    * @apiSuccess {String} statusCode Status Code 1
    
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "error": {
    *	        {"statusCode":0,
                "data":"ERROR"
                }
    *         }
    *     }
    * @apiError statusCode:0 Error while authentication
    */   
      app.post(URL_PREFIX + '/taps',tapService.saveTap);
      
    /**************************************************************************************************************/	  
    /**
     * @api {get} /friends
     * @apiName get list of friends
     * @apiGroup Tap 
         
    * @apiSuccessExample string Success-Response: {string}
    *     HTTP/1.1 200 OK
            [
                {
                            "statusCode":1
                            "data":{
                                "friendList": [
                                        {
                                        "first_name": "sagar",
                                        "last_name": "arora",
                                        "username": "sagararora"
                                        },
                                ]
                            }
                },
            ]
    *
    * @apiDescription authenticate user /friends
    * @apiHeader {String} Content-Type : application/json
    * 
    * @apiSuccess {String} statusCode Status Code 1
    
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "error": {
    *	        {"statusCode":0,
                "data":"ERROR"
                }
    *         }
    *     }
    * @apiError statusCode:0 Error while authentication
    */   
      app.post(URL_PREFIX + '/assets',upload.single('asset'),tapService.saveAsset);
   
   
   /**************************************************************************************************************/	  
    /**
     * @api {get} /friends
     * @apiName get list of friends
     * @apiGroup Tap 
         
    * @apiSuccessExample string Success-Response: {string}
    *     HTTP/1.1 200 OK
            [
                {
                            "statusCode":1
                            "data":{
                                "friendList": [
                                        {
                                        "first_name": "sagar",
                                        "last_name": "arora",
                                        "username": "sagararora"
                                        },
                                ]
                            }
                },
            ]
    *
    * @apiDescription authenticate user /friends
    * @apiHeader {String} Content-Type : application/json
    * 
    * @apiSuccess {String} statusCode Status Code 1
    
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "error": {
    *	        {"statusCode":0,
                "data":"ERROR"
                }
    *         }
    *     }
    * @apiError statusCode:0 Error while authentication
    */   
      app.get(URL_PREFIX + '/taps',tapService.getTaps);
      
     /**************************************************************************************************************/	  
    /**
     * @api {get} /friends
     * @apiName get list of friends
     * @apiGroup Tap 
         
    * @apiSuccessExample string Success-Response: {string}
    *     HTTP/1.1 200 OK
            [
                {
                            "statusCode":1
                            "data":{
                                "friendList": [
                                        {
                                        "first_name": "sagar",
                                        "last_name": "arora",
                                        "username": "sagararora"
                                        },
                                ]
                            }
                },
            ]
    *
    * @apiDescription authenticate user /friends
    * @apiHeader {String} Content-Type : application/json
    * 
    * @apiSuccess {String} statusCode Status Code 1
    
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "error": {
    *	        {"statusCode":0,
                "data":"ERROR"
                }
    *         }
    *     }
    * @apiError statusCode:0 Error while authentication
    */   
      app.get(URL_PREFIX + '/assets',tapService.getAsset);
      
     /**************************************************************************************************************/	  
    /**
     * @api {get} /friends
     * @apiName get list of friends
     * @apiGroup Tap 
         
    * @apiSuccessExample string Success-Response: {string}
    *     HTTP/1.1 200 OK
            [
                {
                            "statusCode":1
                            "data":{
                                "friendList": [
                                        {
                                        "first_name": "sagar",
                                        "last_name": "arora",
                                        "username": "sagararora"
                                        },
                                ]
                            }
                },
            ]
    *
    * @apiDescription authenticate user /friends
    * @apiHeader {String} Content-Type : application/json
    * 
    * @apiSuccess {String} statusCode Status Code 1
    
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "error": {
    *	        {"statusCode":0,
                "data":"ERROR"
                }
    *         }
    *     }
    * @apiError statusCode:0 Error while authentication
    */   
    app.post(URL_PREFIX + '/taps/status',tapService.updateTapStatus);
    
    /**************************************************************************************************************/	  
    /**
     * @api {get} /friends
     * @apiName get list of friends
     * @apiGroup Tap 
         
    * @apiSuccessExample string Success-Response: {string}
    *     HTTP/1.1 200 OK
            [
                {
                            "statusCode":1
                            "data":{
                                "friendList": [
                                        {
                                        "first_name": "sagar",
                                        "last_name": "arora",
                                        "username": "sagararora"
                                        },
                                ]
                            }
                },
            ]
    *
    * @apiDescription authenticate user /friends
    * @apiHeader {String} Content-Type : application/json
    * 
    * @apiSuccess {String} statusCode Status Code 1
    
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "error": {
    *	        {"statusCode":0,
                "data":"ERROR"
                }
    *         }
    *     }
    * @apiError statusCode:0 Error while authentication
    */   
    app.post(URL_PREFIX + '/badge/reset',tapService.resetBadge);

    /**************************************************************************************************************/	  
    /**
     * @api {get} /friends
     * @apiName get list of friends
     * @apiGroup Tap 
         
    * @apiSuccessExample string Success-Response: {string}
    *     HTTP/1.1 200 OK
            [
                {
                            "statusCode":1
                            "data":{
                                "friendList": [
                                        {
                                        "first_name": "sagar",
                                        "last_name": "arora",
                                        "username": "sagararora"
                                        },
                                ]
                            }
                },
            ]
    *
    * @apiDescription authenticate user /friends
    * @apiHeader {String} Content-Type : application/json
    * 
    * @apiSuccess {String} statusCode Status Code 1
    
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "error": {
    *	        {"statusCode":0,
                "data":"ERROR"
                }
    *         }
    *     }
    * @apiError statusCode:0 Error while authentication
    */   
      app.delete(URL_PREFIX + '/taps/:id',tapService.deleteTaps);
   


}
