// pages/select_voice/select_voice.js
var contactsArray;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactsArray: contactsArray
  },
  checked: function (event) {
    var checkItemId = parseInt(event.currentTarget.id);
    console.log(event);

    for (var i = 0; i < contactsArray.length; i++) {
      if (i == checkItemId) {
        contactsArray[checkItemId]["ifChecked"] = true;
      } else {
        contactsArray[i]["ifChecked"] = false;
      }
    }

    wx.setStorageSync('voiceSpeed', { "name": contactsArray[checkItemId]["name"], "value": contactsArray[checkItemId]["value"]});

    this.setData({
      contactsArray: contactsArray
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
    contactsArray = [
      { "name": '正常语速', "ifChecked": false, "value": 5},
      { "name": '1.2倍语速', "ifChecked": false, "value": 7}
    ];
    this.setData({
      contactsArray: contactsArray
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