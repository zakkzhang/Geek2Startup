// https://florianholzapfel.github.io/express-restify-mongoose/#getting-started
/* models.js */
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var resify = require("express-restify-mongoose");
var jwt = require('express-jwt');
var async = require("async");
var moment = require('moment');
const request = require('request')
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/weapp");
// 用戶信息
var Users = mongoose.model('Users', new mongoose.Schema({
  openid: {
    type: String,
    required: true
  },
  userinfo: {
    nickName: String,
    gender: Number,
    language: String,
    city: String,
    province: String,
    country: String,
    avatarUrl: String
  },
  resume: {
    article: String,
    articleTitle: String,
    aword: String,
    introduce: String,
    jobtitle: String
  },
  data: {
    type: Array
  },
  times: {
    type: Number,
    default: 0
  },
  updateTimes: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  },
}, {
  collection: "accounts"
}));
// 微信信息
var wxData = mongoose.model('wxData', new mongoose.Schema({
  session_key: {
    type: String,
    required: true
  },
  expires_in: {
    type: Number,
    required: true
  },
  openid: {
    type: String,
    required: true
  },
}, {
  collection: "wxData"
}));

// API 訪問
var UsersOption = {
  preCreate: function(req, res, next) {

    logMsg('preCreate ...');

    Users.findOne({
      openid: req.body.openid
    }, function(err, doc) {
      if (doc == null) {
        logMsg('preCreate do!');
        next();
      } else {
        logMsg('preCreate accepted ' + doc.id + ' but not Create');
        acceptedMsg(res, doc.id, "Tips is user id",
          "User already exists");
        return 0;
      }
    });
  },
  preUpdate: function(req, res, next) {

    logMsg('preUpdate ...');

    if (!isEmpty(req.params)) {
      // 如果是帶有 ID
      var id = req.params.id;
      updateTimesbyFindID(id, 'updateTimes', 'updateDate', next);
    } else {
      next();
    }

  },
  preRead: function(req, res, next) {

    logMsg('preRead ...');

    if (!isEmpty(req.params)) {
      // 如果是帶有 ID
      var id = req.params.id;
      updateTimesbyFindID(id, 'times', false, next);
    } else {
      next();
    }
  }
}

// 建立 API 路由
resify.serve(router, Users, UsersOption);
resify.serve(router, wxData);

function updateTimesbyFindID(id, key, date, callback) {

  Users.findById(id, function(err, found) {
    if (found == null) {
      logMsg('preRead ID not exist');
      callback(null);
    } else {
      var t = found[key];
      tt = t + 1;
      logMsg('[function]updateTimesbyFindID ' + key + ": " + tt)

      var updateData = {}
      if (date == false) {
        updateData = {
          [key]: tt
        }
      } else {
        updateData = {
          [key]: tt, [date]: new Date()
        }
      }

      Users.findByIdAndUpdate(found.id, updateData, function(err, user) {
        if (err) throw err;
        callback(null);
      });
    }

  })
}

function errMsg(res, message, name) {
  res.statusCode = 400;
  res.json({
    error: "error",
    message: message,
    name: name,
  })
}

function acceptedMsg(res, tips, message, name) {
  res.statusCode = 202;
  res.json({
    tips: tips,
    message: message,
    name: name,
  })
}

function logMsg(log) {
  console.log("");
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
  console.log("nApi:", log);
}

function isEmpty(obj) {
  for (var prop in obj) {
    return false;
  }
  return true;
}
module.exports = {
  router: router,
  mo_Users: Users,
  mo_wxData: wxData,
  fn_errMsg: errMsg
};
