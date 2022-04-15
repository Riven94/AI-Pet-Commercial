// pages/camera/matching/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        animals:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    const that = this;
    eventChannel.on('sendData', function(data){
      let resData = data.data.data;
      console.log(data);
      let img = JSON.parse(data.data.data.imgUrl);
      resData.imgUrl = img;
      that.setData({animals: [resData]});
    })
    console.log(this.data.animals);
  },

  //获取当前滑块的index
  bindchange: function(e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function(e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },

  toDetail(e){
    console.log(e);
    const animalId = e.currentTarget.dataset.id;
    const ownerId = e.currentTarget.dataset.owner;
    wx.navigateTo({
      url: '../result/index?id=' + animalId + "&ownerId=" + ownerId,
    })
  },
})