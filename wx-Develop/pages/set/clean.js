var app = getApp()
var api = require('../../utils/api.js')
var nApi = new api();

Page({
  data: {},
  onLoad: function(options) {
    wx.showNavigationBarLoading()
    wx.clearStorage();

  },
  onReady: function() {
    var that = this;

    // 页面渲染完成
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        console.log(res.data)
      }
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




