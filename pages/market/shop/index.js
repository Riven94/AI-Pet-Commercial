// pages/market/shop/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {
      shopName: '爱宠一家人猫咪专营',
      shopIcon: '../../../icons/cat.jpg',
      stars: 5,
      desc: '本店专营各种猫咪零食',
    },
    services:['综合', '销量', '新品'],
    currentIndex: 1,
    comodities: [
      {'img':'../../../icons/cat.jpg','name': '猫粮', 'price': 12.8,'quantity': 862},
      {'img':'../../../icons/cat.jpg','name': '猫粮', 'price': 12.8,'quantity': 862}
    ],
    isOwner: false,
    storeId: ''
  },

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
    const Id=options.id * 1;
    console.log(Id);
    this.setData({storeId: Id})
    this.getshopdetail(Id)
    this.judgeOwner(app.globalData.userId);
  },

  judgeOwner(id){
    const that = this;
    wx.request({
      url: domain + '/user/getUserDetail',
      data:{userId: id},
      method:'GET',
      success(res){
        console.log(res);
      },
      fail(error){
        console.log(error);
      }
    })
  },

  getshopdetail:function(Id){
    const that = this;
    wx.request({
      url:domain+'/product/storeGetDetail', 
      data: {
        "id": Id
      },
      success (res) {
        console.log(res.data);
        const resData = res.data.data;
        if(resData.creatorId == app.globalData.userId){
          that.setData({isOwner: true})
        }
        that.setData({
          shop:resData
        })
      }
    })
  },
  toProduct:function(e){
    console.log(e)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url:'../commoditydetail/index?id=' + id,
    })
  },
  toAddcommditydetail(){
    const that = this;
    wx.navigateTo({
      url: '/pages/market/uploadFreight/index?storeId=' + that.data.storeId,
    })
  },

  Search(e){
    console.log(e);
    const that = this;
    wx.navigateTo({
      url: '../searchProduct/index?data=' + e.detail.value + '&storeId=' + that.data.storeId,
    })
  },

  toCart(){
    wx.navigateTo({
      url: '../cart/index',
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
    this.getProduct();
  },

  getProduct(){
    const that = this;
    wx.request({
      url: domain + '/product/storeProduct',
      data:{
        storeId: that.data.storeId
      },
      method: 'GET',
      success(res){
        console.log(res);
        that.setData({comodities: res.data.data})
      },
      fail(error){
        console.log(error);
      }
    })
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