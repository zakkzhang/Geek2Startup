var qr = require('qr-image');

module.exports = {
  uuid: 0,
  server: "http://192.168.1.155:7000",
  qrurl: function(socketid) {
    var codes = this.server + "/qr/login/" + this.uuid + "/" + socketid;
    return codes;
  },
  qrimg: function(socketid) {
    if (socketid == undefined) {
      socketid = 0;
    }
    var img = qr.image(this.qrurl(socketid));
    return img;
    // res.writeHead(200, {'Content-Type': 'image/png'});
    // img.pipe(we.buildQRIMG());
  }
}
