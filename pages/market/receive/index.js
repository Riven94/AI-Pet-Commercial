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
    addressId:'',
    customItem: '全部',
    region: ['广东省', '广州市', '海珠区'],
    isDefault: false,
    from: false,
    tempNew: false
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
      area: that.data.region.join(','),
      addressDetail : value.input3,
      type: that.data.isDefault ? 1 : 0
    };
    console.log(data);
    if(!(/^1[3456789]\d{9}$/.test(data.phone))){ 
      wx.showModal({
        title: '手机号格式不正确！',
        content: '上传失败',
        showCancel: false
      })
    }
    else{
      if(that.data.new){
        wx.request({
          url:domain+'/address/add',
          method: 'POST',
          data: data,
          header: { 'content-type': 'application/json'},
          success(res){
            const resData = res.data.data;
            console.log(res);
            wx.showModal({
              cancelColor: 'cancelColor',
              content: '添加成功！',
              showCancel: false,
              success(res){
                if(that.data.from){
                  var pages = getCurrentPages();
                  var prev = pages[pages.length - 2];
                  prev.setData({
                    address: resData,
                    empty: false
                  });
                }
                wx.navigateBack({
                })
              }
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
        area: that.data.region.join(','),
        addressDetail : value.input3,
        type: that.data.isDefault ? 1 : 0
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
  }    
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id != undefined){
      this.setData({new: false,
                    tempNew: false,
                    addressId: options.id * 1});
      this.getAddressDetail(options.id * 1);
    }
    if(options.from != undefined){
      this.setData({ from: true,
                     tempNew: true })
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
        that.setData({ default: temp});
        that.setData({region: resData.area.split(',')})
        if(resData.type == 0){
          that.setData({isDefault: true})
        }
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

  changeDefault(e){
    console.log(e);
    that.setData({isDefault: !isDefault});
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    const tempNew = this.data.new ? false : true;
    this.setData({
      region: e.detail.value,
      tempNew: tempNew
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
})