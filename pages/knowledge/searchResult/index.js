// pages/knowledge/searchResult/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getArticles(options.data);
  },

  getArticles: function(data){
    const that = this;
    wx.request({
      url: domain + '/knowledge/search',
      data:{
        data: data
      },
      success(res){
        const resData = res.data;
        var articleData = [];
        resData.forEach(element => {
          let temp = {
            title: element.articleTitle,
            general: element.article,
            img: element.img,
            desc: '你想知道的都在这里！',
            id: element.id
          };
          articleData.push(temp);
        });
        that.setData({articles: articleData})
      },
      fail(error){
        console.log(error);
      }
    })
  },

  toDetail: function(e){
    console
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/index?id='+id,
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