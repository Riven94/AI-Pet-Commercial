// pages/camera/result/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      animals: [],
      owners: [],
      animalitem: [],
      owneritem: [],
      currentData: 0, 
      tabBars: ['结果一', '结果二','结果三','结果四','结果五']
    },

    bindchange: function(e) {
      console.log(this.data.animals, this.data.owners);
      const that = this;
      const current = e.detail.current;
      that.setData({
        currentData: current, animalitem: that.data.animals[current], owneritem: that.data.owners[current]
      }, ()=>{
        console.log(that.data.animalitem, that.data.owneritem);
      });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options);
      const index = options.index * 1;
      const that = this;
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on('sendData', function(data){
        that.setData({currentData: index, animals: data.animal, owners: data.owner, animalitem: data.animal[index], owneritem: data.owner[index]});
      });
    },

    changeTab(e){
      const that = this;
      const index = e.currentTarget.dataset.index;
      console.log(this.data.animals, this.data.owners);
      this.setData({ currentData: index, animalitem: that.data.animals[index], owneritem: that.data.owners[index] });
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