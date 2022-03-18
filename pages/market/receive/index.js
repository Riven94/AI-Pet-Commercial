// pages/market/receive/index.js
const app=getApp();
const userId = app.globalData.userId;
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ['收货人','手机号码','所在地区','详细地址']
  },
  formSubmit(e){
    const value = e.detail.value;
    console.log(userId);
    const that = this;
    wx.request({
      url:domain+'/address/add',
      method: 'POST',
      data:{
        creatorId: userId,
        consignee: value.input0,
        phone: value.input1,
        area: value.input2,
        addressDetail : value.input3,
        type:1
      },
      header: { 'content-type': 'application/json'},
      success(res){
        console.log(res);
        wx.navigateBack({
          delta: 1,
        })
      },
      fail(error){
        console.log(error);
      }
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

  },

  back: function(e){
    wx.navigateBack({
    })
  },

  // formSubmit(e) {
  //   const data = e.detail.value;
  //   console.log(data)
  //   //console.log('form发生了submit事件，携带数据为：', data['input0']);
  //   const temp = {
  //     creatorId: 9,
  //     consignee:data['input0'],
  //     phone: data['input1'],
  //     area: data['input2'],
  //     addressDetail: data['input3'],
  //     type: 0
  //   }
  //   console.log(temp);
  //   wx.request({
  //     url: domain + '/address/add',
  //     data:temp,
  //     method: "POST",
  //     header: {'content-type': 'application/json'},
  //     success(res){
  //       console.log(res);
  //     },
  //     fail(error){
  //       console.log(error);
  //     }
  //   })
  // },
})