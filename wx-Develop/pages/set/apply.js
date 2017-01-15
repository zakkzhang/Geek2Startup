var app = getApp()
var api = require('../../utils/api.js')
var nApi = new api();

Page({
  data: {},
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    var that = this;
    // 页面渲染完成
    app.getUserInfo(function(userInfo) {
      nApi.api("w/userInfo", userInfo, function() {
        wx.hideNavigationBarLoading();
      });
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})






