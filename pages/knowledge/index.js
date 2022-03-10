// pages/knowledge/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["推荐阅读", "新手须知", "常见疾病"],
    currentIndex: 0,
    articles:[
      {title:"新手养宠物必须知道的十大注意事项",general:"新手买猫，首先第一个，如果你决定想养一只猫咪，首先你要去查阅相关的资料，要准备很多的东西，新手养宠物必须知道的十大注意事项新手买猫，首先第一个，如果你决定想养一只猫咪，首先你要去查阅相关的资料，要准备很多的东西，新手养宠物必须知道的十大注意事项",img:"../../icons/cat.jpg", desc: "你想知道的都在这里！"
      },
      {title:"新手养宠物必须知道的十大注意事项",general:"新手买猫，首先第一个，如果你决定想养一只猫咪，首先你要去查阅相关的资料，要准备很多的东西，新手养宠物必须知道的十大注意事项新手买猫，首先第一个，如果你决定想养一只猫咪，首先你要去查阅相关的资料，要准备很多的东西，新手养宠物必须知道的十大注意事项",img:"../../icons/cat.jpg", desc: "你想知道的都在这里！"
      }
    ],
    activityNums: 3,
    activityImg: ["../../icons/cat.jpg","../../icons/cat.jpg","../../icons/cat.jpg"],
    classes: [
      {icon: "../../icons/book.png", text: "养宠知识"},
      {icon: "../../icons/notice.png", text: "户外运动"},
      {icon: "../../icons/new.png", text: "新手攻略"},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {/*
    var that = this;
    var temp = this.__data__.articles;
    var arraytemp = [];
    for(let i = 0;i < temp.length;i++){
      var temp1 = temp[i].general.slice(0,50);
      arraytemp.push(temp1);
    }
    console.log(arraytemp);
    that.setData({
      tempgeneral: arraytemp
    })*/
    console.log(this.articles);
    this.getArticles();
  },

  getArticles: function(){
    const that = this;
    wx.request({
      url: domain + '/knowledge/getAll',
      method: "GET",
      data: {
        "userId": 2
      },
      success: (res) => {
        that.setData({
          articles: res.data.data
        })
        console.log(res);
      },
      fail: (res) => {
        console.log(res);
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

  changeTab: function(e){
    const index = e.currentTarget.dataset.index;
    const that = this;
    that.setData({
        currentIndex: index
    })
  },

  getGeneral: function(){
    
  }
})