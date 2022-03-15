// pages/my/setting/index.js
const app = getApp();
const domain = app.globalData.domainName;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ['姓名','昵称','性别','手机号','密码','确认密码','邮箱','地址','用户描述'],
    icon: "",
    userId: ''
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
        console.log("aaaaaaaaa",that.data.icon)
      }
    })
  },

  formSubmit: function(e){
    const form = e.detail.value;
    const that = this;
    const data = {
      userId: that.data.userId,
      name: form.input0,
      nickName: form.input1,
      imgUrl: that.data.icon[0],
      gender: form.input2 * 1,// * 1 转化为int类型
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
    this.updateUser(data);
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
          showCancel: false
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
      userId: options.id
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