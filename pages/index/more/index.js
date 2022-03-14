// pages/index/more/index.js
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
      img: ["../../../icons/market-selected.png", "../../../icons/market-selected.png"],
      ownerId: 1,
      time: ''
    },
    owneritem:{
      nickname: "王先生",
      email: "1111@163.com",
      phone: "15311111111",
      time: "2022/1/25"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAnimal(options.id);
  },

  getAnimal(id){
    const that = this;
    wx.request({
      url: domain + '/animals/getDetail',
      data:{
        "animalId": id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        const resData = res.data.data;
        const {ownerId, createdAt} = resData;
        console.log(resData);
        const temp = { ...that.data.animalitem,
                        type: resData.detail,
                        name: resData.name,
                        color: resData.color,
                        ownerId: resData.ownerId,
                        time: resData.createdAt,
                        imgUrl: resData.imgUrl,
                        attribute: resData.varieties}
        that.setData({animalitem: temp});
        that.getOwner(ownerId, createdAt);
      }
    })
  },

  getOwner(id, time){
    const that = this;
    wx.request({
      url: domain + '/user/getUserDetail',
      data: {'userId':id},
      success(res){
        const resData = res.data.data;
        const temp = {
          nickname: resData.nickName,
          email: resData.email,
          phone: resData.phone,
          time: time
        }
        that.setData({owneritem: temp});
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

  },

  back: function(){
    wx.navigateBack({
    })
  }
})