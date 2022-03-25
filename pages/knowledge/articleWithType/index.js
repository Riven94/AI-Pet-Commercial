// pages/knowledge/articleWithType/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: {'book':"养宠知识", 'notice':'户外运动', 'new':'新手攻略'},
    title: '',
    articles: [] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tag = options.tag;
    const type=options.type;
    const that = this;
    console.log(type)
    this.setData({title: this.data.titles[tag]});
    wx.request({
      url: domain + '/knowledge/specificArticle',
      data:{
        type: that.data.title
      },
      method: 'GET',
      success(res){
        console.log(res.data)    
        const resData=res.data.data
        that.setData({
          articles: resData
        })
      }
    })
  },
 toarticle:function(e){
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