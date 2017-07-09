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

Page(Object.assign({}, Zan.Quantity, Zan.Toast, {
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    //this.audioCtx.setSrc('https://44480041.qcloud.la/user-4136aa7e.mp3')
    //this.audioCtx.play()
  },
  data: {
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
    this.audioCtx.setSrc('https://44480041.qcloud.la/user-4136aa7e.mp3')
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
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
    wx.request({
      url: 'https://44480041.qcloud.la/tts',
      method: 'GET',
      success: (res) => {
        if (+res.statusCode == 200) {
          console.log('http get ok.');
          console.log(res.data.tt);
          mp3_url = res.data.tt;
          wx.setStorageSync('mp3_url', mp3_url);
          wx.navigateTo({
            url: '../preview/preview?mp3_link=' + res.data.tt
          })

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

    wx.downloadFile({
      url: 'https://44480041.qcloud.la/user-4136aa7e.mp3', //仅为示例，并非真实的资源
      //url: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      success: function (res) {
        console.log('down ok: ' + res.tempFilePath);
        wx.playVoice({
          filePath: res.tempFilePath,
          fail: function(e) {
            console.log(e);
          },
          complete: function(c) {
            console.log('play voice complete');
          }
        })
      },
      fail:function (e) {
        console.log(e);
      }
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
    var that = this
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
