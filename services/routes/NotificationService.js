var apn = require('apn');
var apnconfig = require('../../constant/NotificationConfig');

module.exports = {

	sendmessage: function (token,badge,message,callback) {
		var tokenArr = [];
		tokenArr.push(token);
        var payload = {"aps":{"alert":message,"badge":badge,"sound":"default"}};
        var options = {'tokens':tokenArr,'payload':payload} 
		callback = (typeof callback === 'function') ? callback : function () {};
		try { 
			var service = apnconfig();
			var note = new apn.notification();
			note.payload = options.payload; 
			service.pushNotification(note, tokenArr);
			service.shutdown();
			var result = {
				'message': 'success'
			};
			return callback(null, result)
		} catch (e) { 
			return callback(e);
		}
	}

}
