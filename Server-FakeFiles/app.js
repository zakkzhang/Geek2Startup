'use strict';

var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cons = require('consolidate');
var jade = require('jade');
var router = express.Router();
var app = express();
const uuidV4 = require('uuid/v4');
var MemoryStore = require('session-memory-store')(session);
var sharedsession = require("express-socket.io-session");

// 載入
var api = require('./routes/api');
var write = require('./routes/write');
var www = require('./routes/www');

app.use(cookieParser());
// session
var uuid = uuidV4();
var sess = {
	genid: function(req) {
		return uuid; // use UUIDs for session IDs
	},
	secret: 'keyboard cat',
	resave: false,
	store: new MemoryStore(),
	saveUninitialized: true,
	clear_interval: 900,
	cookie: {
		secure: false,
		maxAge: 2 * 60 * 60 * 1000
	}
}
var sessionMiddleware = session(sess)
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.use(sharedsession(sessionMiddleware, {
	autoSave: true
}));
app.use(sessionMiddleware);

io.on('connection', function(socket) {;
	console.log(socket.handshake.session);
	socket.handshake.session.socketid = socket.id
	socket.emit('qr', {
		qr: 'wait',
		// session: socket.request.session.id,
		socket: socket.id
	});
	socket.on('onConnect', function(data) {});
	socket.on("login", function(userdata) {
		socket.handshake.session.userdata = userdata;
		console.log(userdata);
	});
	socket.on("logout", function(userdata) {
		if (socket.handshake.session.userdata) {
			delete socket.handshake.session.userdata;
		}
	});
});


// 刷新 session
app.get('/new', function(req, res) {
	uuid = uuidV4();
	console.log(uuid);
	console.log("========== NEW ==========");
	res.redirect('/');
})

// 模板引擎
app.engine('html', cons.swig)
app.set('view engine', 'jade')
app.set('views', __dirname + '/views')
app.set('io', io);
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

server.listen(5000);
// app.listen(5000);
