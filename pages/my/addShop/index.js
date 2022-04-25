// pages/my/addShop/index.js
const app = getApp();
const domain = getApp().globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addPhotoIcon: domain + "/media/icon/addphoto.png",
    info: ['店铺名称','店铺描述','星级','店铺类型','地址'],
    default: ['','','','',''],
    imageList:[],
    levels: ['一星级','二星级','三星级','四星级','五星级'],
    levelIndex: 0,
    modify: false,
    shopId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.detail != null){
      const detail = JSON.parse(options.detail);
      this.setData({
        default: [detail.name, detail.detail, '',detail.type, detail.place],
        levelIndex: detail.level - 1,
        imageList: Array.isArray(detail.imgUrl) ? detail.imgUrl : [detail.imgUrl],
        shopId: detail.id,
        modify: true
      })
    }
  },

  bindLevelChange(e){
    console.log(e)
    this.setData({ levelIndex: e.detail.value * 1});
  },

  preview(e){
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url],
    })
  },

  uploadImage:function(){
    var that=this;
    var imageList = that.data.imageList;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths 
        that.upload(tempFilePaths)
      }
    })
  },

  upload(data) { // 上传图片
    const userId = app.globalData.userId;
    var that = this;
    var imgUrls = this.data.imageList;
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
    var inter = '/product/storeAdd';
    var content = '创建成功!';
    var data = {
      name: value.input0,
      detail: value.input1,
      level: that.data.levelIndex * 1 + 1,
      imgUrl: that.data.imageList,
      creatorId: userId,
      type: value.input3,
      place: value.input4
    }
    var valid = true;
    for(let index in data){
      if(data[index] == '' || data[index].length == 0){
        valid = false;
      }
    }
    if(!valid){
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '数据不能为空！',
        showCancel: false
      })
    }
    else if(data.imgUrl.length > 1){
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '图片只能上传一张！',
        showCancel: false
      })
    }
    else{
      if(that.data.modify){
        inter = '/product/storeUpdate';
        data.id = this.data.shopId;
        content = '修改成功!';
      }
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
    }
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