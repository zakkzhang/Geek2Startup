'use strict';
var Fakerator = require("fakerator");
var fakerator = Fakerator("default");
var express = require('express');
var router = express.Router();
var request = require('request');
var low = require('lowdb')
const db = low('db_weapp.json');
const session = low('db_session.json');
var we = require('./../libs.js');
db._.mixin(require('underscore-db'))

// 獲得首頁數據
router.get('/index', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	res.sendfile('./public/index.json');
});

// Web 編輯器
router.post('/qrlogin/:uuid', function(req, res, next) {
	var uu = req.params.uuid;
	var v = db.get('app.req.body.' + req.body.openid).value();
	var r;

	if (v == undefined) {
		r = '找不到用戶';
	} else {

		// 關聯用戶 openid 和 session
		db.set('app.req.body.' + req.body.openid, uu).value();
		r = v.nickName;

		// message to web site

	}
	res.jsonp({
		"return": r
	});

});

// 交換 openid
router.get('/login', function(req, res, next) {

	var code = req.query.code;
	console.log(code);

	var options = {
		url: 'https://api.weixin.qq.com/sns/jscode2session',
		qs: {
			appid: 'wxe5bf4449fd5eb13f',
			secret: 'b0be50703ebdbb43e91f177c1c2f3559',
			js_code: code,
			grant_type: 'authorization_code'
		}
	};

	// 與微信服務器通信
	request.get(options, function(error, response, body) {
		if (error) {
			console.log(error);
			return;
		}
		if (!error && response.statusCode == 200) {
			var j = JSON.parse(body);
			db.set('app.wx', j).value();

			res.jsonp(j.openid);
		}
	});

});

module.exports = router;
