//index.js
//获取应用实例
var WxParse = require('../../wxParse/wxParse.js');

var app = getApp()

Page({
  data: {
    footer: {
      isLoadMore: 'show',
      isListEnd: 'hide',
      isLoading: 'hide',
    },
    motto: '極客吐司',
    userInfo: {},
    article: ""
  },

  onLaunch: function() {
    console.log('onLaunch')
  },
  onReady: function() {
    // 页面渲染完成
    // wx.hideNavigationBarLoading()
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

    var util = require('../../utils/api.js');
    var that = this;

    wx.request({
      url: 'https://app.geek2startup.com/json/index.json',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          article: res.data.article
        })
      },
      fail: function() {
        console.log("fail");
        var util = require('../../utils/util.js')
        util.showError("fail");
      },
      complete: function() {
        console.log("complete");
        wx.hideNavigationBarLoading()
      }
    })

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  loadMore: function(e) {

    var that = this
    that.setData({
      footer: {
        isLoadMore: 'hide',
        isListEnd: 'hide',
        isLoading: 'show'
      },
    });

    wx.request({
      url: 'https://app.geek2startup.com/json/index2.json',
      data: {
        x: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {

        that.setData({
          article: res.data.article,
          footer: {
            isLoadMore: 'hide',
            isListEnd: 'show',
            isLoading: 'hide'
          },
        });

        if (res.data.isEnd) {
          that.setData({
            footer: {
              isLoadMore: 'hide',
              isListEnd: 'show',
              isLoading: 'hide'
            },
          })
        };
      },
      fail: function() {
        console.log("fail");
        var util = require('../../utils/util.js')
        util.showError("fail");
      }
    })

  }
})
