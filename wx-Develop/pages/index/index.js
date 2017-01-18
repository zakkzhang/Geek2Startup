//index.js
//获取应用实例
var app = getApp()
var api = require('../../utils/api.js')
var nApi = new api();

Page({
  data: {
    userInfo: {},
    api: {}
  },
  onShareAppMessage: function() {
    return {
      title: app.globalData.appData.name,
      desc: '分享一名极客给你看看',
      path: 'pages/index/profile?userid='
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

    app.getUserID(function(uid) {
      if (uid != 0) {
        nApi.api('api/v1/Users/' + uid, function(res) {
          wx.hideNavigationBarLoading()
          that.setData({
            api: res,
            body: [{
              "address": "https://app.geek2startup.com/json/demo.mp4",
              "display": "video",
              "icon": "ti-video-camera",
              "type": "视频介绍",
              "name": "视频",
              "time": "0:40"
            }, {
              "display": "text",
              "icon": "ti-id-badge",
              "id": res._id,
              "name": res.resume.jobtitle,
              "type": "个人介绍",
              "text": res.resume.introduce
            }],
            more: [{
              "display": "link",
              "icon": "ti-layout-media-right",
              "id": res._id,
              "name": res.resume.articleTitle,
              "text": res.resume.article,
              "type": "自选文章"
            }]
          })
        });
      };
    })

    //getUserData
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})




