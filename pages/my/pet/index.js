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
        console.log(resData);
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

  delete(e){
    const id = e.currentTarget.dataset.id;
    const that = this;
    wx.showModal({
      cancelColor: 'cancelColor',
      content: '是否删除该宠物信息',
      success(res){
        if(res.confirm){
          that.onRealDelete(id);
        }
      }
    })
  },

  onRealDelete(id){
    const that = this;
    wx.request({
      url: domain + '/animals/delete',
      data:{
        animalId: id
      },
      method: 'POST',
      success(res){
        wx.showModal({
          cancelColor: 'cancelColor',
          content: '删除成功！',
          showCancel: false,
          success(res){
            if(res.confirm){
              that.getMyPet();
            }
          }
        })
      }
    })
  },

  toEdit(e){
    const info = JSON.stringify(e.currentTarget.dataset.detail);
    wx.navigateTo({
      url: '../addPet/index?info='+ info,
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
    this.getMyPet();
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