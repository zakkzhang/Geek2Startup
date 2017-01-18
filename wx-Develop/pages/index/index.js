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
    console.log("index onLoad ...");
    var that = this;

    app.getUserID(function(uid) {
      console.log("nApi uid ...", uid);
      if (uid != 0) {
        nApi.api('api/v1/Users/' + uid, function(res) {

          wx.hideNavigationBarLoading()

          console.log("nApi index ...");

          if (typeof res.resume != "undefined") {
            that.setData({
              isNew: false,
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
          } else {

            console.log("newUser Mode");

            wx.navigateTo({
              url: '/pages/index/newUser'
            })

          }


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




