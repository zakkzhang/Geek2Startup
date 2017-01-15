'use strict';
var express = require('express');
var qr = require('qr-image');
var router = express.Router();
var low = require('lowdb');
const uuidV4 = require('uuid/v4');
const db = low('db_weapp.json');
var we = require('./../libs.js');

router.get('/', function(req, res) {
	req.session.sdo = "session do.";
	var socket = req.app.get('io');
	socket.emit('hello', 'world');
	res.render('index', {
		pageTitle: 'WeApp',
		ssid: req.session.id,
		ssdo: req.session.sdo,
		socketid: req.session.socketid
	})
	res.end();
});

router.get('/sess', function(req, res) {
	var sess = req.session
	if (sess.views) {
		sess.views++
			res.setHeader('Content-Type', 'text/html')
		res.write('<p>views: ' + sess.views + '</p>')
		res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
		res.end()
	} else {
		sess.views = 1
		res.end('welcome to the session demo. refresh!')
	}
});

router.get('/test', function(req, res) {
	res.render('index', {
		pageTitle: 'WeApp',
		ssid: req.session.id,
		ssdo: req.session.sdo
	})
});

router.get('/l', function(req, res) {
	res.redirect('/l/' + req.session.id);
});

router.get('/l/:sessionid', function(req, res) {
	console.log("=== socketid: " + req.session.socketid);
	res.render('login', {
		pageTitle: 'WeApp',
		qrurl: we.buildCodeUrl(req.session.id),
		session: req.session.id,
		socketid: req.session.socketid
	})
})

router.post('/api-login', function(req, res) {

});

router.get("/qrcode", function(req, res) {
	var img = qr.image(we.buildCodeUrl(req.session.id));
	res.writeHead(200, {
		'Content-Type': 'image/png'
	});
	img.pipe(res);
})


//
// 客戶端準備 openid；
// 服務器提出 QR SESSION；
// 客戶端掃描 QR，獲得 SESSION；
// 向 API 提交 openID 和 session；
// Web Pass
//


module.exports = router;
