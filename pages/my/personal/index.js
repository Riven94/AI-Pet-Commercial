// pages/index/more/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:{
      nickName: "喵喵喵",
      gender: "男",
      phone: "15555555555",
      email: "1111@163.com"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options);
   console.log(1);
   this.getPersonalInfo(options.id);
  },

  getPersonalInfo: function(id){
    const that = this;
    wx.request({
      url: domain + '/user/getUserDetail',
      method: 'GET',
      header: {'content-type': 'application/json'},
      data:{
        userId: id
      },
      success(res){
        console.log(res);
        const resData = res.data.data;
        const temp = {
          nickName: resData.nickName,
          gender: resData.gender == 0? '男' : '女',
          phone: resData.phone,
          email: resData.email
        };
        console.log(temp);
        that.setData({information: temp});
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