// pages/market/comment/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      starIcon: domain + "/media/icon/star.png",
      currentIndex: 0,
      nums: 3,
      commenttypes: [
        {type: "全部", nums: 3},
        {type: "好评", nums: 2}
      ],
      commentdetail:[
        {icon: "../../../icons/cat.jpg", username: "用户",time: "2022-01-01", stars: 5},
        {icon: "../../../icons/cat.jpg", username: "用户",time: "2022-01-01", stars: 5},
        {icon: "../../../icons/cat.jpg", username: "用户",time: "2022-01-01", stars: 4},
      ],
      productId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id * 1
    this.setData({ productId: id});
    this.getComment();
  },

  getComment: function(){
    const that = this;
    console.log(this.data.productId);
    wx.request({
      url: domain + '/product/evaluateGetAll',
      data:{
        productId: that.data.productId
      },
      method:'GET',
      success(res){
        console.log(res);
        const resData = res.data.data;
        that.setData({ commentdetail: resData })
      },
      fail(error){
        console.log(error);
      }
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

  },

  back: function(e){
    wx.navigateBack({
    })
  },

  change:function(e){
    const index = e.currentTarget.dataset.index;
    const that = this;
    that.setData({
      currentIndex: index
    })
  }
})