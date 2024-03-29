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
var voiceTypeValue, voiceSpeedValue, text;

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

function getVoiceTypeJson(voiceTypeName) {
  // voiceTypeArray = [
  //   { "name": '男声', "ifChecked": false, "value": '1' },
  //   { "name": '女声', "ifChecked": false, "value": '0' }
  // ];
  var returnValue;

  switch(voiceTypeName)
  {
    case '女声-标准':
      returnValue =  { "name": '女声', "value": 0 };
      break;
    case '男声-标准':
      returnValue =  { "name": '男声', "value": 1 };
      break;
    case '女声-甜甜':
      returnValue = { "name": '女声', "value": 4 };
      break;
    case '男声-老王':
      returnValue = { "name": '男声', "value": 3 };
      break;
    default:
      returnValue =  { "name": '女声', "value": 0 };
  }

  return returnValue;
}

function getVoiceSpeedJson(voiceSpeedName) {
  // voiceSpeedArray = [
  //   { "name": '1.2倍慢速', "ifChecked": false, "value": '3' },
  //   { "name": '正常语速', "ifChecked": false, "value": '5' },
  //   { "name": '1.2倍快速', "ifChecked": false, "value": '7' }
  // ];

  var returnValue;

  switch (voiceSpeedName) {
    case '1.2倍慢速':
      returnValue = { "name": '1.2倍慢速', "value": 3 };
      break;
    case '正常语速':
      returnValue = { "name": '正常语速', "value": 5 };
      break;
    case '1.2倍快速':
      returnValue = { "name": '1.2倍快速', "value": 7 };
      break;
    default:
      returnValue = { "name": '正常语速', "value": 5 };
  }

  return returnValue;
}

Page(Object.assign({}, Zan.Quantity, Zan.Toast, {
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    //this.audioCtx.setSrc('https://29957802.qcloud.la/user-4136aa7e.mp3')
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
    voiceSpeed: '选择语速',
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
  synth: function (e) {
    console.log('@@@@@@@@@@@@@@');
    console.log(e);
    var text = e.detail.value.textarea;

    if(text==='') {
      wx.showModal({
        title: '提示',
        content: '请输入要合成语音的文本',
        showCancel: false
      })
      return
    }

    console.log(e.detail.value);
    try {
      wx.setStorageSync('text', text);
    } catch (e) {
      console.log(e);
    }

    //var that = this;
    //var text = wx.getStorageSync('text');
    console.log('to convert: ')
    console.log(text);
    var per = '1';
    var spd = '5';
    per = wx.getStorageSync("voiceType").value;
    spd = wx.getStorageSync("voiceSpeed").value;

    wx.setStorageSync("text_moban", { "name": '', "value": text });

    wx.request({
      url: 'https://29957802.qcloud.la/tts?text=' + encodeURI(text) + '&per=' + per + '&spd=' + spd,
      //url: 'https://29957802.qcloud.la/tts?text=' + encodeURI(text) + '&per=3&spd=' + spd,
      method: 'GET',
      success: (res) => {
        
          console.log(res.statusCode);
          console.log(res.data.tt);
          wx.setStorageSync('mp3_url', res.data.tt);
          // that.audioCtx.setSrc('https://29957802.qcloud.la/user-4136aa7e.mp3');
          // that.audioCtx.play();

          wx.navigateTo({
            url: '/pages/preview/preview',
          })
      },
      fail: (res) => {
        console.log(res);
      },
      complete: (e) => {
        // that.audioCtx.setSrc('https://29957802.qcloud.la/user-4136aa7e.mp3')
        // that.audioCtx.play()
      }
    });

    wx.showToast({
      title: '语音合成中...',
      icon: 'loading',
      duration: 2000
    })
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
    if (options.text) {
      console.log('buy one on load');
      text = options.text;
      voiceTypeValue = options.voice;
      voiceSpeedValue = options.speed;
      
      wx.setStorageSync('text_moban', {"name": '', "value": text});
      wx.setStorageSync('voiceType', getVoiceTypeJson(voiceTypeValue));
      wx.setStorageSync('voiceSpeed', getVoiceSpeedJson(voiceSpeedValue));

      this.setData({
        text: text,
        voiceType: voiceTypeValue,
        voiceSpeed: voiceSpeedValue
      })
    } else {
      console.log('buy from haulage');
    }    
  },
  onShow: function (options) {
    console.log('on show');

    var textValue = wx.getStorageSync('text_moban').value || '';
    voiceTypeValue = wx.getStorageSync('voiceType').name || '选择语音类型';
    voiceSpeedValue = wx.getStorageSync('voiceSpeed').name || '选择语速';

    console.log(textValue);
    console.log(voiceTypeValue);
    console.log(voiceSpeedValue);
    // this值在方法的函数内指向Page，一般用that变量首先捕获this added by lsw
    var that = this;
    //调用应用实例的方法获取全局数据
      that.setData({
        text: textValue,
        voiceType: voiceTypeValue,
        voiceSpeed: voiceSpeedValue
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
      title: '人工智能黑科技，一键文字转语音',
      path: '/pages/index/index'
    }
  }
}))
