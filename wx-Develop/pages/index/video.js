var app = getApp();
var api = require('../../utils/api.js');
const nApi = new api();


// pages/index/video.js
Page({
  data: {
    src: "",
    video: {
      name: 'name'
    }
  },
  onLoad: function(options) {

    var that = this
    that.setData({
      src: nApi.getServer() + '/apiPlus/playVideo/' + options.uid
    })

    nApi.api('apiPlus/playVideoData/' + options.uid, function(res) {
      if (res == 'error') {
        that.setData({
          video: {
            name: 'Video Page 错误'
          }
        })
      } else {
        that.setData({
          video: {
            name: res.video.name
          },
          user: {
            avatarUrl: res.userinfo.avatarUrl,
            nickName: res.userinfo.nickName,
            jobtitle: res.resume.jobtitle
          }
        })
      }
    });

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
  }
})








