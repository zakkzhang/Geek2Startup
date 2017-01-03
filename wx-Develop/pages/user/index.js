//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '極客吐司',
    userInfo: {},
    head: {
      user_name: "≧▽≦",
      user_desc: "簽名"
    },
    setting: [{
      "name": "編輯資料",
      "to": "/pages/user_edit/user_edit",
      "icon": ""
    }, {
      "name": "申请 Geek 认证",
      "to": "/pages/apply/apply",
      "icon": ""
    }, {
      "name": "user_page",
      "to": "/pages/user_page/user_page",
      "icon": ""
    }, {
      "name": "empty",
      "to": "/pages/article/article",
      "icon": ""
    }, {
      "name": "video",
      "to": "/pages/video/video",
      "icon": ""
    }, {
      "name": "关于 Geek2Startup",
      "to": "/pages/about/about",
      "icon": ""
    }]
  },
  onLaunch: function() {
    console.log('onLaunch')
  },
  onReady: function() {
    // 页面渲染完成
    wx.hideNavigationBarLoading()
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

    var that = this
      //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {

      that.setData({
        head: {
          user_name: userInfo.nickName,
          user_avatar: userInfo.avatarUrl,
          user_desc: '职称、称呼',
          user_avatar_mode: 'aspectFill'
        }
      })
    })
  }
})
