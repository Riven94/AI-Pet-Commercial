// pages/market/commoditydetail/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: 15.90,
    left: 9,
    commodityname: "美味小鱼干 喵喵小鱼干",
    return: "七天无理由退货",
    methods: "低温烘焙 美味四溢",
    freight: "待下单时确认",
    ordered: 16,
    express: "快递发货 收货后结算",
    img: '',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Id= options.id * 1; //将Id转化为int型
    this.setData({id: Id});//将上个页面传入的ID保留在本页面，方便后续调用
    console.log(options)
    this.getcommpdity(Id)
  },
  getcommpdity: function(Id){
    const that = this;
    console.log(Id);
    wx.request({
      url:domain + '/product/getDetail', 
      data: {
        id: Id
      },
      header:{ 'content-type':'x-www-form-urlencoded'},
      method: 'GET',
      success (res) {
        console.log(res);
        const resData = res.data.data;
        that.setData({
          commodityname:resData.name,
          img:resData.imgUrl,
          price:resData.price,
          freight:resData.freight,
          express:resData.security,
          methods:resData.detail
        })
      }
    })
 },

 back(){
  wx.navigateBack({
  })
 },
 toOrder:function(){
  const that = this;
  wx.navigateTo({
    url: '../placeorder/index?id='+that.data.id,//传入ID
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