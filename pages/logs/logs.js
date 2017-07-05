//logs.js
var Zan = require('../../zanui-weapp/dist/index');
var util = require('../../utils/util.js')
var app = getApp();
var selectedItemId;

Page(Object.assign({}, Zan.Toast,{
  data: {
    logs: [],
    itemsToBuy: [],
    selectedItemPicUrl: "../../resources/pic/0.jpg",
    itemTitle: '',
    itemPrice: '',
    itemHaulage: ''
  },
  showToast() {
    this.showZanToast('已加入购物车');
  },
  haulage: function() {
    wx.navigateTo({
      url: '../haulage/haulage'
    })
  },
  add: function() {
    var orderList = wx.getStorageSync('orderList') || [];
    orderList.push(app.globalItemArray[parseInt(selectedItemId)]);
    wx.setStorageSync('orderList', orderList);
    console.log(wx.getStorageSync('orderList'));
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 2000
    })
  },
  buy: function() {
    wx.navigateTo({
      url: '../buyone/buyone?buyone=true'
    })
  }, 
  onLoad: function (options) {
    selectedItemId = app.requestDetailid;
    var item = app.globalItemArray[selectedItemId];
    this.setData({
      selectedItemPicUrl: "../../resources/pic/" + selectedItemId + ".jpg",
      itemTitle: item["name"],
      itemPrice: '单价：￥' + item["price"] + '元',
      itemHaulage: '运费：￥15元' 
    })
    console.log(selectedItemId);
    console.log('restore clicked id')
    console.log(app.requestDetailid)

    wx.request({
      url: 'https://44480041.qcloud.la/tts',
      method: 'GET',
      success: (res) => {
        if (+res.statusCode == 200) {
          console.log('http get ok.');
          console.log(res.data.tt);
        } else {
          console.log('http code error.');
        }
      },
      fail: (res) => {
        console.log(res);
      },
      complete: () => {
      }
    });

  }   
}))
