// app.js
const domainName = "http://101.42.227.112:8000";
const appid = wx.getAccountInfoSync().miniProgram.appId;
const secret = "8967de4bc48b2e1631c4b6ad49ea3f53";
let openid;
let name = '';
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: domainName+'/user/login',
            method:'POST',
            data: {
              "code": res.code,
              "appid":appid,
              "secret":secret,
            },
            success(res){
              openid=res.data.openid;
              wx.setStorageSync('openid', res.data.openid)
              console.log(res);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    domainName: "http://101.42.227.112:8000",
  }
})
