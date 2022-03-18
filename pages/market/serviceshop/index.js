// pages/market/shop/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: "../../../icons/cat.png",
    shopname: "爱宠一家人萌宠生活馆",
    stars: 5,
    type: "宠物店",
    strict: "洪山区",
    services:["洗澡","美容","接送服务"],
    status:1,
    time:"周一至周日 09：30-19：00",
    address: "雄楚大道100号",
    distance: "7.2",
    drivetime: "20",
    currentIndex: 0,
    items: ["全部","洗澡","美容","寄卖","撸宠"],
    freights: [],
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Id=options.id;
    this.setData({id: options.id})
    this.getDetail(Id);
    this.getServices(Id);
  },

  getServices: function(Id){
    const that = this;
    wx.request({
      url: domain + '/service/storeService',
      method: 'GET',
      data:{
        storeId: Id
      },
      success(res){
        const resData = res.data.data;
        console.log(resData);
        that.setData({
          freights: resData
        })
      },
      fail(error){
        console.log(error);
      }
    })
  },

  getDetail:function(Id){
    const that = this;
    wx.request({
      url:domain + '/service/storeGetDetail', 
      data: {
      "id":Id
      },
      header: {
        'content-type': 'application/json' // 默认值 
      },
      success (res) {
        console.log(res.data)
        const resData = res.data.data;
    // shopname: "爱宠一家人萌宠生活馆",
    // stars: 5,
    // type: "宠物店",
    // strict: "洪山区",
    // services:["洗澡","美容","接送服务"],
    // status:1,
    // time:"周一至周日 09：30-19：00",
    // address: "雄楚大道100号",
    // distance: "7.2",
    // drivetime: "20",
    // currentIndex: 0,
    // items: ["全部","洗澡","美容","寄卖","撸宠"]
        that.setData({
          icon: resData.imgUrl,
          shopname: resData.name,
          stars: resData.level,
          type: resData.type,
          strict: resData.place,
          services: [resData.serviceField],
          status:1,
          address: "雄楚大道100号",
          distance: "7.2",
          drivetime: "20",
        })
      }
    })
  },

  toCart(){
    wx.navigateTo({
      url: '../cart/index',
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

  },

  back: function(){
    wx.navigateBack({
    })
  },

  change: function(e){
    const index = e.currentTarget.dataset.index;
    this.setData({
        currentIndex: index
    });
    const that = this;
    if(index == 0){
      this.getDetail(that.data.id);
    }
    else{
        wx.request({
        url: domain + '/service/specificService',
        method: "GET",
        data: {
          storeId: that.data.Id,
          type: that.data.items[index]
        },
        success(res){
          console.log(res);
          that.setData({freights: res.data.data});
        },
        fail(error){
          console.log(error);
        }
      })
    }
  },

  toDetail: function(e){
    wx.navigateTo({
      url: '../servicedetail/index',
    })
  },

  toMyService: function(e){
    wx.navigateTo({
      url: '../myservice/index',
    })
  }
})