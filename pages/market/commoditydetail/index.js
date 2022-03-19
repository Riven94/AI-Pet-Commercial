// pages/market/commoditydetail/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const productId = options.id * 1; //将Id转化为int型
    this.setData({productId: productId});//将上个页面传入的ID保留在本页面，方便后续调用
    console.log(options)
    this.getcommpdity(productId)
  },

  getcommpdity: function(Id){
    const that = this;
    console.log(Id);
    wx.request({
      url:domain + '/product/getDetail', 
      data: {
        id: Id
      },
      header:{ 'content-type':'x-www-form-urlencoded'},
      method: 'GET',
      success (res) {
        const resData = res.data.data;
        console.log(resData);
        resData.count = 1;
        that.setData({
          info: resData
        })
      }
    })
 },

  back(){
    wx.navigateBack({
    })
  },
  
  toOrder:function(){
    const that = this;
    wx.navigateTo({
      url: '../placeorder/index',
      events:{
        sendData: function(data){
        }
      },
      success(res){
        res.eventChannel.emit('sendData', {data: [that.data.info]});
      }
    })
  },

  toAdd:function(){
    const that = this;
    wx.request({
      url: domain + '/product/shoppingCartAdd',
      method: 'POST',
      data: {
        creatorId: app.globalData.userId,
        productId: that.data.productId,
        count: 1
      },
      header:{ 'content-type': 'application/json'},
      success(res){
        console.log(res);
        console.log('加入购物车成功');
        wx.showModal({
          cancelColor: 'cancelColor',
          content: "加入购物车成功！",
          showCancel: false
        })
      },
      fail(error){
        console.log('加入失败');
      }
    })
  },

  toCart(){
    wx.navigateTo({
      url: '../cart/index',
    })
  },

  toComment(e){
    wx.navigateTo({
      url: '../comment/index?id=' + this.data.productId,
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