'use strict';

var express = require('express');
var session = require('express-session')
const uuidV4 = require('uuid/v4');
var bodyParser = require('body-parser');
var jade = require('jade');
var cons = require('consolidate');
var router = express.Router();
var app = express();

// 載入
var api = require('./routes/api');
var write = require('./routes/write');
var www = require('./routes/www');
// 載入 socket.io
var socket = require('./routes/socket');

// session
var uuid = uuidV4();
var sess = {
	genid: function(req) {
		return uuid; // use UUIDs for session IDs
	},
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: true
	}
}
app.set('trust proxy', 1) // trust first proxy
sess.cookie.secure = true // serve secure cookies
app.use(session(sess))

// 刷新 session
app.get('/new', function(req, res) {
	uuid = uuidV4();
	console.log(uuid);
	res.send({
		"return": "done"
	})
})

// 模板引擎
app.engine('html', cons.swig)
app.set('view engine', 'jade')
app.set('views', __dirname + '/views')

// req.body 支持
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// 載入靜態
app.use(express.static('public'));

app.use('/api', api);
app.use('/w', write);
app.use('/', www);



app.listen(5000);
