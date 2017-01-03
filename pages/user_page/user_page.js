var util = require('../../utils/util.js')

Page({
  data:{
    text: "Page user_page",
    head: {
      user_name: "≧▽≦",
      user_desc: "载入中",
      user_avatar_mode: "aspectFill",
    }
  },
  onShareAppMessage: function () {
    return {
      title: '极客吐司',
      desc: '分享一名极客给你看看',
      path: 'pages/user_page/user_page?userid='
    }
  },
  onLoad:function(options){
    wx.showNavigationBarLoading()
    var that = this

    console.log(this.data);

    if (!util.isEmptyObject(options)) {
      var user = options.user
    }

    wx.request({
      url: 'https://app.geek2startup.com/json/user.json', //仅为示例，并非真实的接口地址
      data: {
         x: ''
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log("success")
        console.log(res.data);

        that.setData({
          head: res.data.head,
          body: res.data.body
        })
      },
      fail: function() {
        console.log("fail");
      },
      complete: function() {
        console.log("complete");
      }
    })

  },
  onReady:function(){
    // 页面渲染完成
    wx.hideNavigationBarLoading()
  },
  onShow:function(){
    // 页面显示

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  ellips:function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    var type = e.currentTarget.dataset.type
    console.log(type);
    if (type == "photo") {
      wx.previewImage({
        current: that.data.photo_src,
        urls: that.data.body[0].photos
      })
    };
    if (type == "text") {
      wx.navigateTo({
        url: '/pages/article/article?id='+that.data.link
      })
    }
  },
  clickPhoto: function(e){
    var src = e.currentTarget.dataset.src
    console.log(src);
    var that = this;
    that.setData({
      photo_src: src
    })
  },
  clickText: function(e) {
    var l = e.currentTarget.dataset.link
    console.log(l);
    var that = this;
    that.setData({
      link: l
    })
  }
})
