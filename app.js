//app.js
var Bmob = require('utils/bmob.js');
Bmob.initialize("a6b462a1296d26d84933314437751c5b", "026ac97d4a1e422af86e152d4fe9c661");

App({
  "globalItemArray": [
    {
        "id": 0,
        "name": "麻辣味",
        "checked": true,
        "price": 50,
        "amount": 1,
        "pictureUrl": "../../resources/pic/0.jpg"
      }, {
        "id": 1,
        "name": "香辣味",
        "checked": true,
        "price": 100,
        "amount": 1,
        "pictureUrl": "../../resources/pic/1.jpg"
      }
  ],
  "requestDetailid": 0,
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      // ?
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})