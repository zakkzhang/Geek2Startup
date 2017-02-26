"use strict";

var app = getApp();
var util = require('util.js');
var dev = true;

var server;

server = "https://app.geek2startup.com";
// server = "http://app.geek2startup.com:3000";
// server = "http://192.168.1.155:3000";

var oid;
var dbid;

class api {

  constructor() {
    this.openid = 0;
    this.userid = 0;
  }

  getServer() {
    return server
  }

  apiMsg(msg) {
    console.log("api Message: " + msg);
  }

  apiModel(msg) {
    wx.showModal({
      title: 'API 通信錯誤',
      showCancel: false,
      content: msg,
      success: function(res) {}
    })
  }

  // 本地讀取 open id
  getOpenID(callback, cb_fail) {

    var that = this;

    wx.getStorage({
      key: 'openid',
      success: function(res) {
        if (res.data === "") {
          console.log("wx.getStorage: success, but data empty " + res.data);
          (cb_fail && typeof(cb_fail) === "function") && cb_fail(res.data);
        } else {
          console.log("wx.getStorage: success '" + res.data + "'");
          that.openid = res.data;
          oid = res.data;
          (callback && typeof(callback) === "function") && callback(res.data);
        }


      },
      fail: function(res) {
        console.log("wx.getStorage: fail ");
        (cb_fail && typeof(cb_fail) === "function") && cb_fail(res.data);
      }
    })
  }

  // 交換 openid
  changeOpenid(cb) {

    var that = this;

    that.getOpenID(function(r) {

      if (that.openid == undefined) {
        fail();
      } else {
        that.openid = r;
        oid = r;
        typeof cb == "function" && cb(r);
      }
    }, function(cb) {

      console.log("changeOpenid: fail");
      wx.login({
        success: function(res) {
          console.log("api.login ... server: " + server + "/api/login");
          if (res.code) {
            // 向服務器請求
            wx.request({
              url: server + '/' + "wx/openid",
              data: {
                code: res.code
              },
              success: function(res) {

                // 回調函數
                typeof cb == "function" && cb(res.data);

                // 成功后保存數據到本地
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
            console.log('api.login ... 获取用户登录态失败 ' + res.errMsg)
          }
        }
      });

    });

  }

  setUserID(uid) {
    this.userid = uid;
    dbid = uid;
    wx.setStorage({
      key: "userid",
      data: uid
    })
  }

  getUserID(callback, cb_fail) {
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        if (res.data === "") {
          console.log("wx.getStorage: success, but data empty " + res.data);
          (cb_fail && typeof(cb_fail) === "function") && cb_fail(res.data);
        } else {
          console.log("wx.getStorage: success '" + res.data + "'");
          this.userid = res.data;
          dbid = res.data;
          (callback && typeof(callback) === "function") && callback(res.data);
        }
      },
      fail: function(res) {
        console.log("wx.getStorage: fail ");
        (cb_fail && typeof(cb_fail) === "function") && cb_fail(res.data);
      }
    })
  }

  /**
   * api
   * @param string api url
   * @param string method GET\POST\PATCH\PUT\DELETE
   * @param array/object post data
   * @param function callback
   * @return {[type]} [description]
   */
  api() {
    var url;
    var that = this;
    var callback = null;
    var path = null;
    var iMethod = null;
    var openid = this.openid;
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

        if (p == 'GET' || p == 'POST' || p == 'PATCH' || p == 'PUT' || p == 'DELETE') {
          iMethod = p
          if (iMethod == 'PATCH') {
            iMethod = 'PUT'
          };
        } else {
          path = p;
        }

      } else if (typeof p == 'object') {

        if (openid == 0) {
          openid = oid;
        };

        data = {
          openid: openid,
          [p.name]: p.data
        };

        if (iMethod == null) {
          method = "POST";
        } else {
          method = iMethod;
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

        console.log("api return: " + path + " method: " + method + " statusCode: " + res.statusCode);

        if ((res.statusCode == 502 || res.statusCode == 404) && dev == false) {
          wx.showModal({
            title: '错误',
            showCancel: true,
            confirmText: '运行除错',
            content: "错误代码: " + res.statusCode,
            success: function(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/set/debug'
                })
              }
            }
          })
        } else {
          (callback && typeof(callback) === "function") && callback(res.data);
        }

      },
      fail: function() {
        console.log("[fail] " + "api: " + path + " method: " + method);
      },
      complete: function() {
        // console.log("wx.request - END");
      }
    })
  }

}

module.exports = api;


