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

// 遞交用戶數據并保存
router.post('/userInfo', function(req, res) {
	console.log('req.body', req.body.openid);
	db.set('app.req.body.' + req.body.openid, req.body.data).value();
	res.jsonp({
		"return": "ok"
	});
});

module.exports = router;
