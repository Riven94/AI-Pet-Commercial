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
      {icon: "../../icons/book.png", text: "养宠知识",tag:'book'},
      {icon: "../../icons/notice.png", text: "户外运动", tag:'notice'},
      {icon: "../../icons/new.png", text: "新手攻略", tag:'new'},
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
        "creatorId": 1
      },
      success: (res) => {
        const resData = res.data.data;
        console.log(resData)
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
        that.setData({
          articles: articleData
        })
        console.log(that.data.articles);
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },

  toDetail: function(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './article/index?id='+id,
    })
  },

  Search: function(e){
    console.log("输出的是：",e);
    const key = e.detail.value;
    wx.navigateTo({
      url: './searchResult/index?data=' + key,
    })
  },

  toType: function(e){
    const tag = e.currentTarget.dataset.tag;
    wx.navigateTo({
      url: './articleWithType/index?tag=' + tag,
    })
  },
  addArticle(){
    const id = app.globalData.userId;
    if(id == undefined){
      wx.showModal({
        content:'请先登录！',
        showCancel: false
      })
    }
    else{
      wx.navigateTo({
        url: './addarticle/index?id=' + id,
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