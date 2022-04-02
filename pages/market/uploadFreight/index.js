// pages/market/uploadFreight/index.js
const app = getApp();
const domain = app.globalData.domainName;
const userId = app.globalData.userId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addPhotoIcon: domain + "/media/icon/addphoto.png",
    info:['商品名字', '商品描述', '商品状态','价格','运费','保障','服务'],
    imageList:[],
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
/*     selectDatas: ['主食', '零食', '家居','出行','热卖'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
    Type:'主食', */
    freightType: ['主食', '零食', '家居','出行','热卖'],
    typeIndex:0,
    storeId: '',
    states: ['未售完', '已售完'],
    stateIndex: 0
  },

  bindTypeChange(e){
    console.log(e.detail.value);
    const index = e.detail.value;
    this.setData({typeIndex: index});
  },

  bindStateChange(e){
    console.log(e.detail.value);
    const index = e.detail.value;
    this.setData({stateIndex: index});
  },

    // 点击下拉显示框
 /*  selectTaps() {
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
 */  
  uploadImage:function(){
    var that=this;
    wx.chooseImage({
      count: 2,
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

  upload(data) { // 上传图片
    const userId = app.globalData.userId;
      var that = this;
      var imgUrls = [];
      wx.showToast({
          icon: "loading",
          title: "正在上传"
      }),
      console.log(data);
      data.forEach((item)=>{wx.uploadFile({
        filePath: item,
        //上传图片协议接口
        url: domain+'/images/uploadFile/product',
        name:'img',
        formData: {
          "creatorId": app.globalData.userId
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
          console.log(e);
          wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
          })
        }
      })
    })
  },
  
  formSubmit(e) {
    var that=this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const Name=e.detail.value.input0;
    const Detail=e.detail.value.input1;
    const State= this.data.stateIndex;
    const Price=e.detail.value.input3;
    const Freight=e.detail.value.input4;
    const Security=e.detail.value.input5;
    const Service=e.detail.value.input6;
    wx.request({
      url: domain+'/product/add', 
      method: 'POST',
      data: {
        "name":Name,
        "imgUrl":that.data.imageList,
        "detail":Detail,
        "type":that.data.freightType[that.data.typeIndex],
        "state":State,
        "creatorId":app.globalData.userId,
        "storeId": that.data.storeId,
        "price":Price,
        "freight":Freight,
        "security":Security,
        "service":Service
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data);
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
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({storeId: options.storeId * 1});
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
