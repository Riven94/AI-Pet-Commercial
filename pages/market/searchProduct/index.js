// pages/market/serachshop/index.js
const domain = getApp().globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freights: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getShops(options.data);
  },

  getShops(data){
    const that = this;
    wx.request({
      url: domain + '/product/search',
      method: 'GET',
      data:{
        data:data
      },
      success(res){
        console.log(res);
        that.setData({
          freights: res.data.data
        })
      },
      fail(error){
        console.log(error);
      }
    })
  },

  toProduct(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../commoditydetail/index?id=' + id,
    })
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