// pages/index/pulish/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addPhotoIcon: domain + "/media/icon/addphoto.png",
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    pulishType: ['流浪猫狗','寻找宠物', '爱宠配对','萌宠动态'],
    typeIndexs: 0,
    imageList: [],
    Content: '',
    id: '',
    inter: '/comment/upload',
    modify: '/comment/update',
    edit: false
  },

  bindTypeChange(e){
    console.log(e.detail.value)
    this.setData({
      typeIndexs: e.detail.value
    })
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
        that.upload(tempFilePaths)
      }
    })
  },

  upload(data) { // 上传图片
    const userId = app.globalData.userId;
    var that = this;
    var imgUrls = this.data.imageList;
    console.log(imgUrls);
    console.log(data);
    wx.showToast({
        icon: "loading",
        title: "正在上传"
    }),
    data.forEach((item)=>{
      wx.uploadFile({
        filePath: item,
        //上传图片协议接口
        url: domain+'/images/uploadFile/article',
        name:'img',
        formData: {
          creatorId: userId
        },
        success(res) {
          console.log(res);
          let imgUrl = JSON.parse(res.data).imgUrl;
          imgUrls.push(imgUrl[0]);
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

  submit(){
    const userId = app.globalData.userId;
    const that= this;
    const temp = {
      creatorId: userId,
      imgUrl: that.data.imageList,
      comment: that.data.Content,
      type: that.data.pulishType[that.data.typeIndexs]
    };
    var valid = true;
    if(temp.comment == '' || temp.imgUrl.length == 0){
      valid = false;
    }
    if(this.data.edit){
      temp.id = this.data.id;
    }
    if(!valid){
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '数据不能为空！',
        showCancel: false
      })
    }
    else{
      wx.request({
        url: domain + that.data.inter,
        method: 'POST',
        data: temp,
        success(res){
          console.log(res);
          wx.showModal({
            content:'上传成功！',
            showCancel: false,
            success(){
              wx.navigateBack({
              })
            }
          })
        },
        fail(error){
          console.log(error);
          wx.showModal({
            content:'上传失败！',
            showCancel: false,
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options.info != undefined){
      const detail = JSON.parse(options.info);
      console.log(detail);
      this.setData({  edit: true,
                      Content: detail.comment,
                      imageList: Array.isArray(detail.imgUrl) ? detail.imgUrl : [detail.imgUrl],
                      inter: this.data.modify});
      this.data.pulishType.forEach((item, index) =>{
        if(item == detail.type){
          this.setData({ typeIndexs: index})
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

  preview(e){
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url],
    })
  },

  content:function(e){
    this.setData({
        Content:e.detail.value
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
    if(this.data.edit){
      const that = this;
      wx.request({
        url: domain + '/comment/getDetail',
        method: 'GET',
        data:{
          id: that.data.id
        },
        success(res){
          const detail = res.data.data;
          that.setData({  edit: true,
                          Content: detail.comment,
                          imageList: Array.isArray(detail.imgUrl) ? detail.imgUrl : [detail.imgUrl],
                          inter: that.data.modify});
          that.data.pulishType.forEach((item, index) =>{
            if(item == detail.type){
              that.setData({ typeIndexs: index})
            }
          })
      }
    })
    }
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