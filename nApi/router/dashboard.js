var express = require('express');
var router = express.Router();
var m = require('./../models/api.js');

router.use(function(req, res, next) {
  console.log("");
  console.log("> router: /dashboard/ ...");
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', function(req, res) {
  console.log(req.cookies);
  if (!req.cookies.isLogin) {
    res.redirect("/");
    return false;
  }
  res.render('dashboard/home', {
    pageTitle: 'WeApp',
    isError: false,
    isLogin: true,
    error: 'no'
  })

});

router.get('/article/post', function(req, res) {
  res.render('dashboard/post', {})
  res.end();
});

router.get('/article/manage', function(req, res) {
  res.render('dashboard/manage', {})
  res.end();
});

router.get('/user/net', function(req, res) {
  res.render('empty', {})
  res.end();
});

router.get('/user/data', function(req, res) {
  res.render('empty', {})
  res.end();
});



router.get('/user/invite', function(req, res) {
  res.render('dashboard/invite', {})
  res.end();
});

module.exports = router;
