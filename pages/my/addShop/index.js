// pages/my/addShop/index.js
const domain = getApp().globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ['店铺名称','店铺描述','星级','店铺类型','地址'],
    imageList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  uploadImage:function(){
    var that=this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(res)
        that.setData({
            imageList:res.tempFilePaths
        })
        console.log("aaaaaaaaa",that.data.imageList)
        that.upload()
      },
      fail(error){
      }
    })
  },

  upload() { // 上传图片
    const that = this;
    var temp = {
      img: '../../../icons/cat.jpg',
      creatorId: 9
    }
    console.log(temp);
    var temp = {
      creatorId: 9,
      img: '../../../icons/cat.jpg'
    };
    console.log(JSON.stringify(temp));
    wx.request({
      url: domain + '/iamges/uploadFile/store',
      data: JSON.stringify(temp),
      method: "POST",
      success(res){
        console.log(res.data);
      },
      fail(error){
        console.log(error);
      }
    })
  },

  formSubmit(e){
    const value = e.detail.value;
    console.log(value);
    console.log(this.data.imageList);
    const that = this;
    wx.request({
      url: domain + '/product/storeAdd',
      method: 'POST',
      data:{
        name: value.input0,
        detail: value.input1,
        level: value.input2,
        imgUrl: that.data.imageList[0],
        creatorId: 1,
        type: value.input3,
        place: value.input4
      },
      success(res){
        console.log(res);
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

  }
})