// pages/market/placeorder/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      address: {
        icon: "../../../icons/location.png",
        useraddress: "湖北省武汉市洪山区珞南街道武汉理工大学南湖校区",
        username: "李华",
        userphone: "8208208820"
      },
      order: {
        img: "../../../icons/cat.jpg",
        name: "猫猫洗护套餐",
        price: 80,
        quantity: 1,
        express: "免邮"
      },
      items: [{value:"支付宝支付"},
              {value:"微信支付"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  back: function(){
    wx.navigateBack({
    })
  },

  toMyService: function(e){
    wx.navigateTo({
      url: '../myservice/index',
    })
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
  }
})