$(document).ready(function () {

  $('.ui.dropdown')
    .dropdown();

  $('#openMenu').click(function () {
    $('.ui.sidebar').sidebar('toggle');
  })

  $('.ui.checkbox')
    .checkbox();

  $('.autumn')
    .transition('fade up')
    // this is now fade up in
    .transition('fade up')

  if (isID('QR')) {
    console.log("socket.io on run");
    var socket = io('//app.geek2startup.com');

    time = 0;

    // 連線成功，獲得 ID
    socket.on('new user', function (data) {
      time = time + 1;
      console.log(data);
      $('#socketid').text(data);

      if (time == 1) {
        s = data;
        i = $('#QRImage');
        q = i.attr('qr');
        i.attr('src', q + s);
        console.log(q + s);
      }

      setTimeout(function () {
        $('#Loader').removeClass('active');
      }, 500)

    });

    // 心跳維護
    socket.on('bieber tweet', function (data) {
      $('#tweet').text(data);
    });

    // 獲得跳轉要求
    socket.on('Scan', function (data) {
      console.log("go:", data);
      Cookies.set('openid', data.openid);
      window.location.assign(data.url);
    });
  }

});

function isID(id) {
  return document.getElementById(id);
}
