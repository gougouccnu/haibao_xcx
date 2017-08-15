//index.js
//获取应用实例
var app = getApp()

/**
 * JS获取n至m随机整数
 * 琼台博客
 */
function rd(n, m) {
    var c = m - n + 1;
    return Math.floor(Math.random() * c + n);
}


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
    about: function() {
        wx.navigateTo({
            url: '../../pages/about/about',
        })
    },
    pay: function() {
        wx.login({
            success: function(res) {
                if (res.code) {

                  wx.showLoading({
                    title: '请求中',
                  })

                  setTimeout(function () {
                    wx.hideLoading()
                  }, 5000)

                    //发起网络请求
                    wx.request({
                        url: 'https://29957802.qcloud.la/jscode2session?appid=wx9423df5b195336f1&jscode=' + res.code + '&grant_type=authorization_code',
                        //url: 'http://localhost:8080/jscode2session?appid=wx9423df5b195336f1&jscode=' + res.code + '&grant_type=authorization_code',
                        success: function(response) {
                            console.log(response.data.openid);
                            if (response.data.openid) {
                                //统一下单接口对接
                                wx.request({
                                    //url: 'http://localhost:8080/wxpay?openid=' + response.data.openid,
                                    url: 'https://29957802.qcloud.la/wxpay?openid=' + response.data.openid,

                                    success: function(res) {

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
                                                success: function(res) {
                                                    wx.showToast({
                                                        title: '支付成功,感谢',
                                                        icon: 'success'
                                                    });
                                                },
                                                fail: function(res) {
                                                    wx.showToast({
                                                        title: '已取消支付',
                                                        icon: 'success'
                                                    });
                                                },
                                                complete: function() {

                                                }
                                            });
                                        } else {
                                          console.log('before pay fail.');
                                        }
                                    },
                                    fail: function() {
                                        console.log('request fail');
                                    },
                                    header: {
                                        'content-type': 'application/json'
                                    },
                                    complete: function() {
                                        console.log('complete');
                                    }
                                });
                            } else {
                                console.log('request openid fail!');
                            }
                        },
                        fail: function(res) {
                            console.log('request fail.');
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    },
    onLoad: function() {
        console.log('onLoad')
        var addressJson = require('../common/address3.js');
        var address3Json = addressJson.address3();
        for (var key in address3Json["河北省"]) {
            console.log(key)
        }

        // this值在方法的函数内指向Page，一般用that变量首先捕获this added by lsw
        var that = this
        var itemArray = app.globalItemArray;
        console.log(itemArray);
        //调用应用实例的方法获取全局数据
        // app.getUserInfo(function(userInfo){
        //   //更新数据
        //   that.setData({
        //     userInfo: userInfo,
        //     itemArray: itemArray
        //   })
        // })
    },
    // added by lsw 
    onShareAppMessage: function() {
        return {
            title: '人工智能黑科技，一键文字转语音',
            path: '/pages/index/index'
        }
    }
})