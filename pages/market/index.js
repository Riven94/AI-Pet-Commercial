// pages/market/inde.js
const domain = getApp().globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityNums: 3,
    services:["热卖","主食","零食","洗护","家居","出行"],
    activityImg: ["../../icons/banner.jpeg","../../icons/banner.jpeg","../../icons/banner.jpeg"],
    currentIndex: 0,
    freights: [
      {imgUrl:"../../icons/cat.png", name:"爱宠一家人洗护馆", distance:"7.2km", quantity:"862"},
      {imgUrl:"../../icons/cat.png", name:"爱宠一家人洗护馆", distance:"7.2km", quantity:"862"},
      {imgUrl:"../../icons/cat.png", name:"爱宠一家人洗护馆", distance:"7.2km", quantity:"862"},
      {imgUrl:"../../icons/cat.png", name:"爱宠一家人洗护馆", distance:"7.2km", quantity:"862"},
    ],
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

  change: function(e){
    const index = e.currentTarget.dataset.index;
    const that = this;
    that.setData({
        currentIndex: index
    });
    wx.request({
      url: domain + '/product/specificProduct',
      data: {
        type: that.data.services[index]
      },
      success(res){
        console.log(res);
        const resData = res.data.data;
        that.setData({
          freights: resData
        })
      },
      fail(error){
        console.log(error);
      }
    })
  },

  toMyService: function(e){
    wx.navigateTo({
      url: './myservice/index',
    })
  },

  toShop: function(e){
    wx.navigateTo({
      url: './serviceshop/index',
    })
  }
})