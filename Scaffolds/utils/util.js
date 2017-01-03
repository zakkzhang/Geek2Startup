function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function showError(text) {
  var that = this;
  var insertData = '<div style="color:red;text-align:center;padding:20px;">' + text + '</div>';
  WxParse.wxParse('insertData', 'html', insertData, that);
}

function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}

module.exports = {
  formatTime: formatTime,
  showError: showError,
  isEmptyObject: isEmptyObject
}
