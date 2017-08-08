// pages/select_voice/select_voice.js
var voiceSpeedArray = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    voiceSpeedArray: voiceSpeedArray
  },
  checked: function (event) {
    var checkItemId = parseInt(event.currentTarget.id);
    console.log(event);

    for (var i = 0; i < voiceSpeedArray.length; i++) {
      if (i == checkItemId) {
        voiceSpeedArray[checkItemId]["ifChecked"] = true;
      } else {
        voiceSpeedArray[i]["ifChecked"] = false;
      }
    }

    wx.setStorageSync('voiceSpeed', { "name": voiceSpeedArray[checkItemId]["name"], "value": voiceSpeedArray[checkItemId]["value"]});

    this.setData({
      voiceSpeedArray: voiceSpeedArray
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
    voiceSpeedArray = [
      { "name": '1.5倍慢速', "ifChecked": false, "value": '3' },
      { "name": '1.2倍慢速', "ifChecked": false, "value": '4'},
      { "name": '正常语速', "ifChecked": false, "value": '5'},
      { "name": '1.2倍快速', "ifChecked": false, "value": '6'},
      { "name": '1.5倍快速', "ifChecked": false, "value": '7' }
    ];
    this.setData({
      voiceSpeedArray: voiceSpeedArray
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

  }
})