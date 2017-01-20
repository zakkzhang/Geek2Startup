var qr = require('qr-image');
var m = require('./api.js');

module.exports = {
  uuid: 0,
  server: "http://192.168.1.155:7000",
  qrurl: function (socketid) {
    var codes = this.server + "/qr/login/" + this.uuid + '/' + socketid;
    return codes;
  },
  qrimg: function (socketid) {
    if (socketid == undefined) {
      socketid = 0;
    }
    var img = qr.image(this.qrurl(socketid));
    return img;
    // res.writeHead(200, {'Content-Type': 'image/png'});
    // img.pipe(we.buildQRIMG());
  },
  wx_create: function (data) {

    var openid = data.openid
    m.mo_wxData.findOne({
      openid: openid
    }, function (err, doc) {
      if (err) throw err;

      if (doc == null) {
        var newWX = new m.mo_wxData(data);
        newWX.save(function (err) {
          if (err) throw err;
          console.log('libs.js: openid created!');
        });
      }
      // 當存在不保存
      console.log('libs.js: openid exist!');
    })

  },
  isInviteCode: function (invCode, cb_null, cb_exist) {
    m.mo_geekInvite.findOne({
      inviteCode: invCode
    }, function (err, doc) {
      if (err) throw err;

      if (doc == null) {
        (cb_null && typeof (cb_null) === "function") && cb_null(doc);
      } else {

        if (!doc.isUsered) {
          m.mo_geekInvite.findByIdAndUpdate(doc._id, {
            isUsered: true
          }, function (e, d) {
            if (e) throw e;
            (cb_exist && typeof (cb_exist) === "function") &&
            cb_exist(doc);
          })
        } else {
          (cb_null && typeof (cb_null) === "function") && cb_null(doc);
        }


      }
    })
  }
}
