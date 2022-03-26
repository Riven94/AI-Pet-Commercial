// pages/market/addservice/index.js
const app = getApp();
const domain = app.globalData.domainName;
const userId = app.globalData.userId;
Page({
    data: {
        addPhotoIcon: domain + "/media/icon/addphoto.png",
        info:["服务名称","服务描述","服务状态","价格","保障"],
        imgList1:[],
        imgList2:[],
        imgList3:[],
        shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
        selectDatas: ['洗澡', '美容', '寄卖','撸宠'], //下拉列表的数据
        indexs: 0, //选择的下拉列 表下标,
        Type:'洗澡',
        storeId:'',
        stateIndex: 0,
        state: ['未售完', '已售完']
    },

    bindStateChange(e){
      this.setData({ stateIndex: e.detail.value * 1});
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

    formSubmit(e) {
      var that=this
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
       const Name=e.detail.value.input0
       const Detail=e.detail.value.input1
       const State= this.data.stateIndex
       const Price=e.detail.value.input3
       const Security=e.detail.value.input4
        wx.request({
          url: domain+'/service/add', 
          method: 'POST',
          data: {
           "name":Name,
           "imgUrl":that.data.imageList1,
           "detail":Detail,
           "type":that.data.Type,
           "state":State,
           "creatorId":userId,
           "storeId":that.data.storeId,
          "price":Price,
          "security":Security,
          "level":5,
          "bulkUrl":that.data.imageList2,
          "purInforUrl":that.data.imageList3
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log(res.data)
            wx.navigateBack({
                delta: 1
              })
          }
        })
      },


      uploadservice:function(){
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
                imageList1:res.tempFilePaths
            })
            console.log("aaaaaaaaa",that.data.imageList1)
            that.upload1({
              path: tempFilePaths
          })
          }
        })
      },
    //上传服务图片
      upload1(data) { // 上传图片
        var that = this;
        wx.request({
            //上传图片协议接口
            url: domain+'/images/uploadFile/service',
            method: 'POST',
            data: {
              "img": that.data.imageList1[0],
              "creatorId": userId
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


      uploadbulk:function(){
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
                imageList2:res.tempFilePaths
            })
            console.log("aaaaaaaaa",that.data.imageList2)
            that.upload2({
              path: tempFilePaths
          })
          }
        })
      },
    //上传团购详情
      upload2(data) { // 上传图片
        var that = this;
        wx.request({
            //上传图片协议接口
            url: domain+'/images/uploadFile/bulk',
            method: 'POST',
            data: {
              "img": that.data.imageList2[0],
              "creatorId": userId
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


      uploadpurInfor:function(){
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
                imageList3:res.tempFilePaths
            })
            console.log("aaaaaaaaa",that.data.imageList3)
            that.upload3({
              path: tempFilePaths
          })
          }
        })
      },
    //上传购买须知
      upload3(data) { // 上传图片
        var that = this;
        wx.request({
            //上传图片协议接口
            url: domain+'/images/uploadFile/purInfor',
            method: 'POST',
            data: {
              "img": that.data.imageList3[0],
              "creatorId": userId
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({storeId: options.storeId * 1});
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