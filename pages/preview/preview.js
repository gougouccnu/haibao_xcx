//获取应用实例
var Zan = require('../../zanui-weapp/dist/index');

var Bmob = require('../../utils/bmob.js');
var app = getApp();
var contactsArray = [{
  "name": 'lishaowei', "phone": '18926418053',
  "address": 'wuhan city'
},
{
  "name": 'jinli', "phone": '18926418053',
  "address": 'wuhan city'
}];
var orderList = [], mp3_url;

function caculateTotalPrice(orderList) {
  var totalPrice = 0;
  var i, item;
  for (i = 0; i < orderList.length; i++) {
    item = orderList[i];
    if (item["checked"]) {
      totalPrice += item["price"] * item["amount"];
      console.log(totalPrice);
    }
  }
  return totalPrice;
}

function get_mp3_url() {
  var url = wx.getStorageSync('mp3_url') || '';
  console.log(url);
  return url;
}

Page({
  data: {
    audioSrc: 'https://44480041.qcloud.la/user-4136aa7e.mp3'
  },
  //事件处理函数

  onLoad: function (options) {
    console.log(options)
    if (options.mp3_link == 'true') {
      console.log('buy one');
      var orderTmp = [];
      orderTmp.push(app.globalItemArray[parseInt(app.requestDetailid)]);
      orderList = orderTmp;
    } else {
      console.log('buy from haulage');
      orderList = wx.getStorageSync('orderList');
    }

    var hasContact;
    var contactsArray = wx.getStorageSync('contactsArray') || [];
    if (contactsArray.length == 0) {
      hasContact = false;
    } else {
      hasContact = true;
    }
  },
  audio_error: function (e) {
    console.log('audio error:');
    console.log(e);
  },
  addContacts: function () {
    wx.navigateTo({
      url: '../contacts/contacts'
    })
  },
  // added by lsw 
  onShareAppMessage: function () {
    return {
      title: 'custom share title',
      path: '/pages/index/index'
    }
  }
})
