// pages/start/index.js
var timer = null;
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: domain + '/media/icon/爪印.png',
    mainicon: domain + '/media/icon/爪印2.png',
    text: ['AI识别智能识宠', '流浪宠物信息收集', '爱宠星人互动社区']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log("start");
    timer = setTimeout(()=>{
      wx.switchTab({
        url: '/pages/index/index',
      });
    },3000)
  },

  join(e){
    clearTimeout(timer);
    wx.switchTab({
      url: '/pages/index/index',
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})