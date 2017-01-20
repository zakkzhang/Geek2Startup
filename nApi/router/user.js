var express = require('express');
var router = express.Router();
var we = require('./../models/libs.js');
var m = require('./../models/api.js');

// 判斷用戶是否登入
router.use(function (req, res, next) {
  console.log("");
  console.log("> router: /user/ ...");
  console.log('%s %s %s', req.method, req.url, req.path);
  // var openid = req.cookies.openid;
  // console.log("req.cookies", req.cookies);
  if (req.cookies.openid == undefined) {
    res.redirect("/qr");
  } else {
    var o = req.cookies.openid;

    m.mo_Users.find({
      openid: o
    }, function (err, user) {
      if (err) throw err;

      // console.log("user", user);
      if (user.length == 0) {
        res.clearCookie('openid');
        res.redirect("/qr");
      } else {
        res.data = {};
        res.data.oid = o;
        res.data.uid = user[0].id;
        res.data.user = user[0].userinfo;
        res.data.allUserInfo = user[0]
        next();
      }

    });

  }

});

// orRHq0Fejs-DeiffnqYGIT75ec6A
// http://localhost:7000/api/v1/Users/?query={"name":"Bob"}


router.get('/', function (req, res) {

  var renderData = {
    pageTitle: 'WeApp',
    userinfo: res.data.user
  }
  res.render('user/index', renderData)
  res.end();
});

router.get('/center', function (req, res) {

  var renderData = {
    pageTitle: 'WeApp',
    userinfo: res.data.user,
    resume: res.data.allUserInfo.resume
  }
  res.render('user/center', renderData)
  res.end();
});

router.post('/center', function (req, res) {

  m.mo_Users.findByIdAndUpdate(res.data.uid, {
    resume: req.body
  }, function (err, doc) {
    if (err) throw err;

    res.redirect("/user/center");
  })


});

router.get('/invite', function (req, res) {

  m.mo_Users.findById(res.data.uid, function (err, user) {
    // console.log(user);
  })

  m.mo_geekInvite.find({
    buildByOpenID: res.data.oid
  }, function (err, codes) {
    if (err) throw err;

    var renderData = {
      pageTitle: 'WeApp',
      userinfo: res.data.user,
      invite: codes
    }
    res.render('user/invite', renderData)
    res.end();
  });

});

router.post('/invite/', function (req, res) {

  var random = randomid();

  var inviteData = {
    inviteCode: random,
    buildByUserID: res.data.uid,
    buildByOpenID: res.data.oid
  }

  var newCode = m.mo_geekInvite(inviteData);
  newCode.save(function (err) {
    if (err) throw err;

    console.log('newCode created!');
  });

  res.redirect("/user/invite");
});

module.exports = router;

function randomid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() +
    S4());
}
