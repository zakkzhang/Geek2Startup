var app = getApp();
var api = require('../../utils/api.js');
const nApi = new api();

// pages/index/newUser.js
Page({
  data: {},
  onLoad: function(options) {
    var that = this;
    //getUserData
    app.getUserInfo(function(userInfo) {
      //更新数据
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
  }
})


