module.exports = function (app) {
      var password = require('../routes/password');
      var URL_PREFIX = require('../../config').URL_PREFIX
      /**************************************************************************************************************/
      /**
       * @api {post} /otp 
       * @apiName sendOTP
       * @apiGroup User 
       * @apiParamExample {String} body
       *     mailId : "demo@gmail.com"
            
      * @apiSuccessExample string Success-Response: {string}
      *     HTTP/1.1 200 OK
                  [
                        {
                              "statusCode":1,
                              "message":"OTP has been successfully sent."
                        },
                  ]
      *
      * @apiDescription Register User API
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
      * @apiError statusCode:0 unable to send OTP		
      */
      app.post(URL_PREFIX + '/otp', password.sendOTP);

      /**************************************************************************************************************/
      /**
       * @api {post} /verifyOTP 
       * @apiName varifyOTP
       * @apiGroup User 
       * @apiParamExample {String} body
       *     mailId : "demo@gmail.com"
            
      * @apiSuccessExample string Success-Response: {string}
      *     HTTP/1.1 200 OK
                  [
                        {
                              "statusCode":1,
                              "message":"valid OTP"
                        },
                  ]
      *
      * @apiDescription Register User API
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
      * @apiError statusCode:0 unable to verify OTP		
      */
      app.post(URL_PREFIX + '/verifyOTP', password.varifyOTP);

      /**************************************************************************************************************/
      /**
       * @api {put} /password 
       * @apiName updatePassword
       * @apiGroup User 
       * @apiParamExample {String} body
       *     mailId : "demo@gmail.com"
            
      * @apiSuccessExample string Success-Response: {string}
      *     HTTP/1.1 200 OK
                  [
                        {
                              "statusCode":1,
                              "message":"Password changed successfully"
                        },
                  ]
      *
      * @apiDescription Register User API
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
      * @apiError statusCode:0 unable to verify OTP		
      */
      app.put(URL_PREFIX + '/password', password.updatePassword);
      
}