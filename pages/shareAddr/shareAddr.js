// sendToEmail.js
var textValue;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textValue: ''
  },

  copy: function () {
    var url = wx.getStorageSync('mp3_url');
    var len = url.split('/').length;
    var audioFileName = url.split('/')[len - 1];
    console.log(audioFileName);

    wx.setClipboardData({
      data: url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
            wx.showToast({
              title: '配音下载链接已复制到剪贴板',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    textValue = wx.getStorageSync('mp3_url') || '';
    this.setData({
      textValue: textValue
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

  }
})