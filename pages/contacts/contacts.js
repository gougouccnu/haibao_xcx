// pages/contacts/contacts.js
var contactsArray;

Page({
  data:{
    contactsArray: []
  },
  checked:function(event){
    var checkItemId = parseInt(event.currentTarget.id);
    console.log(event);

    for(var i=0; i<contactsArray.length; i++) {
      if(i == checkItemId) {
        contactsArray[checkItemId]["ifChecked"] = true;
      } else {
        contactsArray[i]["ifChecked"] = false;
      }
    }

    this.setData({
      contactsArray: contactsArray
    })
    //
  },
  editContact:function(event){
    var checkItemId = parseInt(event.target.id);
    console.log(event);
    wx.navigateTo({
      url: '../addContact/addContact?editContact=true&checkItemId=' + checkItemId,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    contactsArray = wx.getStorageSync('contactsArray') || [];
    
    this.setData({
        contactsArray: contactsArray
      })
  },
  addContats:function(){
    wx.navigateTo({
      url: '../addContact/addContact?editContact=false'
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})