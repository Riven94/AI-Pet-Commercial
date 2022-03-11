// pages/market/receive/index.js
const domain = getApp().globalData.domainName;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ['收货人','手机号码','所在地区','详细地址']
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

  back: function(e){
    wx.navigateBack({
    })
  },

  formSubmit(e) {
    const data = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', data['input0']);
   const temp = {
      creatorId: 1,
      consignee:data['input0'],
      phone: data['input1'],
      area: data['input2'],
      addressDetail: data['input3']
    }
    console.log(temp);
    wx.request({
      url: domain + '/address/add',
      data:{
        creatorId: 1,
        consignee:data['input0'],
        phone: data['input1'],
        area: data['input2'],
        addressDetail: data['input3']
      },
      method: "POST",
      success(res){
        console.log(res);
      },
      fail(error){
        console.log(error);
      }
    })
  },
})