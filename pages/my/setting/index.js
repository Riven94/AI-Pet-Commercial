// pages/my/setting/index.js
const app = getApp();
const domain = app.globalData.domainName;
var emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ['姓名','昵称','性别','手机号','密码','确认密码','邮箱','地址','用户描述'],
    default: ['','','','','','','','',''],
    icon: "",
    userId: '',
    defaultOption: {
      name: '男', id: '0'
    },
    options: [
      {gender_name: '女', gender_id: '1'}
    ],
    array: ['男','女'],
    arrayIndex: 0,
    selected: ''
  },

  uploadImage:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths 
        console.log(res)
        that.setData({
            icon:res.tempFilePaths
        })
        console.log("aaaaaaaaa",that.data.icon);
        that.upload(tempFilePaths);
      }
    })
  },

  upload(data) { // 上传图片
    const userId = app.globalData.userId;
    var that = this;
    wx.showToast({
        icon: "loading",
        title: "正在上传"
    }),
    wx.uploadFile({
      filePath: data[0],
      //上传图片协议接口
      url: domain+'/images/uploadFile/store',
      name:'img',
      formData: {
        "creatorId": userId
      },
      success(res) {
        let imgUrl = JSON.parse(res.data).imgUrl;
        //console.log(imgUrls);
        that.setData({icon: imgUrl[0]});
      },
      fail(e) {
        console.log(e);
        wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
        })
      },
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrayIndex: e.detail.value,
    })
    var gender = this.data.array[this.data.arrayIndex];
    let sel = gender == '男' ? 0 : 1;
    this.setData({selected: sel});
  },

  formSubmit: function(e){
    const form = e.detail.value;
    const that = this;
    console.log(that.data.selected);
    const data = {
      userId: that.data.userId,
      name: form.input0,
      nickName: form.input1,
      imgUrl: [that.data.icon],
      gender: that.data.selected,// * 1 转化为int类型
      phone: form.input3,
      password: form.input4,
      email: form.input6,
      address: form.input7,
      type: 0,
      privilege: 0,
      detail: form.input8
    }
    if(form.input4 != form.input5){
      wx.showModal({
        title: '密码不一致！',
        content: '上传失败',
        showCancel: false
      })
    }
    else if(!emailReg.test(data.email)){
      wx.showModal({
        title: '邮箱格式不正确！',
        content: '上传失败',
        showCancel: false
      })
    }
    else if(!(/^1[3456789]\d{9}$/.test(data.phone))){ 
      wx.showModal({
        title: '手机号格式不正确！',
        content: '上传失败',
        showCancel: false
      })
    } 
    else{
      this.updateUser(data);
    }
  },

  updateUser(data){
    const that = this;
    console.log(data);
    wx.request({
      url: domain + '/user/updateUser',
      method: 'POST',
      header: {'content-type': 'application/json'},
      data: data,
      success(res){ 
        console.log(res);
        wx.showModal({
          title: '修改成功！',
          content: '上传成功！',
          showCancel: false,
          success(res){
            if(res.confirm){
              wx.navigateBack({
              })
            }
          }
        })
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
    console.log(options);
    this.setData({
      userId: options.id,
    });
    this.getInfo();
  },

  getInfo(){
    const userId = app.globalData.userId;
    const that = this;
    wx.request({
      url: domain + '/user/getUserDetail',
      data:{
        userId: userId
      },
      method: 'GET',
      success(res){
        const resData = res.data.data;
        console.log(res);
        const temp = [resData.name,resData.nickName,resData.gender, resData.phone, resData.password, resData.password,
        resData.email, resData.address, resData.detail];
        var temp_array = ['男', '女'];
        if(resData.gender == 1){
          temp_array = temp_array.reverse();
        }
        that.setData({ default: temp, selected: resData.gender,array: temp_array });
        that.setData({ icon: [resData.imgUrl]});
      },
      fail(error){
        console.log(error);
      }
    })
  },

  logout(e){
    app.globalData.login = false;
    console.log(app.globalData.login);
    wx.setStorageSync('login', false);
    wx.showModal({
      cancelColor: 'cancelColor',
      content:'退出成功！',
      showCancel: false,
      success(res){
        if(res.confirm){
          wx.navigateBack({
          })
        }
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

  }
})