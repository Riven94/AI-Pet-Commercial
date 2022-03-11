// pages/market/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0,
    comodities: [
      {'img': '../../../icons/cat.jpg', 'name':'猫猫小鱼干','express': '包邮', 'price': 82, 'quantity':1},
      {'img': '../../../icons/cat.jpg', 'name':'猫猫小鱼干1','express': '包邮', 'price': 80, 'quantity':1},
    ]
  },

  checkboxChange: function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail)

    const items = this.data.comodities;
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = e.detail.value.length; j < lenJ; ++j) {
        if (items[i].name === values[j]) {
          items[i].checked = true;
        }
      }
    }
    var pay = 0;
    items.forEach((item)=>{
      if(item.checked){
        pay += item.price * item.quantity;
      }
    })
    this.setData({items});
    this.setData({totalPrice: pay});
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

  }
})