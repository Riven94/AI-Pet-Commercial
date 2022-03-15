// pages/index/pulish/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['流浪猫狗','寻找宠物', '爱宠配对', '萌宠动态'],
    indexs: 0,
    imageList: [],
    Content: '',
    Type: '流浪猫狗',
    id: ''
  },

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

  content:function(e){
    this.setData({
        Content:e.detail.value
      })   
  },

  uploadImage:function(){
    var that=this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
            imageList:res.tempFilePaths
        })
        console.log("aaaaaaaaa",that.data.imageList)
        that.upload({path: tempFilePaths})
      },
      fail(error){
      }
    })
  },

  upload(data) { // 上传图片
    var that = this;
    console.log(data);
    wx.showToast({
        icon: "loading",
        title: "正在上传"
    }),
    wx.request({
        //上传图片协议接口
        url: domain + '/iamges/uploadFile/comment',
        method: 'POST',
        data: {
          img: data,
          creatorId: 9
        },
        success(res) {
          console.log("上传图片成功");
          console.log(res);
        },
        fail(e) {
          wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
          })
        },
    })
  },

  submit(){
    const id = this.data.id;
    const that= this;
    wx.request({
      url: domain + '/comment/upload',
      method: 'POST',
      header:{'content-type':'multipart/form-data'},
      data:{
        creatorId: id,
        imgUrl: that.data.imageList[0],
        comment: that.data.Content,
        type: that.data.Type
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(
      {id: options.id * 1});
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