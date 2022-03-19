// app.js
const domainName = "http://101.42.227.112:8000";
const appid = wx.getAccountInfoSync().miniProgram.appId;
const secret = "4dfa211aee19f4e1da5ebbb621c77eee";
let openid;
var login = false;
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
    if(open_id != ''){
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
    else{
      wx.showModal({
        cancelColor: 'cancelColor',
        content: "是否使用微信登录小程序",
        success(res){
          if(res.confirm){
            wx.getUserProfile({
              desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
              success: (res) => {
                console.log(res);
                var temp = {
                  userInfo: res.userInfo,
                  login:true,
                  userIcon: res.userInfo.avatarUrl,
                  name: res.userInfo.nickName,
                  gender: res.userInfo.gender
                };
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
                        url: domainName +'/user/getUserId',
                        method:'POST',
                        header:{'content-type': 'application/json'},
                        data: temp2,
                        success(res){
                        openid=res.data.openid;
                        wx.setStorageSync('openid', res.data.openid);
                        console.log(res);
                          let data = {
                            openid: openid,
                            name: temp.name,
                            nickName: temp.name,
                            password: 'default',
                            imgUrl: temp.userIcon,
                            gender: temp.gender,
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
                              userId = res.data.userId;
                              that.globalData.userId = res.data.userId;
                              that.globalData.login = true;
                              wx.setStorageSync('login', true);
                            },
                            fail(error){
                              console.log(error);
                            }
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
        }
      })
    }
    // 登录
  },
  globalData: {
    userInfo: null,
    domainName: "http://101.42.227.112:8000",
    login: login,
    userId: userId
  }
})
