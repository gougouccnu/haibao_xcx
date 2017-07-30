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
var orderList = [], mp3_url, text;
var voice, speed;

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

Page(Object.assign({}, Zan.Quantity, Zan.Toast, {
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    //this.audioCtx.setSrc('https://44480041.qcloud.la/user-4136aa7e.mp3')
    //this.audioCtx.play()
  },
  data: {
    text: '',
    voice: '女声',
    speed: '正常语速',
    src: '',
    audioAction: {
      method: 'pause'
    },
    contacts: {
      "name": 'lishaowei', "phone": '18926418053',
      "address": 'wuhan city'
    },
    totalPrice: 0,
    userInfo: {},
    orderList: [],
    hasContact: false,
    quantity1: {
      quantity: 1,
      min: 1,
      max: 99
    },
    quantity2: {
      quantity: 1,
      min: 1,
      max: 1
    },
    quantity3: {
      quantity: 1,
      min: 1,
      max: 99
    }
  },
  audioPlay: function () {
    var mp3_url = wx.getStorageSync('mp3_url');
    this.audioCtx.setSrc(mp3_url);
    this.audioCtx.play()
  },
  sendEmail: function () {
    wx.navigateTo({
      url: '../sendToEmail/sendToEmail',
    });
  },
  copy: function () {
    wx.setClipboardData({
      data: wx.getStorageSync('mp3_url'),
      success: function (res) {
        // wx.getClipboardData({
        //   success: function (res) {
        //     console.log(res.data) // data
        //   }
        // })
        wx.showToast({
          title: '音频链接地址已复制到剪切板',
          icon: 'success',
          duration: 3000
        })
      }
    })
  },
  

  edit: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  showToast() {
    this.showZanToast('微信支付');
  },
  //TODO: 订单确认页面不需要再修改数量，要去掉
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
  check: function () {
    var that = this;
    wx.setStorageSync('selectedItemIndex', '1')
    var Diary = Bmob.Object.extend("diary");
    var diary = new Diary();
    diary.set("title", "hello");
    diary.set("content", "hello world");
    //添加数据，第一个入口参数是null
    diary.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        console.log("日记创建成功, objectId:" + result.id);
        wx.showToast({
          title: '订单数据上传成功',
          icon: 'success',
          duration: 2000
        })
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建日记失败');
        wx.showToast({
          title: '订单数据上传失败',
          icon: 'success',
          duration: 2000
        })
      }
    });
  },

  onLoad: function (options) {
    console.log(options)


    // this值在方法的函数内指向Page，一般用that变量首先捕获this added by lsw
    var that = this;

    try {
      text = wx.getStorageSync('text');
      voice = wx.getStorageSync('voiceType').name;
      speed = wx.getStorageSync('voiceSpeed').name;

      that.setData({
        text: text,
        voice: voice,
        speed: speed
      })
    } catch (e) {
      console.log(e);
    }

    // if (options.buyone == 'true') {
    //   console.log('buy one');
    //   var orderTmp = [];
    //   orderTmp.push(app.globalItemArray[parseInt(app.requestDetailid)]);
    //   orderList = orderTmp;
    // } else {
    //   console.log('buy from haulage');
    //   orderList = wx.getStorageSync('orderList');
    // }

    // var hasContact;
    // var contactsArray = wx.getStorageSync('contactsArray') || [];
    // if (contactsArray.length == 0) {
    //   hasContact = false;
    // } else {
    //   hasContact = true;
    // }
  },
  addContacts: function () {
    wx.navigateTo({
      url: '../contacts/contacts'
    })
  },
  // added by lsw 
  onShareAppMessage: function () {
    return {
      title: '人工智能黑科技，一键文字转语音',
      path: '/pages/buyone/buyone?text=' + text +'&voice=' + voice + '&speed=' + speed
    }
  }
}))
