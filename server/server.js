const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const http = require('https');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
var router = express.Router();
const port = process.env.PORT || 1080;
const testCtrl = require('./Test/testController.js');

//=============================================================================
/*								Database									 */
//=============================================================================
	//const mongoURI = process.env.MONGODB_URI  || 'mongodb://admin:admin@ds111549.mlab.com:11549/rbkadmissions';
	 const mongoURI = process.env.MONGODB_URI  || 'mongodb://localhost/rbkSiteSystem';

	mongoose.connect(mongoURI);
	db = mongoose.connection;

	db.once('open',function () {
		console.log('mongoDB is open');
	});



  app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + '/../dist'));
	app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
    app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
    app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

    app.get('/api/answers', testCtrl.getAnswers);
    app.post('/api/answers', testCtrl.addAnswers);
    app.post('/api/sendRes', testCtrl.sendResponse);

// require('./config/middleware.js') (app,express);
// require('./config/routes.js') (app,express);

app.listen(port , function () {
	console.log('Server now listening on port ' + port);
	console.log('goto : http://localhost:' + port);
});

module.exports = app;
