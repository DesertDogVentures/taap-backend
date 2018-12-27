var URL_PREFIX = require('../config').URL_PREFIX 
var api = {
	"sessionless":[
		URL_PREFIX + "/registeruser",
		URL_PREFIX + "/authenticate",
		URL_PREFIX + "/users/isUnique",
		URL_PREFIX + "/assets",
		URL_PREFIX + "/otp",
		URL_PREFIX + "/verifyOTP",
		URL_PREFIX + "/password"
	]
		
}

exports = module.exports = api; 