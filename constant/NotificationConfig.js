var apn = require('apn');
var apnConfig = require('../config').apn;

module.exports = function () { 
	var appConfig = {
		production : apnConfig.isProduction,
		cert : apnConfig.publicKeyPath,
		key : apnConfig.privateKeyPath,
		passphrase : apnConfig.passphrase,
        batchFeedback  : true,
	};
	var service = new apn.connection(appConfig);

	console.log('service.options is : %o', service.options);

	service.on('connected', function () {
		console.log('Connected');
	});

	service.on('completed', function () {
		console.log('Completed!');
	});

	service.on('transmitted', function (notification) {
		console.log('Transmitted: ', notification);
	});

	service.on('socketError', function (err) {
		console.log('Socket error', err.message);
	});

	service.on('transmissionError', function (err) {
		console.log('Transmission Error', err);
	});

	service.on('error', function (err) {
		console.log('Standard error', err);
	});

	return service;
}
