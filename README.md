# we-app

we-app 微信小程序



## 配置要求

##### 微信 IDE

**請務必打開**

- [x] 開啟 ES6 轉 ES5




## 架手架說明

##### wx-Develop

微信 web ide 打開此目錄

##### Scaffolds

此下的 jade 文件會自動轉為 wxml 到 wx-Develop 目錄下的相同路徑下

##### Scaffolds : mainStyle

mainStyle 下的 we-app.scss 會自動轉換為 we-app.wxss，we-app.wxss 將會影響全局樣式。



架手架使用 Codekit.app 運作，npm cli 需自行配置。



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