// pages/my/index.js
const app = getApp();
const domain = app.globalData.domainName;
const appid = wx.getAccountInfoSync().miniProgram.appId;
var secret = "a8d757f07ae6785accae4916dd5e7d82";
var openid = wx.getStorageSync('openid');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      arrowIcon: domain + "/media/icon/arrow.png",
      settingIcon : domain + "/media/icon/setting.png",
      userIcon: domain + "/media/icon/boy.png",
      name:"喵了个咪",
      introduction:"用一句话介绍自己吧~",
      functions:[
        {icon: domain + "/media/icon/selfmessage.png", path:"./personal/index", text:"个人信息"},
        {icon: domain + "/media/icon/mypet.png", path:"./pet/index", text:"我的宠物"},
        {icon: domain + "/media/icon/mymessage.png", path:"./message/index", text:"我的消息"},
      ],
      myPublish:[],
      orders:[],
      userInfo: {},
      openid: "",
      register: false,
      gender: '',
      articles: []
  },

  getUser(e){
    const that = this;
    const isLogin = wx.getStorageSync('login')
    if(!isLogin){
      wx.getUserProfile({
        desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res);
          this.setData({
            userInfo: res.userInfo,
            userIcon: res.userInfo.avatarUrl,
            name: res.userInfo.nickName,
            gender: res.userInfo.gender
          });
          wx.showLoading({
            title: "登录中..."
          })
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
                console.log(temp2);
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
                    wx.hideLoading({
                    })
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
      password: '',
      imgUrl: that.data.userIcon,
      gender: that.data.gender,
      phone: '',
      email: '',
      address: '',
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
        that.getArticles();
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

  getSecret: function(){
    wx.request({
      url: domainName + '/admin/getSecret',
      method: 'GET',
      data:{
        appid: appid
      },
      success(res){
        console.log(res);
        secret = res.data.data;
      }
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
    const isLogin = wx.getStorageSync('login');
    if(!isLogin){
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
    const isLogin = wx.getStorageSync('login');
    if(!isLogin){
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
    wx.setStorageSync('login', true)
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
    console.log(app.globalData);
    this.getSecret();
    if(wx.getStorageSync('login')){
      this.getUserDetail(app.globalData.userId);
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
    const articleId = e.currentTarget.dataset.id;//文章id
    wx.navigateTo({
      url: '../knowledge/addarticle/index?id=' + app.globalData.userId + "&articleId=" + articleId,
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
        userIcon: domain + "/media/icon/boy.png",
        name: "喵了个咪",
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
    const path = e.currentTarget.dataset.path;
    console.log(path);
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