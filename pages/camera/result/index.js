// pages/camera/result/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      animalitem:{
        attribute: "宠物狗",
        name: "旺旺",
        type: "萨摩耶",
        color: "白色",
        img: ["../../../icons/market-selected.png", "../../../icons/market-selected.png"]
      },
      owneritem:{
        nickname: "王先生",
        email: "1111@163.com",
        phone: "15311111111",
        time: "2022/1/25"
      },
      currentData: 0, 
      selectPerson: true,
    },

    bindchange: function(e) {
        const that = this;
        that.setData({
          currentData: e.detail.current
        })
      },

      //点击切换，滑块index赋值
    checkCurrent: function(e) {
      const that = this;
      if (that.data.currentData === e.currentTarget.dataset.current) {
        return false;
      } else {
        that.setData({
          currentData: e.currentTarget.dataset.current
        })
      }
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options);
      const animalId = options.id;
      const ownerId = options.ownerId;
      this.getAnimal(animalId);
      this.getOwner(ownerId);
    },

    getAnimal(id){
      const that = this;
      wx.request({
        url: domain + '/animals/getDetail',
        data:{
          animalId: id
        },
        method: 'GET',
        success(res){
          const resData = res.data.data;
          console.log(res);
          that.setData({animalitem: res.data.data});
        }
      })
    },

    getOwner(id){
      const that = this;
      wx.request({
        url: domain + '/user/getUserDetail',
        data:{
          userId: id
        },
        method: 'GET',
        success(res){
          console.log(res);
          that.setData({owneritem: res.data.data});
        },
        fail(error){
          console.log(error);
        }
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