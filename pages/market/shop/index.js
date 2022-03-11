// pages/market/shop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {
      shopName: '爱宠一家人猫咪专营',
      shopIcon: '../../../icons/cat.jpg',
      stars: 5,
      desc: '本店专营各种猫咪零食'
    },
    services:['综合', '销量', '新品'],
    currentIndex: 1,
    comodities: [
      {'img':'../../../icons/cat.jpg','name': '猫粮', 'price': 12.8,'quantity': 862},
      {'img':'../../../icons/cat.jpg','name': '猫粮', 'price': 12.8,'quantity': 862}
    ]  },

  change: function(e){
    const index = e.currentTarget.dataset.index;
    const that = this;
    that.setData({
        currentIndex: index
    })
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

  }
})