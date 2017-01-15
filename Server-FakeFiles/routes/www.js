'use strict';
var express = require('express');
var qr = require('qr-image');
var router = express.Router();
var low = require('lowdb');
const uuidV4 = require('uuid/v4');
const db = low('db_weapp.json');
var we = require('./../libs.js');

router.get('/', function(req, res) {

	console.log(req.session.id);

	res.render('index', {
		pageTitle: 'WeApp',
		qrurl: we.buildCodeUrl(req.session.id),
		session: req.session.id
	})
})

router.get("/qrcode", function(req, res) {
	var img = qr.image(we.buildCodeUrl(req.session.id));
	res.writeHead(200, {
		'Content-Type': 'image/png'
	});
	img.pipe(res);
})

router.get("/login/:desktopid", function(req, res) {

	//get openid

	var desktopID = req.params.desktopid;

	res.send(req.params.id + "=" + req.session.id);
})


//
// 客戶端準備 openid；
// 服務器提出 QR SESSION；
// 客戶端掃描 QR，獲得 SESSION；
// 向 API 提交 openID 和 session；
// Web Pass
//

// router.get('/', function(req, res) {
// 	res.sendfile("/admin/index.html");
// });


module.exports = router;
