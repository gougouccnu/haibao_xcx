//index.js
var Zan = require('../../zanui-weapp/dist/index');
//获取应用实例
var app = getApp();
//是否全选
var ifCheckedAll;
var orderList;
var totalPrice;

function caculateTotalPrice(orderList) {
  var totalPrice = 0;
    var i, item;
    for (i=0; i < orderList.length; i++) {
      item = orderList[i];
      if (item["checked"]) {
        totalPrice += item["price"] * item["amount"];
        console.log(totalPrice);
      }
    }
    return totalPrice;
}

function setAllItemChecked(orderList) {
  var i, item;
    for (i=0; i < orderList.length; i++) {
      item = orderList[i];
      if (!item["checked"]) {
        item["checked"] = true;
      }
    }
}

Page(Object.assign({}, Zan.Quantity,{
  data: {
    motto: 'Hello World!!',
    userInfo: {},
    ifCheckedAll: true,
    orderList: [],
    totalPrice: 100,
    quantity1: {
      quantity: 1,
      min: 1,
      max: 99
    },
    quantity2: {
      quantity: 1,
      min: 1,
      max: 99
    },
    quantity3: {
      quantity: 1,
      min: 1,
      max: 99
    },
    quantity4: {
      quantity: 1,
      min: 1,
      max: 99
    },
    quantity5: {
      quantity: 1,
      min: 1,
      max: 99
    },
    quantity0: {
      quantity: 1,
      min: 1,
      max: 99
    }
  },
  handleZanQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;
    //重新计算总价
    orderList[0]["amount"] = quantity;
    console.log('quantity clicked');
    console.log(e);
    this.setData({
      [`${componentId}.quantity`]: quantity,
      totalPrice: caculateTotalPrice(orderList)
    });
  },
  //事件处理函数
  checkedAll: function() {
    ifCheckedAll = ! ifCheckedAll;
    if (ifCheckedAll) {
      setAllItemChecked(orderList);
      totalPrice = caculateTotalPrice(orderList);
    } else {
      totalPrice = 0;
    }
    this.setData({
      ifCheckedAll: ifCheckedAll,
      totalPrice: totalPrice
    })
  },
  orderItemCheck: function(event) {
    var checkItemId = parseInt(event.target.id);
    console.log(checkItemId);
    orderList[checkItemId]["checked"] = ! orderList[checkItemId]["checked"];
    totalPrice = caculateTotalPrice(orderList);
    this.setData({
      orderList: orderList,
      totalPrice: totalPrice
    })
  },
  submit: function() {
    //var orderList = wx.getStorageSync('orderList');
    //console.log(orderList);
    wx.setStorageSync('orderList', orderList)
    wx.navigateTo({
      url: '../buyone/buyone?buyone=false'
    })
  },
  onLoad: function() {
    ifCheckedAll = true;
    console.log('onLoad')
    orderList = wx.getStorageSync('orderList');
    this.setData({
      orderList: orderList
    })
    // this值在方法的函数内指向Page，一般用that变量首先捕获this added by lsw
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
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
}))
