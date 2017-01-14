//index.js
//获取应用实例
var WxParse = require('../../wxParse/wxParse.js');

var app = getApp()

Page({
  data: {
    userInfo: {},
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.appData.name,
      desc: '分享一名极客给你看看',
      path: 'pages/index/index?userid='
    }
  },
  onLaunch: function() {
    console.log('onLaunch')
  },
  onReady: function() {
    // 页面渲染完成
    // wx.hideNavigationBarLoading()
  },
  onShow: function() {
    console.log('onShow')
  },
  onHide: function() {
    console.log('onHide')
  },
  onLoad: function() {
    wx.showNavigationBarLoading()
    console.log('onLoad')
    var that = this;

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})










