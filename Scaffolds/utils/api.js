"use strict";
var app = getApp()
	// var util = require('util.js')

var isDev = true;
var server = "https://app.geek2startup.com/fake-api";

if (isDev) {
	server = "http://192.168.1.155:7000";
};

var openid;

class api {

	apiMsg(msg) {
		console.log("api Message: " + msg);
	}

	getOpenid(callback, cb_fail) {
		wx.getStorage({
			key: 'openid',
			success: function(res) {
				if (res.data === "") {
					console.log("wx.getStorage: success, but data empty " + res.data);
					(cb_fail && typeof(cb_fail) === "function") && cb_fail(res.data);
				} else {
					console.log("wx.getStorage: success '" + res.data + "'");
					openid = res.data;
					(callback && typeof(callback) === "function") && callback(res.data);
				}


			},
			fail: function(res) {
				console.log("wx.getStorage: fail ");
				(cb_fail && typeof(cb_fail) === "function") && cb_fail(res.data);
			}
		})
	}

	login() {
		var that = this;

		var success = function(r) {
			if (r == undefined) {
				fail();
			} else {
				openid = r;
			}
		}

		var fail = function() {
			wx.login({
				success: function(res) {
					console.log("api.login ... server: " + server + "api/login");
					if (res.code) {
						wx.request({
							url: server + "api/login",
							data: {
								code: res.code
							},
							success: function(res) {
								console.log("api.login ... openid " + res.data);
								wx.setStorage({
									key: "openid",
									data: res.data
								})
							},
							fail: function() {
								console.log("api.login ... fail");
							},
							complete: function() {
								console.log("api.login ... complete");
							}
						})
					} else {
						console.log('获取用户登录态失败！' + res.errMsg)
					}
				}
			});
		}

		that.getOpenid(success, fail);

	}

	api() {
		var url;
		var that = this;
		var callback = null;
		var path = null;
		var data = {
			openid: openid
		};

		var method = "GET"
		var header = {
			'content-type': 'application/json'
		}
		String.prototype.startWith = function(compareStr) {
			return this.indexOf(compareStr) == 0;
		}

		for (var i = 0; i < arguments.length; i++) {
			var p = arguments[i];
			if (typeof p == 'string') {

				path = p;
			} else if (typeof p == 'object') {
				data = {
					"openid": openid,
					"data": p
				};
				method = "POST";
				header = {
					'content-type': 'application/json'
				}
			} else if (typeof p == 'function') {
				callback = p;
			}
		}


		if (path.startWith("http")) {
			url = path
		} else {
			url = server + '/' + path;
		}

		console.log("api: " + url + " method: " + method);

		wx.request({
			url: url,
			data: data,
			method: method,
			header: header,
			success: function(res) {

				console.log("return: " + path);
				// console.log(res.data);
				(callback && typeof(callback) === "function") && callback(res.data);

			},
			fail: function() {
				console.log("[fail] " + "api: " + path + " method: " + method);
			},
			complete: function() {}
		})
	}
}

module.exports = api;
