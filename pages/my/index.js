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
        {icon:"../../icons/mymessage.png", path:"./message/index", text:"我的消息"}
      ],
      myPublish:[
        {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"},
        {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"}
      ],
      orders:[
        {shopname:"爱宠一家人宠物美容店",orderimg:"../../icons/cat.jpg",service:"洗澡美容套餐服务",time:"2022-01-01",
      status:"进行中",price:"1.00"}
      ],
      userInfo: {},
      openid: "",
      login: false,
      register: false,
      userIcon: "../../icons/boy.png"
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
            name: res.userInfo.nickName
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
      password: '1234567573',
      imgUrl: 'http://101.42.227.112:8000/media/product/372967a2480129cb.jpg',
      gender: 0,
      phone: '152',
      email: 'eae@123.com',
      address: 'wuhan',
      privilege: 0,
      type: 0,
      detail: 'detail',
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
    wx.navigateTo({
      url: './setting/index',
    })
  },

  toShop: function(e){
    wx.navigateTo({
      url: './myshop/index',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: domain + '/user/getUserDetail',
      data:{
        userId: 9
      },
      method: 'GET',
      success(res){
        console.log(res);
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

  handleFunction: function(e){
    const path = e.currentTarget.dataset.path
    console.log(e)
    if(path){
      wx.navigateTo({
        url: path,
      }).catch((error) => {
        wx.switchTab({
          url: path,
        })
      })
    }
  },
  
})