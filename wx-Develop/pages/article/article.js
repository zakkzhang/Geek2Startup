var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    text: "Page article"
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.showNavigationBarLoading()
    console.log(options);

    var that = this;
    var link = options.id;

    // link = 2650098493

    wx.request({
      url: 'https://app.geek2startup.com/json/' + link + '.json', //仅为示例，并非真实的接口地址
      data: {
        id: link
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log("success");
        console.log(res.data)

        that.setData({
          title: res.data.title,
          text: res.data.text
        })

        if (res.data.ashtml) {
          //以 HTML 渲染
        } else {
          //以 wx-view 渲染
        }

        WxParse.wxParse('article', 'html', res.data.text, that);
      },
      fail: function() {
        console.log("fail");
      },
      complete: function() {
        console.log("complete");
      }
    })

  },
  onReady: function() {
    // 页面渲染完成
    wx.hideNavigationBarLoading();
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
