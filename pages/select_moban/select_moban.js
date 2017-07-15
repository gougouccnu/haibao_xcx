// pages/select_voice/select_voice.js
var text_moban_array = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text_moban_array: text_moban_array
  },
  checked: function (event) {
    var checkItemId = parseInt(event.currentTarget.id);
    console.log(event);

    for (var i = 0; i < text_moban_array.length; i++) {
      if (i == checkItemId) {
        text_moban_array[checkItemId]["ifChecked"] = true;
      } else {
        text_moban_array[i]["ifChecked"] = false;
      }
    }

    wx.setStorageSync('text_moban', { "name": text_moban_array[checkItemId]["name"], "value": text_moban_array[checkItemId]["value"] });

    this.setData({
      text_moban_array: text_moban_array
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
    text_moban_array = [
      { "name": '[商场超市]-华联超市开业三周年店庆元旦促销', "ifChecked": false, "value": '喜迎元旦，华联超市开业三周年店庆，购物抽大奖，特等奖一名，饮水机一台加送电磁炉一个，一等奖五名，送名牌电磁炉一个，二等奖十名，送精品被子一条，三等奖十五名，送电取暖器一台，四等奖二十名，送吹风机一个，五等奖五十名，送精品毛巾一条，幸运奖不限。特价商品样样有，香满园菜籽油四十五元一瓶，核桃花生牛奶二十五元一件，味事达酱油十八块六一瓶，服装鞋子全场八点五折，电饭煲电磁炉全场八点九折，品牌被子毛毯全场八点五折，童车全场八点九折，惊喜多多，实惠多多，尽在华联超市！'},
      { "name": '[美食餐厅]-港式奶茶广告', "ifChecked": false, "value": '完美的港式奶茶，茶要够浓，奶也要够浓，入口幼滑如丝，不会一饮而泻，而是延绵细蜜，有奶油的口感。奶茶的厚度主要由淡奶及茶汤的浓淡决定，淡奶所含的奶脂一定要够浓，奶茶才能挂杯奶茶。而挂杯只算合格了一半，奶味绝对不能掩盖茶味，而且入口不能涩，才算一杯完美的挂杯港式奶茶。'}
    ];
    this.setData({
      text_moban_array: text_moban_array
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