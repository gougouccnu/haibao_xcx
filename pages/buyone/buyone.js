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
var voiceTypeValue, voice_speed_value;

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
    height: 40,
    src: '',
    audioAction: {
      method: 'pause'
    },
    text: '',
    textCase: '文本范例',
    voiceType: '选择语音类型',
    voice_speed: '选择语速',
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
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value);
    try {
      wx.setStorageSync('text', e.detail.value);
    } catch (e) {
      console.log(e);
    }
  },

  selectTextMoban: function () {
    wx.navigateTo({
      url: '../../pages/select_moban/select_moban',
    })
  },

  selectVoice: function() {
    wx.navigateTo({
      url: '../../pages/select_voice/select_voice',
    })
  },
  select_speed: function () {
    wx.navigateTo({
      url: '../../pages/select_speed/select_speed',
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
  //合成语音
  synth: function () {

    var that = this;
    var text = wx.getStorageSync('text');
    console.log('to convert: ')
    console.log(text);
    var per = '1';
    var spd = '5';
    per = wx.getStorageSync("voiceType").value;
    spd = wx.getStorageSync("voiceSpeed").value;

    wx.setStorageSync("text_moban", text);

    wx.request({
      url: 'https://44480041.qcloud.la/tts?text=' + encodeURI(text) + '&per=' + per + '&spd=' + spd,
      method: 'GET',
      success: (res) => {
        
          console.log(res.statusCode);
          console.log(res.data.tt);
          wx.setStorageSync('mp3_url', res.data.tt);
          that.audioCtx.setSrc('https://44480041.qcloud.la/user-4136aa7e.mp3');
          that.audioCtx.play();

          wx.navigateTo({
            url: '/pages/preview/preview',
          })
      },
      fail: (res) => {
        console.log(res);
      },
      complete: (e) => {
        that.audioCtx.setSrc('https://44480041.qcloud.la/user-4136aa7e.mp3')
        that.audioCtx.play()
      }
    });
  },

  share: function () {

    // wx.playBackgroundAudio({
    //   dataUrl: mp3_url,
    //   title: '',
    //   coverImgUrl: ''
    // });
    // wx.downloadFile({
    //   url: mp3_url,
    //   success: function (res) {
    //     console.log('download ok');
    //     console.log(res);
    //     wx.playVoice({
    //       filePath: res.tempFilePath
    //     });
    //   }
    // })
  },
  onLoad: function (options) {
    console.log(options)
    if (options.buyone == 'true') {
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

    // this值在方法的函数内指向Page，一般用that变量首先捕获this added by lsw
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        contacts: contactsArray[0],
        hasContact: hasContact,
        orderList: orderList,
        totalPrice: caculateTotalPrice(orderList)
      })
    })
  },
  onShow: function (options) {
    console.log('on show');

    var text = wx.getStorageSync('text_moban').value;
    voiceTypeValue = wx.getStorageSync('voiceType').name || '选择语音类型';
    voice_speed_value = wx.getStorageSync('voiceSpeed').name || '选择语速';
    // this值在方法的函数内指向Page，一般用that变量首先捕获this added by lsw
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        text: text,
        voiceType: voiceTypeValue,
        voice_speed: voice_speed_value
      })
    })
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
}))
