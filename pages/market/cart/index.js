// pages/market/cart/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0,
    comodities: [
      {'img': '../../../icons/cat.jpg', 'name':'猫猫小鱼干','express': '包邮', 'price': 82, 'count':1},
      {'img': '../../../icons/cat.jpg', 'name':'猫猫小鱼干1','express': '包邮', 'price': 80, 'count':1},
    ]
  },

  back: function(){
    wx.navigateBack({
    })
  },

  checkboxChange: function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail)
    const items = this.data.comodities;
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = e.detail.value.length; j < lenJ; ++j) {
        if (items[i].id == values[j]) {
          items[i].checked = true;
        }
      }
    }
    var pay = 0;
    items.forEach((item)=>{
      if(item.checked){
        pay += parseFloat(item.price) * parseInt(item.count);
        console.log(pay);
      }
    })
    this.setData({totalPrice: pay.toFixed(2)});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrders();
  },

  getOrders: function(){
    const userId = app.globalData.userId;
    const that = this;
    wx.request({
      url: domain + '/product/shoppingCartGet',
      method: 'GET',
      data: {
        creatorId: userId
      },
      success(res){
        const resData = res.data.data;
        that.setData({
          comodities: resData
        })
        console.log(res);
      },
      fail(error){
        console.log(error);
      }
    })
  },

  delete(){
    console.log(this.data.comodities);
    const that = this;
    const temp = this.data.comodities;
    let count = 0;
    temp.forEach((item) => {
      console.log(item.checked);
      item.checked == undefined || false? count += 1 : count += 0;
    })
    console.log(count);
    if(count == temp.length){
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '请选择需要删除的商品',
        showCancel: false
      })
    }
    else{
      wx.showModal({
        cancelColor: 'cancelColor',
        showCancel: true,
        content: '确定删除指定商品？',
        success(res){ 
          if(res.confirm){
            that.onRealDelete();
          }
        },
      })
    }
  },

  onRealDelete(){
    const that = this;
    var temp = this.data.comodities;
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
        url: domain + '/product/shoppingCartDelete',
        data: {
          id: item
        },
        method: 'POST',
        success(res){
          console.log(res);
          console.log('删除成功！');
          that.setData({totalPrice: 0});
        },
        fail(error){
          console.log('删除失败');
        }
      })
    });
    this.setData({
      comodities: afterDelete
    });
  },

  minus(e){
    console.log(e);
    const targetId = e.currentTarget.dataset.id;
    const temp = this.data.comodities;
    let count = 0;
    temp.forEach((item)=>{
      if(item.id == targetId){
        count = item.count - 1;
      }
    });
    this.changeCount(targetId,count);
  },

  add(e){
    console.log(e);
    const targetId = e.currentTarget.dataset.id;
    const temp = this.data.comodities;
    let count = 0;
    temp.forEach((item)=>{
      if(item.id == targetId){
        count = item.count + 1;
      }
    });
    this.changeCount(targetId,count);
  },

  changeCount(targetId,count){
    console.log(count)
    wx.request({
      url: domain + '/product/shoppingCartChangeCount',
      method: "POST",
      data:{
        id: targetId,
        count: count
      },
      success(res){
        console.log(res);
      },
      fail(error){
        console.log(error);
      }
    })
    this.getOrders();
  },

  pay(){
    var temp = this.data.comodities;
    var idStack = [];
    var afterDelete = temp.filter(item=> {
      if(item.checked == true){
        idStack.push(item);
      }
      return item.checked == false
    });
    if(idStack.length != 0){
      wx.navigateTo({
        url: '../placeorder/index',
        events:{
          sendData: function(data){
          }
        },
        success(res){
          res.eventChannel.emit('sendData', {data: idStack});
        }
      })
    }
    else{
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '请选择需要购买的商品！',
        showCancel: false
      })
    }
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