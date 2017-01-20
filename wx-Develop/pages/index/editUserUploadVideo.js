var app = getApp();
var api = require('../../utils/api.js');
const nApi = new api();


// pages/index/editUserUploadVideo.js
Page({
  data: {
    src: "",
    video: {
      duration: '0:00'
    },
    uiText: {
      tips: "我的天啊，你还没有一个简历视频",
      mainButton: '上传一个简历视频'
    },
    uiClass: {
      empty: "show",
      emptyControl: "show",
      video: "hidden",
      done: "hidden",
    }
  },
  onLoad: function(options) {

    var that = this;

    nApi.getUserID(function(uid) {
      nApi.api('apiPlus/playVideoData/' + uid, function(res) {
        if (res.video.file.path == '') {
          // 未上傳
        } else {
          // 已經上傳視頻

          that.setData({
            uiText: {
              tips: "介绍视频已存在，重新上传吗？",
              mainButton: '重新上传'
            },
            uiClass: {
              empty: "show",
              emptyControl: "show",
              video: "hidden",
              done: "show",
            }
          })

        }
      })
    })


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
  clickGo: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function(res) {

        wx.setStorage({
          key: "tempFilePath",
          data: res.tempFilePath,
          success: function() {
            that.setData({
              src: res.tempFilePath,
              video: res,
              uiClass: {
                emptyControl: "hidden",
                empty: "hidden",
                video: "show",
                done: "hidden"
              }
            })
          }
        })


      }
    })
  },
  playNow: function() {
    nApi.getUserID(function(uid) {
      wx.redirectTo({
        url: '/pages/index/video?uid=' + uid
      })
    })
  },
  needHelp: function() {
    nApi.getUserID(function(uid) {
      wx.redirectTo({
        url: '/pages/index/video?uid=' + uid
      })
    })
  },
  clickSave: function(e) {
    var that = this

    wx.showToast({
      title: '上传中',
      icon: 'loading',
      duration: 10000
    })

    console.log('form：', e.detail.value)

    // console.log("app.globalData.src", app.globalData.src);

    wx.getStorage({
      key: 'tempFilePath',
      success: function(res) {
        console.log(res.data)

        nApi.getUserID(function(uid) {
          wx.uploadFile({
            url: 'http://192.168.1.155:7000/apiPlus/uploadVideo/' + uid,
            filePath: res.data,
            name: 'file',
            formData: {
              'name': e.detail.value.videoName,
              'duration': e.detail.value.duration,
            },
            success: function(res) {
              console.log("wx.uploadFile", res);

              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })

              setTimeout(function() {
                wx.hideToast()

                that.setData({
                  uiText: "你太帅了",
                  uiClass: {
                    emptyControl: "hidden",
                    empty: "show",
                    video: "hidden",
                    done: "show",
                  }
                })

              }, 2000)

            },
            fail: function(res) {

              wx.showToast({
                title: res.errMsg,
                icon: 'loading',
                duration: 10000
              })

              setTimeout(function() {
                wx.hideToast()
              }, 2000)

              console.log("wx.uploadFile Fail", res);
            }
          })
        })

      }
    })


  },
  clickRedo: function() {
    var that = this
    that.setData({
      src: "",
      uiClass: {
        emptyControl: "show",
        empty: "show",
        video: "hidden",
        done: "hidden",
      }
    })
  }
})








