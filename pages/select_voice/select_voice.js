// pages/select_voice/select_voice.js
var voiceTypeArray;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    voiceTypeArray: voiceTypeArray
  },
  checked: function (event) {
    var checkItemId = parseInt(event.currentTarget.id);
    console.log(event);

    for (var i = 0; i < voiceTypeArray.length; i++) {
      if (i == checkItemId) {
        voiceTypeArray[checkItemId]["ifChecked"] = true;
      } else {
        voiceTypeArray[i]["ifChecked"] = false;
      }
    }

    wx.setStorageSync('voiceType', voiceTypeArray[checkItemId]["name"]);

    this.setData({
      voiceTypeArray: voiceTypeArray
    });
    console.log('try to nav');
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    voiceTypeArray = [
      { "name": 'mike', "ifChecked": true, "value": 0},
      { "name": 'polo', "ifChecked": false, "value": 1}
    ];
    this.setData({
      voiceTypeArray: voiceTypeArray
    });
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})