//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'Hello World!!',
    userInfo: {},
    itemArray: []
  },
  //事件处理函数
  bindViewTap: function(event) {
    console.log(event);
    wx.setStorageSync('selectedItemIndex', '1')
    app.requestDetailid = event.currentTarget.id;
    console.log('update clicked id')
    console.log(app.requestDetailid)
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var addressJson = require('../common/address3.js');
    var address3Json = addressJson.address3();
    for(var key in address3Json["河北省"]) {
      console.log(key)
    }
    
    // this值在方法的函数内指向Page，一般用that变量首先捕获this added by lsw
    var that = this
    var itemArray = app.globalItemArray;
    console.log(itemArray)
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo: userInfo,
        itemArray: itemArray
      })
    })
  },
  // added by lsw 
  onShareAppMessage: function() {
    return {
      title: 'custom share title',
      path: '/pages/index/index'
    }
  }
})
