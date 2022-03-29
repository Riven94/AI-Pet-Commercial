// pages/market/placeorder/index.js
const app = getApp();
const domain = app.globalData.domainName
Page({

  /**
   * 页面的初始数据
   */
  data: {
      locationIcon: domain + "/media/icon/location.png",
      address: {},
      orders: [],
      items: [{value:"微信支付"}],
      empty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    const that = this;
    eventChannel.on('sendData', function(data){
      console.log(data);
      that.setData({orders: data.data});
    })
    console.log(options);
    const productId = options.id;
    //const Id=options,id
    this.getaddress(true);
    //this.getItem();
    //this.getshop(Id)
  },

  getaddress:function(setAddress){
    const userId = app.globalData.userId;
    const that = this;
    console.log(userId);
    wx.request({
      url: domain+'/address/getDefault',
      data: {
        creatorId: userId
      },
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        const resData = res.data.data;
        console.log(res);
        if(resData.length > 0 && setAddress){
          that.setData({
            address:resData[0],
            empty: false
          });
        }
        else if(resData.length == 0){
          that.setData({empty: true});
        }
      },
      fail(error){
        console.log(error);
      }
    })
  },

  getItem(){
    const that = this;
    var temp = [];
    this.data.orders.forEach((item)=>{
      console.log(item.id);
      wx.request({
        url: domain + '/product/getDetail',
        method: 'GET',
        header: {'content-type': 'application/json'},
        data:{
          id: item.productId * 1
        },
        success(res){
          console.log(res.data.data);
          const resData = res.data.data;
          temp.push(resData);
          that.setData({orders: temp});
          console.log(that.data.orders)
        },
        fail(error){
          console.log(error);
        }
      })
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
    this.getaddress(false);
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

  toMyService: function(e){
    wx.navigateTo({
      url: '../myservice/index',
    })
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
  },

  toAddress(){
    wx.navigateTo({
      url: '../addaddress/index',
    })
  }
})