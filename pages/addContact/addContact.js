

var area, city, street, cityRange, streetRange;
var address3Json = {};
var selectedArea;

const IS_PAYED_KEY = "isPayed";
const ITEMS_BEFORE_PAY = 14;

var swiperCurrentIndex = 0;

function getCityArray(address3Json, selectedArea) {
  var cityArray = [];
  for(var key in address3Json[selectedArea]) {
      console.log(key);
      cityArray.push(key);
  }
  return cityArray;
}

Page({
  data: {   
    imgUrls: [
      '../../resources/pic/0.jpg',
      '../../resources/pic/1.jpg',
      '../../resources/pic/2.jpg',
      //'https://93206388.qcloud.la/0.jpg',
      //'https://93206388.qcloud.la/1.jpg',
      //'https://93206388.qcloud.la/2.jpg',
      'https://93206388.qcloud.la/3.jpg',
      'https://93206388.qcloud.la/4.jpg',
      'https://93206388.qcloud.la/5.jpg',
      'https://93206388.qcloud.la/6.jpg',
      'https://93206388.qcloud.la/7.jpg',
      'https://93206388.qcloud.la/8.jpg',
      'https://93206388.qcloud.la/9.jpg',
      'https://93206388.qcloud.la/10.jpg',
      'https://93206388.qcloud.la/11.jpg',
      'https://93206388.qcloud.la/12.jpg',
      'https://93206388.qcloud.la/13.jpg'
      ],
    current: 0,
    isPayed: false
  },
  longtap: function () {
    console.log(this.data.current);
    wx.showActionSheet({
      itemList: ['保存到手机',
                 '联系客服'
                ],
      success: function (res) {
        // tapIndex starts from 0
        console.log(res.tapIndex);

        switch (res.tapIndex)
        {
          case 0:
            wx.downloadFile({
              url: 'https://93206388.qcloud.la/' + swiperCurrentIndex.toString() + '.jpg',
              success: function (res) {
                console.log(res.tempFilePath);
                var tmpPath = res.tempFilePath;

                wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success: function () {
                    // 用户已经同意小程序使用功能，后续调用 wx.startRecord 接口不会弹窗询问
                    wx.saveImageToPhotosAlbum({
                      filePath: tmpPath,
                      success: function (res) {
                        console.log('save success.');
                        wx.showToast({
                          title: '已保存',
                          icon: 'success',
                          duration: 1000
                        })
                      },
                      fail: function (res) {
                        console.log(res);
                        wx.showToast({
                          title: '保存图片失败',
                          icon: 'success',
                          duration: 1000
                        })
                      }
                    })
                  },
                  fail: function (res) {
                    console.log(res);
                    wx.showToast({
                      title: '请求保存图片权限失败',
                      icon: 'success',
                      duration: 1000
                    })
                  }
                });
              }
            });
            case 1:
              wx.navigateTo({
                url: '../../pages/contact/contact',
              })
            break;
          default:
            
        }


        

        // wx.getImageInfo({
        //   src: '/resources/pic/1.jpg',
        //   success: function (res) {
        //     console.log(res.width);
            
        //   },
        //   fail: function (res) {
        //     console.log('get image file info fail');
        //   }
        // })
        
        
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })

  },
  pay: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {

          wx.showLoading({
            title: '请求中',
          })

          setTimeout(function () {
            wx.hideLoading()
          }, 5000)

          //发起网络请求
          wx.request({
            url: 'https://93206388.qcloud.la/jscode2session?appid=wx33c3bf81331603a2&jscode=' + res.code + '&grant_type=authorization_code',
            //url: 'http://localhost:8080/jscode2session?appid=wx9423df5b195336f1&jscode=' + res.code + '&grant_type=authorization_code',
            success: function (response) {
              console.log(response.data.openid);
              if (response.data.openid) {
                //统一下单接口对接
                wx.request({
                  //url: 'http://localhost:8080/wxpay?openid=' + response.data.openid,
                  url: 'https://93206388.qcloud.la/wxpay?body=postor&total_fee=660&openid=' + response.data.openid,

                  success: function (res) {

                    wx.hideLoading();

                    console.log('request success');
                    console.log(res.data);
                    if (res.data.result_code === 'SUCCESS') {
                      wx.requestPayment({
                        timeStamp: res.data.timestamp,
                        nonceStr: res.data.nonceStr,
                        package: res.data.package,
                        signType: 'MD5',
                        paySign: res.data.paySign,
                        success: function (res) {
                          wx.showToast({
                            title: '支付成功,感谢',
                            icon: 'success'
                          });

                          wx.setStorageSync(IS_PAYED_KEY, true);

                          // wx.navigateTo({
                          //   url: '/pages/more/more',
                          // })

                          that.setData({
                            isPayed: true,
                            imgUrls: [
                              '../../resources/pic/0.jpg',
                              '../../resources/pic/1.jpg',
                              '../../resources/pic/2.jpg',
      //'https://93206388.qcloud.la/0.jpg',
      //'https://93206388.qcloud.la/1.jpg',
      //'https://93206388.qcloud.la/2.jpg',
                              'https://93206388.qcloud.la/3.jpg',
                              'https://93206388.qcloud.la/4.jpg',
                              'https://93206388.qcloud.la/5.jpg',
                              'https://93206388.qcloud.la/6.jpg',
                              'https://93206388.qcloud.la/7.jpg',
                              'https://93206388.qcloud.la/8.jpg',
                              'https://93206388.qcloud.la/9.jpg',
                              'https://93206388.qcloud.la/10.jpg',
                              'https://93206388.qcloud.la/11.jpg',
                              'https://93206388.qcloud.la/12.jpg',
                              'https://93206388.qcloud.la/13.jpg',
                              'https://93206388.qcloud.la/14.jpg',
                              'https://93206388.qcloud.la/15.jpg',
                              'https://93206388.qcloud.la/16.jpg',
                              'https://93206388.qcloud.la/17.jpg',
                              'https://93206388.qcloud.la/18.jpg',
                              'https://93206388.qcloud.la/19.jpg',
                              'https://93206388.qcloud.la/20.jpg',
                              'https://93206388.qcloud.la/21.jpg',
                              'https://93206388.qcloud.la/22.jpg',
                              'https://93206388.qcloud.la/23.jpg',
                              'https://93206388.qcloud.la/24.jpg',
                              'https://93206388.qcloud.la/25.jpg',
                              'https://93206388.qcloud.la/26.jpg',
                              'https://93206388.qcloud.la/27.jpg',
                              'https://93206388.qcloud.la/28.jpg',
                              'https://93206388.qcloud.la/29.jpg',
                              'https://93206388.qcloud.la/30.jpg',
                              'https://93206388.qcloud.la/31.jpg',
                              'https://93206388.qcloud.la/32.jpg'
                            ],
                            current: ITEMS_BEFORE_PAY
                          })
                          
                        },
                        fail: function (res) {
                          console.log('request pay fail.....');
                          console.log(res);
                          wx.showToast({
                            title: '已取消支付',
                            icon: 'success'
                          });
                        },
                        complete: function () {

                        }
                      });
                    } else {
                      console.log('before pay fail.');
                    }
                  },
                  fail: function () {
                    console.log('request fail');
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  complete: function () {
                    console.log('complete');
                  }
                });
              } else {
                console.log('request openid fail!');
              }
            },
            fail: function (res) {
              console.log('request fail.');
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  swiperChange: function(e) {
    console.log(e.detail);
    // if (e.detail.current === ITEMS_BEFORE_PAY) {
    //   var isPayed = wx.getStorageSync(IS_PAYED_KEY);
    //   if(isPayed === true) {
    //     wx.navigateTo({
    //       url: '/pages/more/more',
    //     })
    //   }
    // }
    swiperCurrentIndex = e.detail.current;
  },

  onLoad: function (options) {
    area = ['选择省份', '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'];
    var addressJson = require('../common/address3.js');
    address3Json = addressJson.address3();
    console.log(address3Json)
    console.log(options)
    if(options.editContact == 'true') {
      var contactsArray = wx.getStorageSync('contactsArray') || []
      var contact = contactsArray[parseInt(options.checkItemId)];
      console.log(contact)
      if (contactsArray.length > 0) {
        this.setData({
          nameInputValue: contact["name"],
          phoneInputValue: contact["phone"],
          areaRange: area
        })
      }
    } else {
      this.setData({
        areaRange: area
      })
    }

    try {
      var value = wx.getStorageSync(IS_PAYED_KEY)
      if (value) {
        // Do something with return value
        this.setData({
          isPayed: true,
          imgUrls: [
            '../../resources/pic/0.jpg',
            '../../resources/pic/1.jpg',
            '../../resources/pic/2.jpg',
      //'https://93206388.qcloud.la/0.jpg',
      //'https://93206388.qcloud.la/1.jpg',
      //'https://93206388.qcloud.la/2.jpg',
            'https://93206388.qcloud.la/3.jpg',
            'https://93206388.qcloud.la/4.jpg',
            'https://93206388.qcloud.la/5.jpg',
            'https://93206388.qcloud.la/6.jpg',
            'https://93206388.qcloud.la/7.jpg',
            'https://93206388.qcloud.la/8.jpg',
            'https://93206388.qcloud.la/9.jpg',
            'https://93206388.qcloud.la/10.jpg',
            'https://93206388.qcloud.la/11.jpg',
            'https://93206388.qcloud.la/12.jpg',
            'https://93206388.qcloud.la/13.jpg',
            'https://93206388.qcloud.la/14.jpg',
            'https://93206388.qcloud.la/15.jpg',
            'https://93206388.qcloud.la/16.jpg',
            'https://93206388.qcloud.la/17.jpg',
            'https://93206388.qcloud.la/18.jpg',
            'https://93206388.qcloud.la/19.jpg',
            'https://93206388.qcloud.la/20.jpg',
            'https://93206388.qcloud.la/21.jpg',
            'https://93206388.qcloud.la/22.jpg',
            'https://93206388.qcloud.la/23.jpg',
            'https://93206388.qcloud.la/24.jpg',
            'https://93206388.qcloud.la/25.jpg',
            'https://93206388.qcloud.la/26.jpg',
            'https://93206388.qcloud.la/27.jpg',
            'https://93206388.qcloud.la/28.jpg',
            'https://93206388.qcloud.la/29.jpg',
            'https://93206388.qcloud.la/30.jpg',
            'https://93206388.qcloud.la/31.jpg',
            'https://93206388.qcloud.la/32.jpg'
          ],
        });
      }
    } catch (e) {
      // Do something when catch error
    }

    wx.showModal({
      title: '提示',
      confirmText: '朕知道了',
      content: '左右滑动查看海报,长按海报可保存',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    // wx.showToast({
    //   title: '长按图片可保存',
    //   icon: 'success',
    //   duration: 2000
    // })

  },

  onShow: function () {

  },

  onAreaChange: function (e) {
    console.log('area changed')
    selectedArea = area[e.detail.value];
    cityRange = getCityArray(address3Json, selectedArea);
    cityRange.unshift('选择城市')

    console.log(cityRange)
    //console.log(e)
    //console.log(city[e.detail.value])
    this.setData({
      areaIndex: e.detail.value,
      cityRange: cityRange
    });
  },

  onCityChange: function (e) {
    console.log(e)
    streetRange = address3Json[selectedArea][cityRange[e.detail.value]];
    streetRange.unshift('选择地区')
    console.log(streetRange)
    this.setData({
      cityIndex: e.detail.value,
      streetRange: streetRange
    });
  },

  onStreetChange: function (e) {
    console.log(e)
    this.setData({
      streetIndex: e.detail.value
    });
  },

  saveContact: function() {
    //var contactsArray = wx.getStorageSync('contactsArray') || [];
    var contactsArray = [{"name": 'lishaowei', "phone": '18926418053',
               "address": 'wuhan city', "ifChecked": false},
            {"name": 'jinli', "phone": '18926418053',
               "address": 'wuhan city', "ifChecked": false}];
    //contactsArray.push({});
    wx.setStorageSync('contactsArray', contactsArray)

    wx.navigateTo({
      url: '../contacts/contacts'
    })
  },
  // added by lsw 
  onShareAppMessage: function () {
    return {
      title: '裂变海报大全',
      path: '/pages/addContact/addContact'
    }
  }
});
