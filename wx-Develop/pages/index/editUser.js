var app = getApp();
var api = require('../../utils/api.js');
const nApi = new api();

Page({
  data: {
    userInfo: {},
    api: {
      jobtitle: "职业头衔",
      aword: "一句话介绍"
    },
    form: [{
      title: "职业头衔",
      p: "网页设计师、信息架构师、企业家和投资人……",
      place: "职业头衔",
      name: "jobtitle",
      icon: "",
      type: "input"
    }, {
      title: "一句话介绍",
      p: "我是一名……",
      name: "aword",
      place: "最多 28 個字",
      icon: "",
      type: "input"
    }, {
      title: "自我介绍",
      p: "我有 5 年的相关工作经验。先后任职于 XXX 公司、XXX 公司。在职期间 ……",
      place: "最多 120 個字",
      name: "introduce",
      icon: "ti-id-badge",
      type: "textarea"
    }, {
      title: "自选文章",
      p: "自选文章的标题",
      place: "自选文章 - 标题",
      name: "articleTitle",
      icon: "",
      type: "input"
    }, {
      title: "自选文章",
      p: "可使用 Markdown 格式，不支持插入圖片",
      place: "Markdown Formats",
      name: "article",
      icon: "ti-layout-media-right",
      type: "textarea-auto-height"
    }]
  },
  onLoad: function(options) {
    var that = this;



    app.getUserID(function(uid) {
      console.log("onLoad: " + uid);
      if (uid != 0) {
        nApi.api('api/v1/Users/' + uid + '/', 'GET', function(res) {

          if (res.resume != undefined) {
            that.setData({
              api: {
                jobtitle: res.resume.jobtitle,
                aword: res.resume.aword
              },
              form: [{
                title: "职业头衔",
                p: "网页设计师、信息架构师、企业家和投资人……",
                place: res.resume.jobtitle,
                value: res.resume.jobtitle,
                name: "jobtitle",
                icon: "",
                type: "input"
              }, {
                title: "一句话介绍",
                p: "我是一名……",
                place: res.resume.aword,
                value: res.resume.aword,
                name: "aword",
                icon: "",
                type: "input"
              }, {
                title: "自我介绍",
                p: "我有 5 年的相关工作经验。先后任职于 XXX 公司、XXX 公司。在职期间 ……",
                place: res.resume.introduce,
                value: res.resume.introduce,
                name: "introduce",
                icon: "ti-id-badge",
                type: "textarea"
              }, {
                title: "文章标题",
                p: "自选文章的标题",
                place: res.resume.articleTitle,
                value: res.resume.articleTitle,
                name: "articleTitle",
                icon: "",
                type: "input"
              }, {
                title: "自选文章",
                p: "可使用 Markdown 格式，不支持插入圖片",
                place: res.resume.article,
                value: res.resume.jobtitle,
                name: "article",
                icon: "ti-layout-media-right",
                type: "textarea-auto-height"
              }]
            })
          };

        })
      };
    })



    //getUserData
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
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
    wx.showNavigationBarLoading()

    wx.showToast({
      title: '提交中',
      icon: 'loading',
      duration: 10000
    })

    console.log('Form Post:');
    console.log(e.detail.value);

    app.getUserID(function(uid) {
      console.log("onLoad: " + uid);
      if (uid != 0) {
        nApi.api('api/v1/Users/' + uid + '/', 'GET', function(res) {

          var updateData = {
            name: "resume",
            data: e.detail.value
          }

          console.log("resume debug", updateData);

          nApi.api('api/v1/Users/' + uid, "PATCH", updateData, function(res) {

            wx.hideNavigationBarLoading()

            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })

            setTimeout(function() {
              wx.hideToast()
            }, 2000)
          })

        })
      };
    }, fail)


    var fail = function() {

      wx.showToast({
        title: '提交失敗',
        icon: 'warn',
        duration: 1500
      })

      setTimeout(function() {
        wx.hideToast()
      }, 2000)

      wx.hideNavigationBarLoading()
    }

  }
})


















