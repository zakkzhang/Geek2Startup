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
  onReady: function(needRefresh) {

    this.onPullDownRefresh();

  },
  onShow: function() {
    //console.log('onShow')
  },
  onHide: function() {
    //console.log('onHide')
  },
  onPullDownRefresh: function() {

    wx.showNavigationBarLoading()
    var that = this;
    var showArticle = 'link';
    app.getUserID(function(uid) {
      console.log("nApi uid ...", uid);
      if (uid != 0) {
        nApi.api('api/v1/Users/' + uid, function(res) {

          console.log("res.isNewUser", res.isNewUser);

          wx.hideNavigationBarLoading();

          if (res.isNewUser == false) {
            console.log("nApi index ...");

            wx.stopPullDownRefresh();

            if (!res.resume.isShowArticle) {
              showArticle = 'none'
            };

            that.setData({
              api: res,
              body: [{
                "uid": res._id,
                "display": "video",
                "icon": "ti-video-camera",
                "type": "视频介绍",
                "name": res.video.name,
                "time": res.video.duration
              }, {
                "display": "text",
                "icon": "ti-id-badge",
                "id": res._id,
                "name": res.resume.jobtitle,
                "type": "个人介绍",
                "text": res.resume.introduce
              }],
              more: [{
                "display": showArticle,
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
    }, function() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    })



  },
  onLoad: function() {
    var that = this;
    //getUserData
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})






















