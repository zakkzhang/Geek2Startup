var app = getApp()
var api = require('../../utils/api.js')
var nApi = new api();

Page({
  data: {
    uiText: {
      mainButton: '启动摄像头',
      tips: '请使用电脑访问 .../qr '
    },
    apiServer: ''
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.reFresh();

    var that = this;
    that.setData({
      uiText: {
        mainButton: '启动摄像头',
        tips: '请使用电脑访问 ' + nApi.getServer() + '/qr '
      },
      apiServer: nApi.getServer()
    })

  },
  onSync: function(url) {
    wx.showNavigationBarLoading()
    var that = this;

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })

    // "http://192.168.1.155:7000/qr/login/ab83a271-f15f-4c61-aae8-6b7a12585697/HBL1Ro5Q1c2Y-DVhAAAC"
    var postData = {
      date: new Date()
    }
    nApi.api(url, postData, "POST", function(res) {
      console.log(res);

      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })

      setTimeout(function() {
        wx.hideToast()
      }, 2000)

      if (res.return) {
        wx.switchTab({
          url: '/pages/index/index'
        })
      };
    })

  },
  onCamera: function() {
    var that = this;
    wx.scanCode({
      success: (res) => {
        that.onSync(res.result);
      }
    })
  },
  onLogin: function() {
    nApi.changeOpenid();
  },
  onClean: function() {
    wx.showActionSheet({
      itemList: ['刪除數據'],
      itemColor: '#FA174C',
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          wx.clearStorage();
        };
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  reFresh: function() {
    var that = this;
    nApi.getOpenID(function(openid) {
      that.setData({
        qr_return: openid
      })
    }, function() {
      that.setData({
        qr_return: "fail"
      })
    })
  }
})






