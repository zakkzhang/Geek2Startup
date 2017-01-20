var express = require('express');
var router = express.Router();
var we = require('./../models/libs.js');
var request = require('request');

router.use(function(req, res, next) {
  console.log("");
  console.log("> router: /wx/ ...");
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

// 交換 open id
router.get('/openid', function(req, res, next) {

  var code = req.query.code;
  console.log(code);

  var wx_options = {
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    qs: {
      appid: 'wxe5bf4449fd5eb13f',
      secret: 'b0be50703ebdbb43e91f177c1c2f3559',
      js_code: code,
      grant_type: 'authorization_code'
    }
  };

  // 與微信服務器通信
  request.get(wx_options, function(error, response, body) {
    if (error) {
      console.log(error);
      return;
    }
    if (!error && response.statusCode == 200) {
      // 保存信息到數據庫
      var wx_data = JSON.parse(body);
      we.wx_create(wx_data);

      res.json(wx_data.openid);
    }
  });

});
module.exports = router;
