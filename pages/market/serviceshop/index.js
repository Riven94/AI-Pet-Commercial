// pages/market/shop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: "../../../icons/cat.jpg",
    shopname: "爱宠一家人萌宠生活馆",
    stars: 6,
    type: "宠物店",
    strict: "洪山区",
    services:["洗澡","美容","接送服务"],
    status:"营业中",
    time:"周一至周日 09：30-19：00",
    address: "雄楚大道100号",
    distance: "7.2",
    drivetime: "20",
    currentIndex: 0,
    items: ["全部","洗澡","美容","寄卖","撸宠"]
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

  change: function(e){
    const index = e.currentTarget.dataset.index;
    console.log(index)
    that.setData({
        currentIndex: index
    })
  },

  toDetail: function(e){
    wx.navigateTo({
      url: '../servicedetail/index',
    })
  },

  toMyService: function(e){
    wx.navigateTo({
      url: '../myservice/index',
    })
  }
})