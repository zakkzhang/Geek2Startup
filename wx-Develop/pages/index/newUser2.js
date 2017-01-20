var app = getApp();
var api = require('../../utils/api.js');
const nApi = new api();

// pages/index/newUser2.js
Page({
  data: {
    userInfo: {},
    inviteCode: "",
    disabled: null,
    buttonText: '开始吐司'
  },
  onLoad: function(options) {
    var that = this;
    app.getUserInfo(function(userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })

    nApi.getUserID(function(uid) {
      nApi.api('api/v1/Users/' + uid, "GET", function(res) {

        if (res.inviteCode != 0) {
          that.setData({
            inviteCode: res.inviteCode,
            disabled: "disabled",
            buttonText: '邀请码已启用'
          })
        };


      })
    })

  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  formSubmit: function(e) {
    var t = null;
    var pass = false;
    nApi.getUserID(function(uid) {
      nApi.api('apiPlus/inviteCode/' + uid, "POST", {
        name: 'inviteCode',
        data: e.detail.value.code
      }, function(res) {
        console.log(res);

        switch (res.return) {
          case "inviteCode OK":
            t = '邀请码正常，已启用';
            pass = true;
            break;
          case "inviteCode not true":
            t = '你的邀请码有误，请查正';
            pass = false;
            break;
          case "no code":
            t = '以无邀请码模式进入';
            pass = true;
            break;
        }

        wx.showToast({
          title: t,
          icon: 'loading',
          duration: 10000
        })

        setTimeout(function() {
          wx.hideToast()

          if (pass) {
            wx.switchTab({
              url: '/pages/index/index'
            })
          };

        }, 2000)



      });
    })
  }
})




