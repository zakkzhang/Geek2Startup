var app = getApp();
var api = require('../../utils/api.js');
const nApi = new api();

// pages/index/newUser.js
Page({
  data: {},
  onLoad: function(options) {
    var that = this;
    app.getUserInfo(function(userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  clickGo: function() {
    nApi.getUserID(function(uid) {
      nApi.api('api/v1/Users/' + uid, "PATCH", {
        name: 'isNewUser',
        data: false
      }, function(res) {
        wx.redirectTo({
          url: '/pages/index/newUser2'
        })
      });
    })
  }
})








