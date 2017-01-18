// pages/set/debug.js
Page({
  data: {},
  onLoad: function(options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {

        wx.getNetworkType({
          success: function(resNet) {

            wx.request({
              url: 'https://app.geek2startup.com',
              success: function(resReq) {
                that.setData({
                  debug: [{
                    name: "request api " + resReq.statusCode,
                    val: resReq.data
                  }, {
                    name: "networkType",
                    val: resNet.networkType
                  }, {
                    name: "model",
                    val: res.model
                  }, {
                    name: "pixelRatio",
                    val: res.pixelRatio,
                  }, {
                    name: "language",
                    val: res.language,
                  }, {
                    name: "version",
                    val: res.version,
                  }, {
                    name: "platform",
                    val: res.platform,
                  }]
                })
              }
            })



          }
        })


      }
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
  }
})








