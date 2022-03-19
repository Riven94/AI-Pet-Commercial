// pages/market/receive/index.js
const app=getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ['收货人','手机号码','所在地区','详细地址'],
    default: ['','','',''],
    new: true,
    addressId:''
  },
  formSubmit(e){
    console.log(e);
    const userId = app.globalData.userId;
    const value = e.detail.value;
    console.log(userId);
    const that = this;
    const data = {
      creatorId: userId,
      consignee: value.input0,
      phone: value.input1,
      area: value.input2,
      addressDetail : value.input3,
      type:1
    };
    if(that.data.new){
      wx.request({
        url:domain+'/address/add',
        method: 'POST',
        data: data,
        header: { 'content-type': 'application/json'},
        success(res){
          console.log(res);
          wx.navigateBack({
          })
        },
        fail(error){
          console.log(error);
        }
      })
    }
    else{
      const data2 = {
        id: that.data.addressId,
        creatorId: userId,
        consignee: value.input0,
        phone: value.input1,
        area: value.input2,
        addressDetail : value.input3,
        type: 0
      };
      console.log(data2);
      wx.request({
        url: domain + '/address/update',
        data: data2,
        method: 'POST',
        header:{ 'content-type': 'application/json'},
        success(res){
          console.log(res);
          wx.showModal({
            cancelColor: 'cancelColor',
            content: "保存成功！",
            showCancel: false,
            success(){
              wx.navigateBack({
              })
            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id != undefined){
      this.setData({new: false});
      this.setData({addressId: options.id * 1});
      this.getAddressDetail(options.id * 1);
    }
  },

  getAddressDetail(id){
    const that = this;
    wx.request({
      url: domain + '/address/getDetail',
      method: "GET",
      data:{
        id: id
      },
      success(res){
        console.log(res);
        const resData = res.data.data;
        const temp = [resData.consignee,resData.phone,resData.area, resData.addressDetail];
        that.setData({ default: temp})
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
      content: '是否删除？',
      success(res){
        if(res.confirm){
          that.onRealDelete();
        }
      }
    })
  },

  onRealDelete(){
    const that = this;
    console.log(that.data.addressId);
    wx.request({
      url: domain + '/address/delete',
      method: 'POST',
      data:{
        'id': that.data.addressId
      },
      success(res){
        console.log(res);
        wx.showModal({
          cancelColor: 'cancelColor',
          showCancel: false,
          content:'删除成功！',
          success(res){
            if(res.confirm){
              wx.navigateBack({
              })
            }
          }
        },
        )
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

  back: function(e){
    wx.navigateBack({
    })
  },

  // formSubmit(e) {
  //   const data = e.detail.value;
  //   console.log(data)
  //   //console.log('form发生了submit事件，携带数据为：', data['input0']);
  //   const temp = {
  //     creatorId: 9,
  //     consignee:data['input0'],
  //     phone: data['input1'],
  //     area: data['input2'],
  //     addressDetail: data['input3'],
  //     type: 0
  //   }
  //   console.log(temp);
  //   wx.request({
  //     url: domain + '/address/add',
  //     data:temp,
  //     method: "POST",
  //     header: {'content-type': 'application/json'},
  //     success(res){
  //       console.log(res);
  //     },
  //     fail(error){
  //       console.log(error);
  //     }
  //   })
  // },
})