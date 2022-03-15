// app.js
const domainName = "http://101.42.227.112:8000";
const appid = wx.getAccountInfoSync().miniProgram.appId;
const secret = "8967de4bc48b2e1631c4b6ad49ea3f53";
let openid;
let name = '';
var userId = -1;
App({

  onLaunch() {
    // 展示本地存储能力
    const that = this;
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const open_id = wx.getStorageSync('openid');
    openid = open_id;
    console.log(open_id);
    if(open_id!=''){
    let data = {
      openid: open_id,
      name: 'default',
      nickName: 'default',
      password: 'default',
      imgUrl: 'default',
      gender: 0,
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
      url: domainName + '/user/login',
      data: data,
      method:'POST',
      header:{'content-type':'application/json'},
      success(res){
        console.log(res.data);
        that.globalData.login = true;
        that.globalData.userId = res.data.userId;
        console.log(true);
      },
      fail(error){
        console.log(error);
      }
    })
  }
    // 登录
  },
  globalData: {
    userInfo: null,
    domainName: "http://101.42.227.112:8000",
    login: false,
    userId: userId
  }
})
