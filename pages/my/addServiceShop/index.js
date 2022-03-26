// pages/my/addServiceShop/index.js
const app = getApp();
const domain = getApp().globalData.domainName;
Page({

  data: {
    info: ['店铺名称','店铺描述','星级','是否营业','营业时间','服务标签','店铺类型','地址'],
    default: ['','','','','','','',''],
    imageList:[],
    levels: ['一星级','二星级','三星级','四星级','五星级'],
    levelIndex: 0,
    business: ['营业','不营业'],
    businessIndex: 0,
    edit: false,
    storeId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.detail != undefined){
      const detail = JSON.parse(options.detail);
      console.log(detail);
      this.setData({edit: true,
                    storeId: detail.id,
                    default: [detail.name, detail.detail, '','', detail.businessHours, detail.isBusiness,
                    detail.serviceField, detail.type, detail.place],
                    imageList: Array.isArray(detail.imgUrl) ? detail.imgUrl : [detail.imgUrl],
                    levelIndex: detail.level - 1,
                    businessIndex: detail.isBusiness});
    }
  },

  bindLevelChange(e){
    console.log(e)
    this.setData({ levelIndex: e.detail.value * 1});
  },

  bindBusinessChange(e){
    console.log(e)
    this.setData({ businessIndex: e.detail.value * 1});
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
          "creatorId": userId,
          "img":that.data.imageList
        },
        success(res) {
          let imgUrl = JSON.parse(res.data).imgUrl;
          imgUrl.forEach((item)=>{
            imgUrls.push(item);
          })
          console.log(imgUrls);
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
    const that = this;
    const data = {
      name: value.input0,
      detail: value.input1,
      level: that.data.levelIndex + 1 + "",
      imgUrl: that.data.imageList,
      isBusiness: that.data.businessIndex + "",
      businessHours:value.input4,
      serviceField:value.input5,
      creatorId: userId,
      type: value.input6,
      place: value.input7
    };
    var inter = "/service/storeAdd";
    var content = "创建成功！";
    if(this.data.edit){
      inter = "/service/storeUpdate";
      data.id = this.data.storeId;
      content = "修改成功！";
    }
    console.log(data);
    wx.request({
      url: domain + inter,
      method: 'POST',
      data: data,
      success(res){
        console.log(res);
        wx.showModal({
          cancelColor: 'cancelColor',
          content: content,
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