// pages/my/myshop/index.js
const app = getApp()
const domain = app.globalData.domainName
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userId = app.globalData.userId;
    this.getShops(userId);
  },

  checkboxChange: function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail)
    const items = this.data.shopData;
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = e.detail.value.length; j < lenJ; ++j) {
        if (items[i].id == values[j]) {
          items[i].checked = true;
        }
      }
    }
  },

  delete(){
    console.log(this.data.shopData);
    const that = this;
    const items = this.data.shopData;
    let count = 0;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      console.log(items[i]);
      if(items[i].checked == true){
        count++;
      }
    }
    if(count == 0){
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '请选择要删除的商品',
        showCancel: false,
      })
    }
    else{
      wx.showModal({
        cancelColor: 'cancelColor',
        showCancel: true,
        content: '确定删除指定商铺？',
        success(res){ 
          if(res.confirm){
            that.onRealDelete();
          }
        },
      })
    }
  },

  onRealDelete(){
    var temp = this.data.shopData;
    var idStack = [];
    var afterDelete = temp.filter(item=> {
      if(item.checked == true){
        idStack.push(item.id);
      }
      return item.checked == false}
    );
    console.log(idStack);
    idStack.forEach((item) => {
      wx.request({
        url: domain + '/product/storeDelete',
        data: {
          id: item
        },
        method: 'POST',
        success(res){
          console.log(res);
          console.log('删除成功！');
        },
        fail(error){
          console.log('删除失败');
        }
      })
    });
    this.setData({
      shopData: afterDelete
    });
  },

  getShops(id){
    const that = this;
    wx.request({
      url: domain + '/product/storeMine',
      method:"GET",
      data:{
        creatorId: id
      },
      success(res){
        console.log(res);
        const resData = res.data.data;
        for(let i = 0;i < resData.length;i++){
          resData[i].checked = false;
        }
        console.log(resData);
        that.setData({
          shopData: resData
        })
      },
      fail(error){
        console.log(error);
      }
    })
  },

  toShop(e){
    console.log(e)
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../market/shop/index?id=' + id,
    })
  },

  toAddShop(){
    wx.navigateTo({
      url: '../addShop/index',
    })
  },

  toShop(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../market/shop/index?id=' + id,
    })
    console.log(e);
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
    const userId = app.globalData.userId;
    this.getShops(userId);
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