// pages/my/addShop/index.js
const app = getApp();
const domain = getApp().globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addPhotoIcon: domain + "/media/icon/addphoto.png",
    info: ['宠物名字','宠物品种','颜色','你的名字',],
    default: ['','','',''],
    imageList:[],
    animalType: ['猫','狗'],
    animalIndex: 0,
    lostType: ['宠物','流浪猫狗'],
    showLostType: ['否', '是'],
    lostIndex: 0,
    state: ['未丢失','丢失','流浪猫狗'],
    stateIndex: 0,
    upload: '/animals/ownerUpload',
    modify: '/animals/update',
    interface: '',
    animalId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.info != null){
      const info = JSON.parse(options.info);
      console.log(info);
      this.setData({  interface: this.data.modify,
                      animalId: info.id,
                      default: [info.name, info.varieties, info.color, info.ownerName],
                      animalIndex: info.type == '猫' ? 0 : 1,
                      lostIndex: info.isLost == '宠物' ? 0 : 1,
                      stateIndex: info.state,
                      imageList: Array.isArray(info.imgUrl) ? info.imgUrl : [info.imgUrl]
                    });
      console.log(this.data);
    }
    else{
      this.setData({ interface: this.data.upload});
    }
    console.log(domain + this.data.interface)
  },

  bindAnimalChange(e){
    console.log(e.detail.value);
    const index = e.detail.value;
    this.setData({animalIndex: index});
  },

  bindLostChange(e){
    console.log(e.detail.value);
    const index = e.detail.value;
    this.setData({lostIndex: index});
  },

  bindStateChange(e){
    console.log(e.detail.value);
    const index = e.detail.value;
    this.setData({stateIndex: index});
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
    console.log(data[0]);
    wx.uploadFile({
      filePath: data[0],
      name: 'photo',
      url: domain + '/images/uploadFile/animal',
      header: {'content-type': 'multipart/form-data'},
      formData: {
        creatorId: userId
      },
      success(res){
        console.log(res);
      },
      fail(error){
        console.log(error)
      }
    })
    // data.forEach((item)=>{
    //   console.log(item);
    //   wx.uploadFile({
    //     filePath: item,
    //     //上传图片协议接口
    //     url: domain+'/images/uploadFile/animal',
    //     name:'img',
    //     header: {'content-type': 'multipart/form-data'},
    //     formData: {
    //       photo: '',
    //       creatorId: userId
    //     },
    //     success(res) {
    //       console.log(res);
    //       let imgUrl = JSON.parse(res.data).imgUrl;
    //       imgUrl.forEach((item)=>{
    //         imgUrls.push(item);
    //       })
    //       //console.log(imgUrls);
    //       that.setData({imageList: imgUrls});
    //     },
    //     fail(e) {
    //       console.log(e);
    //       wx.showModal({
    //           title: '提示',
    //           content: '上传失败',
    //           showCancel: false
    //       })
    //     },
    //   })
    // })
  },

  formSubmit(e){
    const userId = app.globalData.userId;
    const value = e.detail.value;
    const that = this;
    const data = {
      animalId: that.data.animalId,
      animalName: value.input0,
      varieties: value.input1,
      color: value.input2,
      type: that.data.animalType[that.data.animalIndex],
      creatorId: userId,
      ownerId: userId,
      ownerName: value.input3,
      isLost: that.data.lostType[that.data.lostIndex],
      state: that.data.stateIndex,
      imgUrl: that.data.imageList,
      finderId: -1,
      finderName: ''
    };
    console.log(data);
    wx.request({
      url: domain + that.data.interface,
      method: 'POST',
      header:{ 'content-type': 'application/json'},
      data: data,
      success(res){
        console.log(res);
        wx.showModal({
          cancelColor: 'cancelColor',
          content: '上传成功！',
          showCancel: false,
          success(res){
            if(res.confirm){
              wx.navigateBack({
              })
            }
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