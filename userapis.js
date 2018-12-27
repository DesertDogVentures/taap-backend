module.exports = function(app) {
	var userService = require('../routes/UserService'); 
      var URL_PREFIX =  require('../../config').URL_PREFIX
      /**************************************************************************************************************/	  
      /**
       * @api {post} /registeruser 
       * @apiName registeruser
       * @apiGroup User 
       * @apiParamExample {String} body
       *     mailId : "demo@gmail.com",
             contactNumber: "7896541230",
            password:"password",
            confirmPassword:"password",
            firstName:"firstName",
          
            lastName:"lastName",
            birthDate:"birthDate"
            
      * @apiSuccessExample string Success-Response: {string}
      *     HTTP/1.1 200 OK
                  [
                        {
                              "statusCode":1,
                              "message":"SUCCESS"
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
                  "message":{
                        "code": "ER_SP_WRONG_NO_OF_ARGS",
                        "errno": 1318,
                        "sqlState": "42000",
                        "index": 0
                        }
                  }
      *         }
      *     }
      * @apiError statusCode:0 Cannot register user		
      */  
	app.post(URL_PREFIX + '/registeruser', userService.registerUser);
      
      
/**************************************************************************************************************/	  
 /**
 * @api {put} /users/:username 
 * @apiName editUser
 * @apiGroup User 
 * @apiParamExample {String} body
       firstName:"firstName",
       lastName:"lastName",
       birthDate:"birthDate"
       
 * @apiSuccessExample string Success-Response: {string}
 *     HTTP/1.1 200 OK
		 [
		      {
                        "statusCode":1
                        "message":"SUCCESS"
			 },
		 ]
 *
 * @apiDescription Edit User API
 * @apiHeader {String} Content-Type : application/json
 * 
 
 * @apiSuccess {String} statusCode Status Code 1
 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": {
 *	        {"statusCode":0,
               "message":{
                  "code": "ER_SP_WRONG_NO_OF_ARGS",
                  "errno": 1318,
                  "sqlState": "42000",
                  "index": 0
                  }
              }
 *         }
 *     }
 * @apiError statusCode:0 Cannot edit user details
 */  
	app.put(URL_PREFIX + '/users/:username', userService.editUserInfo);
      
/**************************************************************************************************************/	  
 /**
 * @api {get} /users/isUnique 
 * @apiName isUnique
 * @apiGroup User 
 * @apiParamExample {String} body
       username:"username",
       contactNumber:"8974563210"
       
 * @apiSuccessExample string Success-Response: {string}
 *     HTTP/1.1 200 OK
		 [
		      {
                        "statusCode":1
                        "data":{"isUnique":true}
			 },
		 ]
 *
 * @apiDescription Check if user unique
 * @apiHeader {String} Content-Type : application/json
 * 
 
 * @apiSuccess {String} statusCode Status Code 1
 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": {
 *	        {"statusCode":0,
               "message":{
                  "code": "ER_SP_WRONG_NO_OF_ARGS",
                  "errno": 1318,
                  "sqlState": "42000",
                  "index": 0
                  }
              }
 *         }
 *     }
 * @apiError statusCode:0 Error
 */  
	app.get(URL_PREFIX+'/users/isUnique', userService.checkIfUserUnique);
      
/**************************************************************************************************************/	  
 /**
 * @api {get} /users/:username 
 * @apiName getUserInfo
 * @apiGroup User 
 
       
 * @apiSuccessExample string Success-Response: {string}
 *     HTTP/1.1 200 OK
		 [
		      {
                        "statusCode":1,
                        "data":[{
                              "mail_id":"sfdas",
                              "first_name":"sagar",
                              "last_name":"arora",
                              "contact_number":"das",
                              "birth_date":"1992-06-25T18:30:00.000Z"
                        }]
                  }
		 ]
 *
 * @apiDescription Get User API
 * @apiHeader {String} Content-Type : application/json
 * 
 
 * @apiSuccess {String} statusCode Status Code 1
 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": {
 *	        {"statusCode":0,
               "message":{
                  "code": "ER_SP_WRONG_NO_OF_ARGS",
                  "errno": 1318,
                  "sqlState": "42000",
                  "index": 0
                  }
              }
 *         }
 *     }
 * @apiError statusCode:0 Cannot get user details
 */  
	app.get(URL_PREFIX + '/users', userService.getUserInfo);
      
      
      
/**************************************************************************************************************/	  
 /**
 * @api {post} /users/authenticate 
 * @apiName authenticate
 * @apiGroup User 
 * @apiParamExample {String} body
       username:"username",
       password:"password"
       
 * @apiSuccessExample string Success-Response: {string}
 *     HTTP/1.1 200 OK
		 [
		      {
                        "statusCode":1
                        "data":{"isAuthenticated":true}
			 },
		 ]
 *
 * @apiDescription authenticate user username/password
 * @apiHeader {String} Content-Type : application/json
 * 
 
 * @apiSuccess {String} statusCode Status Code 1
 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": {
 *	        {"statusCode":0,
               "message":{
                  "code": "ER_SP_WRONG_NO_OF_ARGS",
                  "errno": 1318,
                  "sqlState": "42000",
                  "index": 0
                  }
              }
 *         }
 *     }
 * @apiError statusCode:0 Error while authentication
 */  
	app.post(URL_PREFIX + '/authenticate', userService.authenticateUser);
      
      
      
 /**************************************************************************************************************/	  
 /**
 * @api {post} /sendRequest
 * @apiName send request
 * @apiGroup User 
 * @apiParamExample {String} body
       senderUsername:"senderUsername",
       recieverUsername:"recieverUsername"
       
 * @apiSuccessExample string Success-Response: {string}
 *     HTTP/1.1 200 OK
		 [
		      {
                        "statusCode":1
                        "data":"SUCCESS"
			 },
		 ]
 *
 * @apiDescription authenticate user /sendRequest
 * @apiHeader {String} Content-Type : application/json
 * 
 
 * @apiSuccess {String} statusCode Status Code 1
 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": {
 *	        {"statusCode":0,
               "message":"ERROR"
              }
 *         }
 *     }
 * @apiError statusCode:0 Error while authentication
 */  
	app.post(URL_PREFIX + '/request/status', userService.changeRequestStatus);
      
      
/**************************************************************************************************************/	  
 /**
 * @api {get} /search/:query
 * @apiName search by username
 * @apiGroup User 
       
 * @apiSuccessExample string Success-Response: {string}
 *     HTTP/1.1 200 OK
		 [
		      {
                        "statusCode":1
                        "data":{
                              "userList": [
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
 * @apiDescription authenticate user /sendRequest
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
	app.get(URL_PREFIX + '/search/:query', userService.searchUsers);
      

/**************************************************************************************************************/	  
 /**
 * @api {get} /friends
 * @apiName get list of friends
 * @apiGroup User 
       
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
	app.get(URL_PREFIX + '/friends', userService.getFriendList);
 
 
	app.post(URL_PREFIX + '/contactstatus', userService.getContactStatus); 
 
 
 /**************************************************************************************************************/	  
 /**
 * @api {get} /logout
 * @apiName destroy session of user
 * @apiGroup User 
       
 * @apiSuccessExample string Success-Response: {string}
 *     HTTP/1.1 200 OK
		 [
		      {
                        "statusCode":1
                        "message":"SUCCESS"
                        }
			 },
		 ]
 *
 * @apiDescription authenticate user /logout
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
 * @apiError statusCode:0 Error while logout
 */
 
      app.delete(URL_PREFIX + '/logout',userService.destroyToken);
}