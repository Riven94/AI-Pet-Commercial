// pages/market/uploadFreight/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:['商品名字', '商品描述', '商品状态(填写0/1)','价格','运费','保障','服务'],
    imageList:[],
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['主食', '零食', '家居','出行','热卖'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
    Type:'主食'
  },
    // 点击下拉显示框
    selectTaps() {
      this.setData({
        shows: !this.data.shows,
      });
    },
    optionTaps(e) {
      console.log(e);
      const that = this;
      let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
      console.log(Indexs)
      this.setData({
        indexs: Indexs,
        shows: !this.data.shows,
        Type: that.data.selectDatas[Indexs]
      });
      console.log(that.data.Type)
    },
  
  uploadImage:function(){
    var that=this;
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths 
        console.log(res)
        that.setData({
            imageList:res.tempFilePaths
        })
        console.log("aaaaaaaaa",that.data.imageList)
        that.upload({
          path: tempFilePaths
      })
      }
    })
  },

  upload(data) { // 上传图片
    var that = this;
    wx.request({
        //上传图片协议接口
        url: domain+'/iamges/uploadFile/product',
        method: 'POST',
        data: {
          "img": that.data.imageList[0],
          "creatorId": 1
        },
       // header:{ 'content-type': 'multipart/form-data'},
        success(res) {
          console.log("上传图片成功")
        },
        fail(e) {
          wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
          })
        },
    })
  },
  formSubmit(e) {
    var that=this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
   const Name=e.detail.value.input0
   const Detail=e.detail.value.input1
   const State=e.detail.value.input2
   const Price=e.detail.value.input3
   const Freight=e.detail.value.input4
   const Security=e.detail.value.input5
   const Service=e.detail.value.input6
    wx.request({
      url: domain+'/product/add', 
      method: 'POST',
      data: {
       "name":Name,
       "imgUrl":that.data.imageList[0],
       "detail":Detail,
       "type":that.data.Type,
       "state":State,
       "creatorId":1,
       "storeId":22,
      "price":Price,
      "freight":Freight,
      "security":Security,
      "service":Service
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
