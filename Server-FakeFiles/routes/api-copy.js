'use strict';
var Fakerator = require("fakerator");
var fakerator = Fakerator("default");
var express = require('express');
var router = express.Router();
var user_list = [];

var views = {
	"display": "views",
	"name": "查看",
	"text": "4834",
	"type": "查看"
}

var like = {
	"display": "like",
	"text": "32",
	"type": "喜欢",
	"name": "喜欢",
	"last": {
		"name": "库倪",
		"image": "http://wx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM4ZyQOVJYd1uLJVniaD1icib8icX5ZYZbL00Jby4DBdgXKXBibe9Hk7FsR0bkdCHGCvvMQ0EicgKsyN0zkg/0"
	}
}

var user_me = {
	"avatar": "http://wx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM4ZyQOVJYd1uLJVniaD1icib8icX5ZYZbL00Jby4DBdgXKXBibe9Hk7FsR0bkdCHGCvvMQ0EicgKsyN0zkg/0",
	"desc": "現在全職打理樣本工作室",
	"more": "全棧設計師，精通前端開發、熟悉後端開發、精通 UI/IxD 設計。 五年的 IT 行業經驗，UI/IxD 設計師。 喜歡 UNIX 一般的命令行提示符的體驗，追求視覺的不多不少，尋找恰好夠用而不會麻煩的產品。一枚 UI 設計師，曾經的 Web 開發者。",
	"name": "库倪",
	"title": "全棧設計師"
}


for (var i = 0; i < 11; i++) {
	user_list.push({
		"avatar": "https://app.geek2startup.com/json/fake-user/avatar-" + i + ".png",
		"name": fakerator.names.lastName(),
		"title": "UX/UI Designer for Mobile"
	})
}


router.get('/', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	res.sendfile('./public/index.json');
});

router.get('/index', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	res.sendfile('./public/index.json');
});

router.get('/user-list', function(req, res, next) {
	var list = {
		"user-me": user_me,
		"user-list": user_list
	}
	res.jsonp(list);
});


module.exports = router;
