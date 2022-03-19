// pages/index/more/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:{
      attribute: "宠物狗",
      name: "旺旺",
      type: "萨摩耶",
      color: "白色",
      img: ["../../../icons/market-selected.png","../../../icons/market-selected.png"]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyPet();
  },

  addPet(){
    wx.navigateTo({
      url: '../addPet/index',
    })
  },

  getMyPet(){
    const userId = app.globalData.userId;
    const that = this;
    wx.request({
      url: domain + '/animals/Mine',
      method: 'GET',
      data:{
        creatorId: userId
      },
      success(res){
        const resData = res.data.data;
        console.log(res);
        const temp = {
          attribute: resData.varieties,
          name: resData.name,
          type: resData.detail,
          color: resData.color,
          img: resData.imgUrl
        }
        that.setData({
          information: resData
        });
        console.log(that.data.information)
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

  back: function(){
    wx.navigateBack({
    })
  }
})