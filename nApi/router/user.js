var express = require('express');
var router = express.Router();
var we = require('./../models/libs.js');

// 判斷用戶是否登入
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', function(req, res) {
  res.render('user/index', {
    pageTitle: 'WeApp'
  })
  res.end();
});

module.exports = router;
