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
    info: ['商品名字', '商品描述', '商品状态','价格','运费','保障','服务'],
    imageList: [],
    freightType: ['主食', '零食', '家居','出行','热卖'],
    typeIndex: 0,
    storeId: '',
    states: ['未售完', '已售完'],
    stateIndex: 0,
    default: [],
    interfaces: ['/product/add','/product/update'],
    id: -1
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

  uploadImage:function(){
    var that=this;
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths 
        console.log(res);
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
    var that = this;
    const Name = e.detail.value.input0;
    const Detail = e.detail.value.input1;
    const State = this.data.stateIndex;
    const Price = e.detail.value.input3;
    const Freight = e.detail.value.input4;
    const Security = e.detail.value.input5;
    const Service = e.detail.value.input6;
    var curInterface = this.data.interfaces[0];
    var postData = {
      "name":Name,
      "imgUrl":that.data.imageList,
      "detail":Detail,
      "type":that.data.freightType[that.data.typeIndex],
      "state": State,
      "creatorId": app.globalData.userId,
      "storeId": that.data.storeId,
      "price": Price * 1,
      "freight": Freight * 1,
      "security": Security,
      "service": Service
    }
    if(this.data.id != -1){
      postData.id = this.data.id;
      curInterface = this.data.interfaces[1];
    }
    console.log(postData);
    wx.request({
      url: domain + curInterface, 
      method: 'POST',
      data: postData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
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

  getDefault(id){
    const freightId = id;
    const that = this;
    wx.request({
      url: domain + '/product/getDetail',
      method: 'GET',
      data:{
        id: id
      },
      success(res){
        const resData = res.data.data;
        var temp = {
          default: [resData.name, resData.detail, "", resData.price, resData.freight, resData.security, resData.service],
          imageList: resData.imgUrl,
          stateIndex: resData.state,
          id: freightId
        }
        for(let i = 0;i < that.data.freightType.length;i++){
          if(that.data.freightType[i] === resData.type){
            temp.typeIndex = i;
            break;
          }
        }
        that.setData(temp);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id != undefined){
      this.getDefault(options.id * 1);
    }
    console.log(options);
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
