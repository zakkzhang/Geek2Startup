//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    appData: app.globalData.appData,
    setting: [{
      "title": "推送",
      "isTitle": true
    }, {
      "name": "接受微信通知",
      "icon": "",
      "isSwitch": true,
      "isTitle": false
    },{
      "title": "隐私",
      "isTitle": true
    }, {
      "name": "申请微信联络信息自动接受",
      "icon": "",
      "isSwitch": true,
      "isTitle": false
    }, {
      "name": "在网络中可见",
      "icon": "",
      "isSwitch": true,
      "isTitle": false
    }, {
      "title": "功能",
      "isTitle": true
    }, {
      "name": "申请邀请码",
      "to": "/pages/set/apply",
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
  }
})








































