var api = require('/utils/api.js')
const nApi = new api();

App({
  onLaunch: function() {
    var that = this;
    // 用 openid 交換 userid
    nApi.changeOpenid(function(oid) {
      nApi.api('api/v1/Users?query={"openid":"' + nApi.openid + '"}', function(res) {

        if (res.length != 0) {
          nApi.setUserID(res[0]._id);
        } else {

          wx.clearStorage();

          // 找不到對應 openid, 提交用戶數據
          that.getUserInfo(function(res) {
            console.log("onLaunch - 新用戶，交換 openid:", res.nickName);
          });
        }

      })
    });

  },
  getUserID: function(cb, fail) {

    var id = nApi.userid;
    if (id == 0) {
      nApi.getUserID(cb, fail);
    } else {
      this.userID = nApi.userid;
      typeof cb == "function" && cb(nApi.userid);
    }

  },
  postUserinfo: function(userData) {
    var that = this;
    var updateData = {
      name: 'userinfo',
      data: userData
    }
    var inviteData = {
      name: 'inviteCode',
      data: 0
    }
    var uid = 0;

    if (nApi.userid == 0) {
      // 找不到用戶，新建用戶，使用默認邀請碼 0
      nApi.api('api/v1/Users/', 'POST', inviteData, function(res) {
        uid = res._id;
        nApi.api('api/v1/Users/' + res._id, 'PATCH', updateData, function(res) {
          nApi.setUserID(uid);
        });
      });
    } else {
      nApi.api('api/v1/Users/' + nApi.userid, 'PATCH', updateData);
    }
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              that.postUserinfo(res.userInfo);
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userID: null,
    userInfo: null,
    openid: null,
    server: null,
    appData: {
      "name": "极客吐司+",
      "version": "0.5",
    }
  }
})


