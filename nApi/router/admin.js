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

  res.render('user/qrLogin', {
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

router.post('/qr/login/:uuid/:io', function(req, res) {
  console.log("Post:", req.body);
  console.log("UUID:", req.params.uuid);
  console.log("IO:", req.params.io);

  var returnCode = 0;
  var io = res.io;

  if (io.sockets.sockets[req.params.io] == undefined) {
    console.log("Socket not connected");
    returnCode = 2;
  } else {
    if (typeof req.body.openid == "undefined") {
      returnCode = 1
    } else {
      returnCode = 0
    }
  }



  switch (returnCode) {
    case 0:
      res.io.sockets.in(req.params.io).emit('Scan', {
        url: "/user/",
        openid: req.body.openid
      });
      res.json({
        UUID: req.params.uuid,
        IO: req.params.io,
        openid: req.body.openid,
        return: "done"
      })
      break;
    case 1:
      res.json({
        retuan: "error",
        message: "no openid"
      })
      break;
    case 2:
      res.json({
        retuan: "error",
        message: 'user not online'
      })
      break;
    default:
      res.json({
        retuan: "error",
        message: '???'
      })

  }

});

router.get('/image/qr/:io', function(req, res) {
  var img = we.qrimg(req.params.io);
  res.writeHead(200, {
    'Content-Type': 'image/png'
  });
  img.pipe(res);
});

module.exports = router;
