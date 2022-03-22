// pages/my/myServiceShop/index.js
const app = getApp()
const domain = app.globalData.domainName
Page({
  data: {
    serviceshopData: []
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
    const items = this.data.serviceshopData;
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
    console.log(this.data.serviceshopData);
    const that = this;
    wx.showModal({
      cancelColor: 'cancelColor',
      showCancel: true,
      content: '确定删除指定店铺？',
      success(res){ 
        if(res.confirm){
          that.onRealDelete();
        }
      },
    })
  },

  onRealDelete(){
    var temp = this.data.serviceshopData;
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
        url: domain + '/service/storeDelete',
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
      serviceshopData: afterDelete
    });
  },

  getShops(id){
    const that = this;
    wx.request({
      url: domain + '/service/storeMine',
      method:"GET",
      data:{
        creatorId: id
      },
      success(res){
        console.log(res);
        that.setData({
          serviceshopData: res.data.error
        })
      },
      fail(error){
        console.log(error);
      }
    })
  },

  toServiceShop(e){
    console.log(e)
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../market/serviceshop/index?id=' + id,
    })
  },

  toAddShop(){
    wx.navigateTo({
      url: '../addServiceShop/index',
    })
  },

  toServiceShop(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../market/serviceshop/index?id=' + id,
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