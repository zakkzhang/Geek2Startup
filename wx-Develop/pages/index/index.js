//index.js
//获取应用实例
var app = getApp()
var api = require('../../utils/api.js')
var nApi = new api();

Page({
  data: {
    userInfo: {},
    server: app.globalData.server,
    openid: app.globalData.openid
  },
  onShareAppMessage: function() {
    return {
      title: app.globalData.appData.name,
      desc: '分享一名极客给你看看',
      path: 'pages/index/index?userid='
    }
  },
  onLaunch: function() {
    //console.log('onLaunch')

  },
  onReady: function() {
    // 页面渲染完成
    // wx.hideNavigationBarLoading()
  },
  onShow: function() {
    //console.log('onShow')
  },
  onHide: function() {
    //console.log('onHide')
  },
  onLoad: function() {
    wx.showNavigationBarLoading()
    //console.log('onLoad')
    var that = this;

    nApi.api('api/index',function(r) {
      wx.hideNavigationBarLoading()
      that.setData({
        user: r
      })
    });

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})


































