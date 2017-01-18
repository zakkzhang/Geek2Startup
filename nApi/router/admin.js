var express = require('express');
var router = express.Router();
var we = require('./../models/libs.js');

var isLoginfn = function(req, res) {
  console.log("req.cookies", req.cookies);
}

router.get('/', function(req, res) {
  isLoginfn(req, res);
  res.render('index', {
    pageTitle: 'WeApp'
  })
  res.end();
});

router.get('/login', function(req, res) {
  res.render('index', {
    pageTitle: 'WeApp',
    error: 'Login Form'
  })
  res.end();
});

router.post('/login', function(req, res, next) {
  var isLogin = false;
  if (req.body.name == "admin") {
    if (req.body.password == "q") {
      console.log(req.body);
      isLogin = true;
      res.cookie('isLogin', true, {
        maxAge: 6 * 6 * 1000
      });
      console.log(req.cookies);
      isLoginfn(req, res);
    }
  }
  res.render('index', {
    pageTitle: 'WeApp',
    isError: true,
    isLogin: isLogin,
    error: 'no'
  })
});

router.get('/logout', function(req, res) {
  res.render('empty', {})
  res.end();
});

// qr pages
router.get('/qr', function(req, res) {
  console.log("req.cookies:", req.cookies);

  var io = res.io;
  var sid;

  io.on("connection", function(socket) {
    sid = socket.id;
    io.emit('new user', socket.id);
    var tweets = setInterval(function() {
      socket.volatile.emit('bieber tweet', tweets._idleStart);
    }, 1500);

    socket.on('disconnect', function() {
      clearInterval(tweets);
    });
  })

  res.render('qr', {
    url: we.qrurl() + '/',
    qr: '/image/qr/'
  })
  res.end();
});

router.get('/qr/login/:uuid/:io', function(req, res) {
  res.io.sockets.in(req.params.io).emit('url', "/user/");
  console.log("UUID:", req.params.uuid);
  console.log("IO:", req.params.io);
  res.send({
    "UUID": req.params.uuid,
    "IO": req.params.io
  })
  res.end();
});

router.get('/image/qr/:io', function(req, res) {
  var img = we.qrimg(req.params.io);
  res.writeHead(200, {
    'Content-Type': 'image/png'
  });
  img.pipe(res);
});

module.exports = router;
