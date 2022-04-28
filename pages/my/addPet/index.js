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
    spot: ['湖北省武汉市武汉理工大学南湖新校区', '湖北省武汉市武汉理工大学余家头校区','湖北省武汉市武汉理工大学鉴湖校区','湖北省武汉市武汉理工大学马房山校区东院', '湖北省武汉市武汉理工大学马房山校区西院'],
    spotIndex: 0,
    len: ['<40cm', '40cm-60cm', '60cm-70cm','>70cm'],
    lenIndex: 0,
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
      var spotInx = this.data.spot.indexOf(info.spot);
      var lenInx = this.data.len.indexOf(info.size);
      console.log(spotInx, lenInx);
      this.setData({  interface: this.data.modify,
                      animalId: info.id,
                      default: [info.name, info.varieties, info.color, info.ownerName],
                      animalIndex: info.type == '猫' ? 0 : 1,
                      lostIndex: info.isLost == '宠物' ? 0 : 1,
                      stateIndex: info.state,
                      imageList: Array.isArray(info.imgUrl) ? info.imgUrl : [info.imgUrl],
                      spotIndex: spotInx,
                      lenIndex: lenInx
                    });
      console.log(this.data);
    }
    else{
      this.setData({ interface: this.data.upload});
    }
    console.log(domain + this.data.interface)
  },

  preview(e){
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url],
    })
  },

  bindAnimalChange(e){
    const index = e.detail.value;
    this.setData({animalIndex: index});
  },

  bindLenChange(e){
    const index = e.detail.value;
    this.setData({lenIndex: index});
  },

  bindSpotChange(e){
    const index = e.detail.value;
    this.setData({spotIndex: index});
  },

  bindLostChange(e){
    const index = e.detail.value;
    this.setData({lostIndex: index});
  },

  bindStateChange(e){
    const index = e.detail.value;
    this.setData({stateIndex: index});
  },

  uploadImage:function(){
    var that=this;
    var imageList = that.data.imageList;
    if(imageList.length == 1){
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '只能上传一张宠物图片！',
        showCancel: false
      })
    }
    else{
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '请上传宠物面部图片！',
        showCancel: false,
        success(res){
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
        }
      })
    }
  },

  deleteImages: function(e){
    const index = e.currentTarget.dataset.index;
    const that = this;
    wx.showModal({
      cancelColor: 'cancelColor',
      content: '确认删除该图片？',
      success(res){
        if(res.confirm){
          that.onRealDelete(index);
        }
      }
    })
  },

  onRealDelete(index){
    var newImageList = this.data.imageList;
    newImageList.splice(index, 1);
    this.setData({ imageList: newImageList});
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
      name: 'photo',
      url: domain + '/images/uploadFile/animal',
      header: {'content-type': 'multipart/form-data'},
      formData: {
        creatorId: userId
      },
      success(res){
        console.log(res);
        const tempUrls = JSON.parse(res.data).imgUrl;
        imgUrls.push(tempUrls[0]);
        that.setData({imageList: imgUrls});
      },
      fail(error){
        console.log(error)
      }
    })
  })
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
      finderName: '',
      spot: that.data.spot[that.data.spotIndex],
      size: that.data.len[that.data.lenIndex]
    };
    if(data.animalName == "" || data.varieties == "" || data.ownerName == "" || data.imgUrl.length == 0){
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '数据不能为空！',
        showCancel: false
      })
    }
    else{
      wx.showLoading({
        title: '上传中',
      })
      wx.request({
        url: domain + that.data.interface,
        method: 'POST',
        header:{ 'content-type': 'application/json'},
        data: data,
        success(res){
          console.log(res);
          wx.hideLoading({
          })
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