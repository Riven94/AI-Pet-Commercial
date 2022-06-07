// pages/knowledge/article/index.js
const app = getApp();
const domain = app.globalData.domainName;
const userId=app.globalData.userId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    delete: false,
    articleId: '',
    isOwner: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticle(options.id);
    this.setData({articleId: options.id * 1});
    if(options.from){
      this.setData({delete: true});
    }
    //this.judgeOwner(userId);
  },
  judgeOwner(id){
    const that = this;
    wx.request({
      url: domain + '/user/getUserDetail',
      data:{userId: id},
      method:'GET',
      success(res){
        console.log(res);
      },
      fail(error){
        console.log(error);
      }
    })
  },
  getArticle: function(id){
    const that = this;
    wx.request({
      url: domain + '/knowledge/getDetail',
      data:{
        id: id * 1
      },
      success(res){
        const resData = res.data.data;
        that.setData({content: resData});
        console.log(res);
        if(resData.creatorId == userId){
          that.setData({isOwner: true})
        }
      },
      fail(error){
        console.log(error);
      }
    })
  },

  delete(){
    const that = this;
      wx.request({
      url: domain+'/knowledge/delete',
      method:'POST',
      data: {
        id: that.data.articleId,
        creatorId: userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        wx.showModal({
          cancelColor: 'cancelColor',
          content: "确认删除此文章？",
          success(res){
            if(res.confirm){
              that.onRealDelete();
            }
          }
        })
      }
    })
  },

  onRealDelete(){
    const that = this;
    wx.request({
      url: domain + '/knowledge/delete',
      header: { 'content-type': 'application/json'},
      data:{
        id: that.data.articleId,
        creatorId: app.globalData.userId
      },
      method: 'POST',
      success(res){
        console.log(res);
        wx.showModal({
          cancelColor: 'cancelColor',
          content: '删除成功！',
          showCancel: false,
          success(res){
            wx.navigateBack({
            })
          }
        })
      }
    })
  },
  changearticle(){
    
   /*  const that=this,
    wx.request({
      url: 'url',
    }) */
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