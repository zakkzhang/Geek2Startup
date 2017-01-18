//index.js
//获取应用实例
var app = getApp()
var api = require('../../utils/api.js')
var nApi = new api();

Page({
  data: {
    userInfo: {}
  },
  onShareAppMessage: function() {
    return {
      title: app.globalData.appData.name,
      desc: '分享一名极客给你看看',
      path: 'pages/index/index?userid=' + app.globalData.userID
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})




