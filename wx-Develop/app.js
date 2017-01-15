var api = require('/utils/api.js')
var nApi = new api();

App({
  onLaunch: function() {
    var that = this
    nApi.login();
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    openid: null,
    server: null,
    appData: {
      "name": "极客吐司+",
      "version": "0.5",
    }
  }
})


