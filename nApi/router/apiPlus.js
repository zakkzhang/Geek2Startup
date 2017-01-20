var express = require('express');
var router = express.Router();
var fs = require("fs");
var request = require('request');
var multer = require('multer');
var upload = multer({
  dest: 'public/uploads/'
})
var we = require('./../models/libs.js');
var m = require('./../models/api.js');

router.use(function (req, res, next) {
  console.log("");
  console.log("> router: /apiPlus/ ...");
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

// 處理 app 邀請碼
router.post('/inviteCode/:uid', function (req, res, next) {

  if (req.body.inviteCode == '') {
    // 沒有邀請碼的處理方案

    m.mo_Users.findByIdAndUpdate(req.params.uid, {
      inviteCode: 0
    }, function (err, user) {
      if (err) {
        res.statusCode = 400;
        return res.send('error');
      }
      res.json({
        return: 'no code'
      })
    });

  } else {
    // 填寫了邀請碼，判斷邀請碼是否存在
    we.isInviteCode(req.body.inviteCode, function (c) {
      res.json({
        return: 'inviteCode not true'
      })
    }, function (c) {

      // 邀請碼存在
      m.mo_Users.findByIdAndUpdate(req.params.uid, {
        inviteCode: req.body.inviteCode
      }, function (err, user) {
        if (err) {
          res.statusCode = 400;
          return res.send('error');
        }
        res.json({
          return: 'inviteCode OK'
        })
      });
    })
  }

});


// 上傳視頻
router.post('/uploadVideo/:uid', upload.single('file'), function (req, res,
  next) {

  console.log("req.file", req.file);
  console.log("req.body", req.body);

  m.mo_Users.findByIdAndUpdate(req.params.uid, {
    video: {
      name: req.body.name,
      duration: req.body.duration,
      file: {
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
      }
    }
  }, function (err, user) {
    if (err) {
      res.statusCode = 400;
      return res.send('error');
    }
    res.json({
      return: 'done'
    })
  });

})


// 读取视频
router.get('/playVideo/:uid', function (req, res, next) {

  m.mo_Users.findById(req.params.uid, function (err, doc) {
    if (err) {
      res.statusCode = 400;
      return res.send('error');
    }
    // console.log(doc);

    var file = doc.video.file.path;
    fs.stat(file, function (err, stats) {
      if (err) {
        res.end(err);
      }
      var range = req.headers.range;
      if (!range) {
        // 416 Wrong range
        return res.sendStatus(416);
      }
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total -
        1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" +
          total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": doc.video.file.mimetype
      });

      var stream = fs.createReadStream(file, {
          start: start,
          end: end
        })
        .on("open", function () {
          stream.pipe(res);
        }).on("error", function (err) {
          res.end(err);
        });
    });

    // END DB
  })

  // END Router
})

router.get('/playVideoData/:uid', function (req, res, next) {

  m.mo_Users.findById(req.params.uid, function (err, doc) {
    if (err) {
      res.statusCode = 400;
      return res.send('error');
    } else {
      res.json(doc);
    }

  })

})

module.exports = router;
