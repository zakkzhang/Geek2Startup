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
          // 找不到對應 openid, 提交用戶數據
          that.getUserInfo(function(res) {
            console.log("onLaunch: ", res.nickName);
          });
        }

      })
    });

  },
  getUserID: function(cb, fail) {
    if (nApi.userid != 0) {
      this.userID = nApi.userid
      typeof cb == "function" && cb(nApi.userid);
      return nApi.userid
    } else {
      typeof fail == "function" && fail(0);
    }
  },
  postUserinfo: function(userData) {
    var that = this;
    var updateData = {
      name: 'userinfo',
      data: userData
    }

    if (nApi.userid == 0) {
      nApi.api('api/v1/Users/', 'POST', updateData);
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
