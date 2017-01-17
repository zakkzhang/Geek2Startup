var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log(req.cookies);
  if (!req.cookies.isLogin) {
    res.redirect("/");
    return false;
  }
  res.render('home', {
    pageTitle: 'WeApp',
    isError: false,
    isLogin: true,
    error: 'no'
  })

});

router.get('/article/post', function(req, res) {
  res.render('post', {})
  res.end();
});

router.get('/article/manage', function(req, res) {
  res.render('manage', {})
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
  res.render('invite', {})
  res.end();
});

module.exports = router;
