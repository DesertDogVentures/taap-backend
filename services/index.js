module.exports = function(app) {
	require('./middlewares/userapis')(app);
	require('./middlewares/tapapi')(app);
	require('./middlewares/password')(app);
}	