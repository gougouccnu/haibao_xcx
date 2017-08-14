// sendToEmail.js
var emailAddr;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: ''
  },

  bindKeyInput: function (e) {
    emailAddr = e.detail.value;
    this.setData({
      inputValue: emailAddr
    })
  },

  send: function () {
    //var email = 'lishaoweiccnu@163.com';
    var email = emailAddr;
    var url = wx.getStorageSync('mp3_url');
    var len = url.split('/').length;
    var audioFileName = url.split('/')[len - 1];
    console.log(audioFileName);

    if(email == '') {
      wx.showToast({
        title: '请输入要发送的邮箱地址',
        icon: 'loading',
        duration: 3000
      })
      return;
    }

    wx.showModal({
      title: '提示',
      content: '发送到邮箱：' + emailAddr,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://29957802.qcloud.la/send?email=' + encodeURI(email) + '&audio=' + encodeURI(audioFileName),
            method: 'GET',
            success: (res) => {

              console.log(res.statusCode);
              console.log(res.data.status);
              if (res.data.status == 'ok') {
                wx.showToast({
                  title: '发送成功，1分钟后请查收邮箱',
                  icon: 'success',
                  duration: 4000
                })

                wx.setStorageSync('emailAddr', email);
              } else {
                wx.showToast({
                  title: '发送失败，请检查邮箱地址是否正确或待会再发送试试',
                  icon: 'loading',
                  duration: 3000
                })
              }
            },
            fail: (res) => {
              console.log(res);
            },
            complete: (e) => {
              console.log('send finish');
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    emailAddr = wx.getStorageSync('emailAddr') || '';
    console.log(emailAddr);
    this.setData({
      inputValue: emailAddr
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(emailAddr);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '人工智能黑科技，一键文字转语音',
      path: '/pages/index/index'
    }
  }
})