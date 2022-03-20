// pages/my/addServiceShop/index.js
const app = getApp();
const domain = getApp().globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ['店铺名称','店铺描述','星级','是否营业（0/1）','营业时间','服务标签','店铺类型','地址'],
    imageList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  uploadImage:function(){
    var that=this;
    var imageList = that.data.imageList;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths 
        //console.log(res)
        imageList.push(tempFilePaths[0])
        that.setData({
            imageList,
            // imageList:res.tempFilePaths
        })
        //console.log("aaaaaaaaa",tempFilePaths)
        that.upload(tempFilePaths)
      }
    })
  },

  upload(data) { // 上传图片
    const userId = app.globalData.userId;
    var that = this;
    var imgUrls = [];
    wx.showToast({
        icon: "loading",
        title: "正在上传"
    }),
    data.forEach((item)=>{
      wx.uploadFile({
        filePath: item,
        //上传图片协议接口
        url: domain+'/images/uploadFile/store',
        name:'img',
        formData: {
          "creatorId": userId
        },
        success(res) {
          let imgUrl = JSON.parse(res.data).imgUrl;
          imgUrl.forEach((item)=>{
            imgUrls.push(item);
          })
          //console.log(imgUrls);
          that.setData({imageList: imgUrls});
        },
        fail(e) {
          wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
          })
        },
      })
    })
  },

  formSubmit(e){
    const userId = app.globalData.userId;
    const value = e.detail.value;
    console.log(value);
    console.log(this.data.imageList);
    const that = this;
    wx.request({
      url: domain + '/service/storeAdd',
      method: 'POST',
      data:{
        name: value.input0,
        detail: value.input1,
        level: value.input2,
        imgUrl: that.data.imageList,
        isBusiness:value.input3,
        businessHours:value.input4,
        serviceField:value.input5,
        creatorId: userId,
        type: value.input6,
        place: value.input7
      },
      success(res){
        console.log(res);
        wx.showModal({
          cancelColor: 'cancelColor',
          content:'创建成功！',
          showCancel: false,
          success(res){
            wx.navigateBack({
            })
          }
        })
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