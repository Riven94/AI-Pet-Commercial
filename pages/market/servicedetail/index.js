// pages/market/servicedetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    servicename: "喵星人精致洗护",
    returnselections: ["随时退","过期退"],
    appointment: "需预约",
    consumptions: 160,
    stars: 6,
    total: 55,
    type: "宠物品类新用户专享",
    coupon:12,
    usage: "宠物店猫犬舍服务通用",
    items:["团购详情","购买须知","网友评价"],
    currentIndex: 0,
    currentItem: "",
    projects:[
      {type: "基础检查", detail:[
        {name: "指甲修剪", times:1, price: 5},
        {name: "耳道清理", times:1, price: 5},
        {name: "脚底腹部毛修理", times:1, price: 5}
      ]
    },
    {type: "全身洗护", detail:[
      {name: "全身精致洗护", times:1, price: 70},
      {name: "全身精致洗护", times:1, price: 70},
      {name: "全身精致洗护", times:1, price: 70}
    ]
  }
    ],
    price: 39.9
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  
  back: function(e){
    wx.navigateBack({
    })
  },

  change: function(e){
    const that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      currentIndex: index
    })
  },

  toMyService: function(e){
    wx.navigateTo({
      url: '../myservice/index',
    })
  },

  toComment: function(e){
    wx.navigateTo({
      url: '../comment/index',
    })
  }
})