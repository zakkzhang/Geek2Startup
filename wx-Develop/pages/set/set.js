//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    appData: app.globalData.appData,
    setting: [{
      "title": "功能",
      "isTitle": true
    }, {
      "name": "欢迎页面",
      "to": "/pages/index/newUser",
      "icon": "",
      "isSwitch": false,
      "isTitle": false
    }, {
      "name": "填写邀请码",
      "to": "/pages/index/newUser2",
      "icon": "",
      "isSwitch": false,
      "isTitle": false
    }, {
      "name": "扫描二维码",
      "to": "/pages/set/camera",
      "icon": "",
      "isSwitch": false,
      "isTitle": false
    }, {
      "name": "清理本地数据",
      "to": "/pages/set/clean",
      "icon": "",
      "isSwitch": false,
      "isTitle": false
    },{
      "name": "关于 " + app.globalData.appData.name,
      "to": "/pages/set/about",
      "icon": "",
      "isSwitch": false,
      "isTitle": false
    }]
  },
  onLaunch: function() {
    //console.log('onLaunch')
  },
  onReady: function() {
    // 页面渲染完成
    wx.hideNavigationBarLoading()
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
  },
  onSwitch: function() {

  }
})


















































