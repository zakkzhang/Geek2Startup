var app = getApp()

Page({
  data: {
    text: "Page apply",
    date: "2016-09-01",
    time: "12:01",
    userInfo: {},
    isAgree: false
  },
  onLoad: function(options) {
    wx.showNavigationBarLoading()
    // 页面初始化 options为页面跳转所带来的参数

    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      that.setData({
        userInfo: userInfo
      })
    });

  },
  onReady: function() {
    wx.hideNavigationBarLoading()
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
  }
})




















