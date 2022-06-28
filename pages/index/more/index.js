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
      time: '',
      isOwner: false,
    },
    owneritem:{
      nickname: "王先生",
      email: "1111@163.com",
      phone: "15311111111",
      time: "2022/1/25"
    },
    detail: {},
    zanIcon:domain + "/media/icon/赞.png",
    nozanIcon:domain + "/media/icon/no赞.png",
    newsList:[],
      iszan:[],
      commentId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getAnimal(options.id);
    this.setData({commentId: options.id});
    this.getDetail(options.id);
  

  },



  getDetail(id){
    const that = this;
    wx.request({
      url: domain + '/comment/getDetail',
      method: "GET",
      data:{
        id: id
      },
      success(res){
        const resData = res.data.data;
        console.log(res);
        that.setData({
          detail: resData
        })
        if(resData.creatorId == app.globalData.userId){
          that.setData({isOwner: true})
        }
      },
      fail(error){
        console.log(error);
      }
    })
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
        console.log(resData);
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

  delete(){
    const that = this;
    wx.showModal({
      cancelColor: 'cancelColor',
      content: "确认删除此动态？",
      success(res){
        if(res.confirm){
          that.onRealDelete();
        }
      }
    })
  },
  
  onRealDelete(){
    const that = this;
    wx.request({
      url: domain + '/comment/delete',
      method: "POST",
      data:{
        id: that.data.commentId,
        creatorId: app.globalData.userId
      },
      success(res){
        wx.showModal({
          cancelColor: 'cancelColor',
          content: "删除成功！",
          showCancel: false,
          success(res){
            wx.navigateBack({
            })
          }
        })
      },
      fail(error){
        wx.showModal({
          cancelColor: 'cancelColor',
          content: "删除失败！",
          showCancel: false
        })
      }
    })
  },

  toEdit(){
    console.log(this.data.detail);
    wx.navigateTo({
      url: '../pulish/index?info=' + JSON.stringify(this.data.detail) + '&id=' + this.data.detail.id,
    })
  },
  
  preview(e){
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url[0]],
    })
  },

favorclick: function(e){
  var likeFlag = false;
  if(likeFlag === true){
    return false;
  }
console.log(e);
  var that =this;
  var comment_id = e.currentTarget.dataset.id;
  var index = e.currentTarget.dataset.dex;
  var islike = e.currentTarget.dataset.islike;
  var message = this.data.talks;
  var timestamp = Date.parse(new Date());
  timestamp=timestamp/1000;
  var zanInfo={
    //token:app.globalData.portConfig.token,
    timestamp:timestamp,
    comment_id:comment_id,
    cancel:islike,
  }
  var zanData = zanInfo;
  //var postzanData = that.makePostData(zanData, that.data.key);
  wx.request({
    url: domain+'/attention/add',
    data:{
        commentId: that.data.commentId,
        creatorId: app.globalData.userId
    },
    method:'POST',
    header:{
      'content-type':'application/x-www-form-urlencoded'
    },
    success: function(res) {
    
       for (let i in message) {
         if (i == index) {
          if (message[i].is_like == 0) {
          that.data.talks[index].is_like = 1
       message[i].like_num = parseInt(message[i].like_num) + 1
         } else {
    that.data.talks[index].is_like = 0
     message[i].like_num = parseInt(message[i].like_num) - 1
     }
  }
   }
     that.setData({
      talks: message
              })
          console.log("点赞成功", res);
     
           },
           complete: function(res) {
          likeFlag = false;
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