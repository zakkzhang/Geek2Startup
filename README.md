# we-app

we-app 微信小程序



## 配置要求

##### 微信 IDE

**請務必打開**

- [x] 開啟 ES6 轉 ES5




## 架手架說明

##### wx-Develop

在微信 web ide 打開此目錄

##### Scaffolds

不用参与微信 IDE 的文件

##### Scaffolds : mainStyle

mainStyle 下的 we-app.scss 會自動轉換為 we-app.wxss，we-app.wxss 將會影響全局樣式。



## 說明

##### comm_wxml

通用模板文件

* weapp.wxml：頁頭頁腳模板；
* wemore.wxml：未啟用；
* weaction.wxml：未啟用；





##### weapp.wxml

##### appbox

用於 user_page 的頁面，自動識別 api 要求的顯示樣式。需要綁定事件（bindtap）使用。

* bindtap="clickText"
* bindtap="clickPhoto"
* bindtap="ellips"

```javascript
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
```



##### appfooter

用於載入更多、載入中、沒有更多的顯示狀態切換，需要綁定 bindtap="loadMore" 以使用。



##### utils

組件

* api.js：封裝與 api 通信的辦法（未啟用）
* util.js：零碎的各種組件



## Git 簡易說明

##### 簽出項目

`git clone https://github.com/zakkzhang/Geek2Startup.git`

##### 更新項目

`git pull`

##### 刪除未提交的更改

https://www.v2ex.com/t/66718

http://blog.csdn.net/cankingapp/article/details/18312117

##### 參考

http://gitref.org/zh/remotes/



## 可能出現的Bug

根據「https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/details.html?t=2017112」的描述。

##### 判斷絕對域名請求

api.js 會在 iOS8 下，無法正常運行「startsWith」函數。

會導致重新綁定 openid 功能失效。