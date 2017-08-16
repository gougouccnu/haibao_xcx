

var area, city, street, cityRange, streetRange;
var address3Json = {};
var selectedArea;

function getCityArray(address3Json, selectedArea) {
  var cityArray = [];
  for (var key in address3Json[selectedArea]) {
    console.log(key);
    cityArray.push(key);
  }
  return cityArray;
}

Page({
  data: {
    imgUrls: [
      '../../resources/pic/1.jpg',
      '../../resources/pic/2.jpg',
      '../../resources/pic/3.jpg',
      '../../resources/pic/4.jpg'
    ]
  },

  onLoad: function (options) {
    area = ['选择省份', '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'];
    var addressJson = require('../common/address3.js');
    address3Json = addressJson.address3();
    console.log(address3Json)
    console.log(options)
    if (options.editContact == 'true') {
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

  saveContact: function () {
    //var contactsArray = wx.getStorageSync('contactsArray') || [];
    var contactsArray = [{
      "name": 'lishaowei', "phone": '18926418053',
      "address": 'wuhan city', "ifChecked": false
    },
    {
      "name": 'jinli', "phone": '18926418053',
      "address": 'wuhan city', "ifChecked": false
    }];
    //contactsArray.push({});
    wx.setStorageSync('contactsArray', contactsArray)

    wx.navigateTo({
      url: '../contacts/contacts'
    })
  }
});
