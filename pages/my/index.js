// pages/my/index.js
const app = getApp();
const domain = app.globalData.domainName;
const appid = "wxf8f65f19051961fd";
const secret = "4dfa211aee19f4e1da5ebbb621c77eee";
var openid = wx.getStorageSync('openid');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:"喵了个咪",
      introduction:"用一句话介绍自己吧~",
      functions:[
        {icon:"../../icons/selfmessage.png", path:"./personal/index", text:"个人信息"},
        {icon:"../../icons/mypet.png", path:"./pet/index", text:"我的宠物"},
        {icon:"../../icons/mymessage.png", path:"./message/index", text:"我的消息"},
        
      ],
      marketfunctions:[
        {icon:"../../icons/待发货.png",text:"待收货"},
        {icon:"../../icons/待收货.png",text:"待发货"},
        {icon:"../../icons/待评价.png",text:"待评价"},
        {icon:"../../icons/退款管理.png",text:"退款/售后"}
      ],
      myPublish:[],
      orders:[],
      userInfo: {},
      openid: "",
      login: false,
      register: false,
      userIcon: "../../icons/boy.png",
      gender: '',
      articles: []
  },

  getUser(e){
    const that = this;
    if(!this.data.login){
      wx.getUserProfile({
        desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res);
          this.setData({
            userInfo: res.userInfo,
            login:true,
            userIcon: res.userInfo.avatarUrl,
            name: res.userInfo.nickName,
            gender: res.userInfo.gender
          });
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              if (res.code) {
                var res_code = res.code;
                //发起网络请求
                console.log(res);
                //console.log(that.data.name);
                //console.log(temp);
                const temp2 = {
                  appid: appid,
                  appSecret: secret,
                  code: res.code
                };
                wx.request({
                  url: domain+'/user/getUserId',
                  method:'POST',
                  header:{'content-type': 'application/json'},
                  data: temp2,
                  success(res){
                    openid=res.data.openid;
                    wx.setStorageSync('openid', res.data.openid);
                    wx.setStorageSync('login', true);
                    console.log(res);
                    that.login(res.data.openid);
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        },
      })
    }
  },

  login(openId){
    const that = this;
    let data = {
      openid: openId,
      name: that.data.name,
      nickName: that.data.name,
      password: 'default',
      imgUrl: that.data.userIcon,
      gender: that.data.gender,
      phone: 'default',
      email: 'default',
      address: 'default',
      privilege: 0,
      type: 0,
      detail: '用一句话来介绍自己吧~',
      role: 0
    };
    console.log(data);
    wx.request({
      url: domain + '/user/login',
      data: data,
      method:'POST',
      header:{'content-type':'application/json'},
      success(res){
        console.log(res.data);
        app.globalData.userId = res.data.userId;
        console.log(app.globalData);
        that.getUserDetail(res.data.userId);
      },
      fail(error){
        console.log(error);
      }
    })
  },

  toUploadFreight: function(){
    wx.navigateTo({
      url: '../market/uploadFreight/index',
    })
  },

  toSetting: function(e){
    const id = app.globalData.userId;
    const isLogin = wx.getStorageSync('login');
    console.log(isLogin);
    if(id == undefined || !isLogin){
      wx.showModal({
        content:'请先登录！',
        showCancel: false
      })
    }
    else{
      wx.navigateTo({
        url: './setting/index?id=' + app.globalData.userId,
      })
    }
  },

  toShop: function(e){
    const id = app.globalData.userId;
    if(id == undefined){
      wx.showModal({
        content:'请先登录！',
        showCancel: false
      })
    }
    else{
      wx.navigateTo({
        url: './myshop/index?id=' + id,
      })
    }
  },
  toServiceShop:function(e){
    const id = app.globalData.userId;
    if(id == undefined){
      wx.showModal({
        content:'请先登录！',
        showCancel: false
      })
    }
    else{
      wx.navigateTo({
        url: './myServiceShop/index?id=' + id,
      })
    }
  },
  
  getUserDetail(id){
    const that = this;
    this.setData({login: true});
    wx.request({
      url: domain + '/user/getUserDetail',
      data:{
        userId: id
      },
      method: 'GET',
      success(res){
        const resData = res.data.data;
        console.log(res);
        that.setData({
          userIcon: resData.imgUrl,
          name: resData.name,
          introduction: resData.detail
        }),
        that.getMyPublish();
      },
      fail(error){
        console.log(error);
      }
    })
  },

  getArticles(){
    const that = this;
    wx.request({
      url: domain + '/knowledge/getAll',
      data:{
        creatorId: app.globalData.userId
      },
      method: 'GET',
      success(res){
        const resData = res.data.data;
        console.log(res);
        that.setData({ articles: resData});
      },
      fail(error){
        console.log(error);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1);
    console.log(app.globalData)
    if(app.globalData.login){
      this.getUserDetail(app.globalData.userId);
      console.log(1);
    }
  },

  getMyPublish: function(){
    const that = this;
    wx.request({
      url: domain + '/comment/getAll',
      data:{
        creatorId: app.globalData.userId
      },
      method: 'GET',
      header:{'content-type': 'application/json'},
      success(res){
        console.log(res);
        const resData = res.data.data;
        that.setData({
          myPublish: resData
        })
      },
      fail(error){
        console.log(error);
      }
    })
  },

  getMyOrder: function(){
    const that = this;
    wx.request({
      url: domain + '/product/orderMine',
      method: 'GET',
      header: {'content-type': 'application/json'},
      data:{
        creatorId: app.globalData.userId
      },
      success(res){
        const resData = res.data.data;
        console.log(resData);
      },
      fail(error){
        console.log(error);
      }
    })
  },

  toArticle(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../knowledge/article/index?id=' + id + "&from=my",
    })
  },
  
  toMyPublish(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../index/more/index?id=' + id,
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
    const isLogin = wx.getStorageSync('login');
    if(isLogin){
      this.getMyOrder();
      this.getArticles();
      this.getUserDetail(app.globalData.userId);
    }
    else{
      this.setData({
        myPublish:[],
        orders:[],
        userInfo: {},
        openid: "",
        login: false,
        register: false,
        userIcon: "../../icons/boy.png",
        gender: '',
        articles: []})
    }
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

  handleFunction: function(e){
    const path = e.currentTarget.dataset.path
    console.log(e);
    const id = app.globalData.userId;
    if(path){
      if(id === undefined){
        wx.showModal({
          content: '请先登录！',
          showCancel: false
        })
      }
      else{
        if(path == './message/index'){
          wx.showModal({
            content: '功能暂未开放，敬请期待！',
            showCancel: false
          })
        }
        else{
          wx.navigateTo({
            url: path + '?id=' + id,
          })
        }
      }
    }
  },
})