// pages/knowledge/addarticle/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

    /**
     * 页面的初始数据
     */
  data: {
      shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
      selectDatas: ['养宠知识', '户外运动', '新手攻略'], //下拉列表的数据
      indexs: 0, //选择的下拉列 表下标,
      Content:"",
      articletitle:"",
      Type: '养宠知识',
      imageList:[],
      userId: ''
  },
    // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },

  optionTaps(e) {
    console.log(e);
    const that = this;
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Indexs)
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows,
      Type: that.data.selectDatas[Indexs]
    });
    console.log(that.data.Type)
  },

  title:function(e){
    this.setData({
        articletitle:e.detail.value
      })   
  },

  content:function(e){
    this.setData({
        Content:e.detail.value
      })   
  },

  uploadImage:function(){
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths 
        console.log(res)
        that.setData({
            imageList:res.tempFilePaths
        })
        console.log("aaaaaaaaa",that.data.imageList)
        that.upload(tempFilePaths)
      }
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
          creatorId: userId
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

  bindSumbit:function(params){
    var that = this;
    const temp = {
      creatorId: that.data.userId * 1,
      articleTitle: that.data.articletitle,
      article: that.data.Content,
      imgUrl: that.data.imageList,
      type: that.data.Type
    };
    console.log(temp);
    wx.request({
        url: domain + '/knowledge/upload', 
        method: "POST",
        data: temp,
        header:{'content-type':'application/json'},
        success (res) {
          console.log(res.data);
          wx.showModal({
            title: '上传成功！',
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
            title: '上传失败！',
            content:'请检查内容是否填写完整',
            showCancel: false
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.id
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