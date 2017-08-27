let col1H = 0;
let col2H = 0;

var area, city, street, cityRange, streetRange;
var address3Json = {};
var selectedArea;

const IS_PAYED_KEY = "isPayed";
const ITEMS_BEFORE_PAY = 34;
const ITEMS_AFTER_PAY = 100;


const IS_PAYED_KEY_S = "isPayed_s";
const ITEMS_AFTER_PAY_S = 67;


const IS_PAYED_KEY_L = "isPayed_l";
const ITEMS_AFTER_PAY_L = 133;

//const BASE_URL = 'https://93206388.qcloud.la/';
const BASE_URL = 'http://o81ljhejf.bkt.clouddn.com/';

function getImageUrlArray(length) {
  var resultArray = [];

  for (var i = 0; i < 3; i++) {
    resultArray.push({pic: '../../resources/pic/' + i.toString() + '.jpg', height: 0, id: i.toString()});
    //resultArray.push('http://o81ljhejf.bkt.clouddn.com/' + i.toString() + '.jpg');
  }

  for (var i=3; i<length; i++) {
    resultArray.push({pic: BASE_URL + i.toString() + '.jpg', height: 0, id: i.toString()});
  }

  return resultArray;
}

var imageUrlArray = getImageUrlArray(ITEMS_AFTER_PAY_L);

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
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    //imgUrls: [],
    current: 0,
    isPayed: false,
    showDialog: false
  },

  imageTap: function (e) {
    var url = BASE_URL + e.currentTarget.id + '.jpg';
    console.log(url);

    wx.previewImage({
      urls: [url],
    })
  },

  scrollToLower: function () {
    console.log('scroll to bottom');
    this.setData({
      showDialog: true
    });
  },

  toggleDialog: function () {
    console.log('toggle dialog');
    this.setData({
      showDialog: !this.data.showDialog
    });
  },

  onLoad2: function () {
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        this.loadImages();
      }
    })
  },

  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        img.height = imgHeight
        imageObj = img;
        break;
      }
    }

    let loadingCount = this.data.loadingCount - 1;

    if (!loadingCount) {
      let col1 = this.data.col1;
      let col2 = this.data.col2;

      for (let i of images) {
        if (col1H <= col2H) {
          col1H += i.height;
          col1.push(i);
        } else {
          col2H += i.height;
          col2.push(i);
        }
      }

      this.setData({
        col1: col1,
        col2: col2,
        images: []
      })
    }

    this.setData({
      loadingCount: loadingCount
    });
  },

  loadImages: function (image_count) {
    let images = [
      { pic: "http://o81ljhejf.bkt.clouddn.com/0.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/1.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/2.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/3.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/4.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/5.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/6.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/7.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/8.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/9.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/10.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/11.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/12.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/13.jpg", height: 0 },
      { pic: "http://o81ljhejf.bkt.clouddn.com/14.jpg", height: 0 }
    ];



    //let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
      //images[i].id = baseId + "-" + i;
      images[i].id = i.toString();
    }

    this.setData({
      //loadingCount: this.data.images.length
      loadingCount: image_count
      //images: images
    });
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
            break;
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
  pay_s: function () {
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
                  url: 'https://93206388.qcloud.la/wxpay?body=postor&total_fee=330&openid=' + response.data.openid,

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

                          wx.setStorageSync(IS_PAYED_KEY_S, true);

                          // wx.navigateTo({
                          //   url: '/pages/more/more',
                          // })

                          that.setData({
                            isPayed: true,
                            images: imageUrlArray.slice(ITEMS_BEFORE_PAY,ITEMS_AFTER_PAY_S),
                            current: ITEMS_BEFORE_PAY
                          });
                          // load new images
                          that.loadImages(that.data.images.length);
                          
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
                            images: imageUrlArray.slice(ITEMS_AFTER_PAY_S, ITEMS_AFTER_PAY),
                            current: ITEMS_BEFORE_PAY
                          });
                          // load new images
                          that.loadImages(that.data.images.length);


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

  pay_l: function () {
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
                  url: 'https://93206388.qcloud.la/wxpay?body=postor&total_fee=990&openid=' + response.data.openid,

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

                          wx.setStorageSync(IS_PAYED_KEY_L, true);

                          // wx.navigateTo({
                          //   url: '/pages/more/more',
                          // })

                          that.setData({
                            isPayed: true,
                            images: imageUrlArray.slice(ITEMS_AFTER_PAY, ITEMS_AFTER_PAY_L),
                            current: ITEMS_BEFORE_PAY
                          });
                          // load new images
                          that.loadImages(that.data.images.length);

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

    console.log(imageUrlArray);

    this.setData({
      images: imageUrlArray.slice(0, ITEMS_BEFORE_PAY)
    });

    try {
      var value = wx.getStorageSync(IS_PAYED_KEY)
      if (value) {
        // Do something with return value
        this.setData({
          isPayed: true,
          images: imageUrlArray.slice(0, ITEMS_AFTER_PAY),
        });
      }
    } catch (e) {
      // Do something when catch error
      console.log('get storage fail');
    }

    try {
      var value = wx.getStorageSync(IS_PAYED_KEY_S)
      if (value) {
        // Do something with return value
        this.setData({
          isPayed: true,
          images: imageUrlArray.slice(0, ITEMS_AFTER_PAY_S),
        });
      }
    } catch (e) {
      // Do something when catch error
      console.log('get storage fail');
    }

    try {
      var value = wx.getStorageSync(IS_PAYED_KEY_L)
      if (value) {
        // Do something with return value
        this.setData({
          isPayed: true,
          images: imageUrlArray.slice(0, ITEMS_AFTER_PAY_L),
        });
      }
    } catch (e) {
      // Do something when catch error
      console.log('get storage fail');
    }

    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        this.loadImages(this.data.images.length);
      }
    })


    // wx.showModal({
    //   title: '提示',
    //   confirmText: '朕知道了',
    //   content: '左右滑动查看海报,长按海报可保存',
    //   showCancel: false,
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })

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
