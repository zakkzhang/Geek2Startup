var app = getApp();
var api = require('../../utils/api.js');
const nApi = new api();

// pages/index/newUser.js
Page({
  data: {},
  onLoad: function(options) {
    var that = this;
    app.getUserInfo(function(userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },
  clickGo: function() {
    wx.showNavigationBarLoading()

    nApi.getUserID(function(uid) {
      console.log("newUser:", uid);

      var patchData = {
        name: 'isNewUser',
        data: false
      };

      nApi.api('api/v1/Users/' + uid, "PUT", patchData, function(res) {
        wx.redirectTo({
          url: '/pages/index/newUser2'
        })
        wx.hideNavigationBarLoading();

      });
    })
  }
})




