// pages/knowledge/articleWithType/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: {'book':"养宠知识", 'notice':'户外运动', 'new':'新手攻略'},
    title: '',
    articles: [
      {'title': '新手养宠物必须知道的十大注意事项', 'content':'新手买猫，首先第一个，如果你决定想养一只猫咪，首先你要去查阅相关的资料，要准备很多的东西，新手养宠物必须知道的十大注意事项新手买猫，首先第一个，如果你决定想养一只猫咪，首先你要去查阅相关的资料，要准备很多的东西，新手养宠物必须知道的十大注意事项','img': '../../../icons/cat.jpg'},
      {'title': '新手养宠物必须知道的十大注意事项', 'content':'新手买猫，首先第一个，如果你决定想养一只猫咪，首先你要去查阅相关的资料，要准备很多的东西，新手养宠物必须知道的十大注意事项新手买猫，首先第一个，如果你决定想养一只猫咪，首先你要去查阅相关的资料，要准备很多的东西，新手养宠物必须知道的十大注意事项','img': '../../../icons/cat.jpg'}
    ] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tag = options.tag;
    this.setData({title: this.data.titles[tag]})
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