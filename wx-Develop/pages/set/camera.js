var app = getApp()
var api = require('../../utils/api.js')
var nApi = new api();
// pages/set/camera.js
Page({
  data: {
    qr_return: "not now"
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.reFresh();
  },
  onReady: function() {

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
  onSync: function(url) {
    wx.showNavigationBarLoading()
    var that = this;

  },
  onCamera: function() {
    var that = this;
    wx.scanCode({
      success: (res) => {
        console.log(res);
        that.onSync(res.result);
      }
    })
  },
  onLogin: function() {
    nApi.login();
    this.reFresh();
  },
  onClean: function() {
    wx.showActionSheet({
      itemList: ['刪除數據'],
      itemColor: '#FA174C',
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          wx.clearStorage();
        };
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })

  },
  reFresh: function() {
    var that = this;
    nApi.getOpenid(function(o) {
      that.setData({
        qr_return: o
      })
    }, function() {
      that.setData({
        qr_return: 'fail'
      })
    });
  }
})


























