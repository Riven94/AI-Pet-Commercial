// pages/market/inde.js
const domain = getApp().globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityNums: 3,
    services:["热卖","主食","零食","洗护","家居","出行"],
    activityImg: ["../../icons/banner.jpeg","../../icons/banner.jpeg","../../icons/banner.jpeg"],
    currentIndex: 0,
    freights: [
      {imgUrl:"../../icons/cat.png", name:"爱宠一家人洗护馆", distance:"7.2km", quantity:"862"},
      {imgUrl:"../../icons/cat.png", name:"爱宠一家人洗护馆", distance:"7.2km", quantity:"862"},
      {imgUrl:"../../icons/cat.png", name:"爱宠一家人洗护馆", distance:"7.2km", quantity:"862"},
      {imgUrl:"../../icons/cat.png", name:"爱宠一家人洗护馆", distance:"7.2km", quantity:"862"},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1);
    const that = this;
    wx.request({
      // 获取商城中指定类别的所有商品列表
      url: domain + '/product/specificProduct',
      data: {
        type: that.data.services[0]
      },
      success(res){
        console.log(res);
        const resData = res.data.data;
        that.setData({
          freights: resData
        })
      },
      fail(error){
        console.log(error);
      }
    })
  },

  change: function(e){
    const index = e.currentTarget.dataset.index;
    const that = this;
    that.setData({
        currentIndex: index
    });
    console.log(index);
    if(index == 3){
      wx.request({
        // 服务商城的所有店铺
        url: domain + '/service/storeAll',
        data: {
          all: ' '
        },
        success(res){
          console.log(res);
          const resData = res.data.error;
          that.setData({
            freights: resData
          })
        },
        fail(error){
          console.log(error);
        }
      })
    }
    else{
      wx.request({
        // 获取商城中指定类别的所有商品列表
        url: domain + '/product/specificProduct',
        data: {
          type: that.data.services[index]
        },
        success(res){
          console.log(res);
          const resData = res.data.data;
          that.setData({
            freights: resData
          })
        },
        fail(error){
          console.log(error);
        }
      })
    }
  },

  toMyService: function(e){
    wx.navigateTo({
      url: './myservice/index',
    })
  },

  toShop: function(e){
    console.log(e)
    const id = e.currentTarget.dataset.id
    if(this.data.currentIndex == 3){
      wx.navigateTo({
        url: './serviceshop/index?id=' + id,
      })
    }
    else{
      wx.navigateTo({
        url: './commoditydetail/index?id=' + id,
      })
    }
  },

  
  toCart(){
    wx.navigateTo({
      url: './cart/index',
    })
  },
  
  searchProduct(e){
    const key = e.detail.value;
    wx.navigateTo({
      url: './searchProduct/index?data=' + key,
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