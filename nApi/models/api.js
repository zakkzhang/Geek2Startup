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
  isAdmin: {
    type: Boolean,
    default: false
  },
  video: {
    name: {
      type: String,
      default: ''
    },
    duration: {
      type: String,
      default: ''
    },
    file: {
      originalname: String,
      encoding: String,
      mimetype: String,
      destination: String,
      filename: String,
      path: {
        type: String,
        default: ''
      },
      size: String,
    }
  },
  meta: {
    views: [{
      userid: String,
      openid: String,
      nickName: String,
      avatarUrl: String,
      date: {
        type: Date,
        default: Date.now
      }
    }],
    likes: [{
      userid: String,
      openid: String,
      nickName: String,
      avatarUrl: String,
      date: {
        type: Date,
        default: Date.now
      }
    }]
  },
  inviteMore: {
    max: {
      type: Number,
      default: 0
    }
  },
  inviteCode: {
    type: String,
    required: true
  },
  isNewUser: {
    type: Boolean,
    default: true
  },
  certifications: [{
    isShow: {
      type: Boolean,
      default: true
    },
    name: String,
    date: Date
  }],
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
    isShowArticle: {
      type: Boolean,
      default: true
    },
    article: {
      type: String,
      default: '正文'
    },
    articleTitle: {
      type: String,
      default: '自选文章-标题'
    },
    aword: {
      type: String,
      default: '一句话介绍'
    },
    introduce: {
      type: String,
      default: '自我介绍'
    },
    jobtitle: {
      type: String,
      default: '职业头衔'
    }
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

// 微信信息
var Group = mongoose.model('Group', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
}, {
  collection: "Group"
}));

// Geek2Startup 文章
var geekArticle = mongoose.model('geekArticle', new mongoose.Schema({
  article: {
    type: String,
    required: true
  },
  articleTitle: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
}, {
  collection: "geekArticle"
}));

// GeekInvite 邀請碼
var geekInvite = mongoose.model('geekInvite', new mongoose.Schema({
  inviteCode: {
    type: String,
    required: true
  },
  buildByUserID: {
    type: String,
    required: true
  },
  buildByOpenID: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isUsered: {
    type: Boolean,
    default: false
  }
}, {
  collection: "geekInvite"
}));

// API 訪問
var UsersOption = {
  preCreate: function (req, res, next) {

    logMsg('preCreate ...');
    console.log('API: method:', req.method);

    Users.findOne({
      openid: req.body.openid
    }, function (err, doc) {
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
  preUpdate: function (req, res, next) {

    logMsg('preUpdate ...');
    console.log('API: method:', req.method);

    if (!isEmpty(req.params)) {
      // 如果是帶有 ID
      var id = req.params.id;
      updateTimesbyFindID(id, 'updateTimes', 'updateDate', next);
    } else {
      next();
    }

  },
  preRead: function (req, res, next) {

    logMsg('preRead ...');
    console.log('API: method:', req.method);

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
resify.serve(router, geekArticle);
resify.serve(router, geekInvite);

function updateTimesbyFindID(id, key, date, callback) {

  Users.findById(id, function (err, found) {
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

      Users.findByIdAndUpdate(found.id, updateData, function (err, user) {
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
  mo_geekInvite: geekInvite,
  mo_geekArticle: geekArticle,
  fn_errMsg: errMsg
};
